import request from 'request';
import config from '../config';
import kymaConsole from '../commands/console';
import common from '../commands/common';
import { describeIf } from '../utils/skip';
import dex from '../utils/dex';
import address from '../utils/address';
import { retry } from '../utils/retry';
import { k8sApiNamespace, k8sApiDeployment, k8sApiService } from "./../setup/k8s-api"

let page, browser;
let token = '';

let service, namespace;

describeIf(dex.isStaticUser(), 'Console expose api tests', () => {
  beforeAll(async () => {
    await new k8sApiNamespace();
    service = await new k8sApiDeployment();
    await new k8sApiService();

    await retry(async () => {
      const data = await common.beforeAll(t => (token = t));
      browser = data.browser;
      page = data.page;
    });
  });

  afterAll(async () => {
    // await kymaConsole.clearData(token, config.testNamespace);
    if (browser) {
      await browser.close();
    }
  });

  test('Expose API for Service', async () => {
    const serviceUrl = address.console.getService(config.testNamespace, service.definition.metadata.name);
    const apiName = "ui-test-exposed-api";
    let statusCode, frame, exposedApiCellTexts;
    
    await Promise.all([
      page.goto(serviceUrl),
      page.waitForNavigation({
        waitUntil: ['domcontentloaded', 'networkidle0'],
      }),
    ]);

    function callExposedAPI() {
      const req = {
        url: `https://${apiName}.${config.domain}`,
        method: 'GET',
        headers: { Authorization: token },
        // TODO: Analyze problem with UNABLE_TO_VERIFY_LEAF_SIGNATURE
        rejectUnauthorized: false,
      };

      return new Promise((resolve, reject) => {
        request(req, (error, response) => {
          resolve(response);
        });
      });
    }

    frame = await kymaConsole.getFrame(page);
    await frame.click("[data-e2e-id=open-expose-api]");    
    await frame.waitForSelector('#host-input');
    await frame.type('#host-input', apiName);
    await frame.click("[data-e2e-id=save-expose-api]");    

    await frame.waitFor(4000);
    statusCode = (await callExposedAPI()).statusCode;
    expect(statusCode).toEqual(404);

    async function getCellsText() {
      return {
        name: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-name]"))[0],
        secured: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-secured]"))[0],
        idp: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-idp]"))[0]
      }
    }
    
    exposedApiCellTexts = await getCellsText();
    expect(exposedApiCellTexts.name).toEqual(` http-db-service-${apiName} `);
    expect(exposedApiCellTexts.secured).toEqual(`No`);
    expect(exposedApiCellTexts.idp).toEqual('-');


    await frame.waitFor(4000);
    statusCode = (await callExposedAPI()).statusCode;
    expect(statusCode).toEqual(200);

    await kymaConsole.openLinkOnFrame(page, "[data-e2e-id=exposed-api-name]", `http-db-service-${apiName}`);
    await frame.waitForSelector("[data-e2e-id=secure-api-checkbox]");
    await frame.click("[data-e2e-id=secure-api-checkbox]");
    await frame.waitFor(2000);
    await frame.click("[data-e2e-id=save-expose-api]");    


    exposedApiCellTexts = await getCellsText();
    expect(exposedApiCellTexts.name).toEqual(` http-db-service-${apiName} `);
    expect(exposedApiCellTexts.secured).toEqual(`Yes`);
    expect(exposedApiCellTexts.idp).toEqual('DEX');

    await frame.waitFor(4000);
    statusCode = (await callExposedAPI()).statusCode;
    expect(statusCode).toEqual(401);

    expect(page.url()).toContain("services");
  });
});
