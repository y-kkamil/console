import request from 'request';
import config from '../config';
import kymaConsole from '../commands/console';
import common from '../commands/common';
import { describeIf } from '../utils/skip';
import dex from '../utils/dex';
import address from '../utils/address';
import { retry, retryInterval } from '../utils/retry';
import { k8sApiNamespace, k8sApiDeployment, k8sApiService } from "./../setup/k8s-api"

let page, browser;
let service, namespace;
let token = '';

describeIf(dex.isStaticUser(), 'Console expose api tests', () => {
  beforeAll(async () => {
    namespace = await new k8sApiNamespace();
    service = await new k8sApiDeployment();
    await new k8sApiService();

    await retry(async () => {
      const data = await common.beforeAll(t => (token = t));
      browser = data.browser;
      page = data.page;
    });
  });

  afterAll(async () => {
    await namespace.delete();
    if (browser) {
      await browser.close();
    }
  });

  test('Expose API for Service', async () => {
    const serviceUrl = address.console.getService(config.testNamespace, service.definition.metadata.name);
    const apiName = "ui-test-exposed-api";
    let frame, exposedApiCellTexts;
    
    function callExposedAPI({expectedStatusCode}) {
      const req = {
        url: `https://${apiName}.${config.domain}`,
        method: 'GET',
        // TODO: Analyze problem with UNABLE_TO_VERIFY_LEAF_SIGNATURE
        rejectUnauthorized: false,
      };

      return new Promise((resolve, reject) => {
        request(req, (error, response) => {
          if (error) { reject(error) }
          if (!response) { resolve("request returned no response") }
          if (response.statusCode !== expectedStatusCode) {
            resolve(`expected status code ${expectedStatusCode}, received ${response.statusCode}`)
          }
          resolve(true);
        });
      });
    }

    async function getCellsText() {
      await frame.waitForSelector('[data-e2e-id=exposed-api-name]');
      return {
        name: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-name]"))[0],
        secured: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-secured]"))[0],
        idp: (await kymaConsole.getNamesOnCurrentPage(page, "[data-e2e-id=exposed-api-idp]"))[0]
      }
    }

    await Promise.all([
      page.goto(serviceUrl),
      page.waitForNavigation({
        waitUntil: ['domcontentloaded', 'networkidle0'],
      }),
    ]);

    // Before exposing API
    console.log("Exposed API should retrieve 404 (does not exist)");
    await callExposedAPI(404);

    // Expose API (not secured)
    frame = await kymaConsole.getFrame(page);
    await frame.click("[data-e2e-id=open-expose-api]");    
    await frame.waitForSelector('#host-input');
    await frame.type('#host-input', apiName);
    await frame.click("[data-e2e-id=save-expose-api]");    
    
    exposedApiCellTexts = await getCellsText();
    expect(exposedApiCellTexts.name).toEqual(` http-db-service-${apiName} `);
    expect(exposedApiCellTexts.secured).toEqual(`No`);
    expect(exposedApiCellTexts.idp).toEqual('-');

    console.log("Exposed API should retrieve 200 (not secured)");
    await retryInterval(callExposedAPI, {expectedStatusCode: 200});

    // Expose API (secured)
    await kymaConsole.openLinkOnFrame(page, "[data-e2e-id=exposed-api-name]", `http-db-service-${apiName}`);
    await frame.waitForSelector("[data-e2e-id=secure-api-checkbox]");
    await frame.click("[data-e2e-id=secure-api-checkbox]");
    await frame.click("[data-e2e-id=save-expose-api]");    

    exposedApiCellTexts = await getCellsText();
    expect(exposedApiCellTexts.name).toEqual(` http-db-service-${apiName} `);
    expect(exposedApiCellTexts.secured).toEqual(`Yes`);
    expect(exposedApiCellTexts.idp).toEqual('DEX');

    console.log("Exposed API should retrieve 401 (secured)");
    await retryInterval(callExposedAPI, {expectedStatusCode: 401});
  });
});
