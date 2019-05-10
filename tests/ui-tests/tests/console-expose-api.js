import config from '../config';
import kymaConsole from '../commands/console';
import common from '../commands/common';
import { describeIf } from '../utils/skip';
import dex from '../utils/dex';
import address from '../utils/address';
import { retry } from '../utils/retry';
import { testPluggable } from '../setup/test-pluggable';
import { k8sApiNamespace, k8sApiDeployment, k8sApiService } from "./../setup/k8s-api"
import { CLOSING } from 'isomorphic-ws';

let page, browser;
let token = '';

// TODO: Move application tests to a separate file
const REQUIRED_MODULE = 'application';
let service, namespace;

describeIf(dex.isStaticUser(), 'Console basic tests', () => {
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

  test('Check if namespaces exist', async () => {
    const serviceUrl = address.console.getService(config.testNamespace, service.definition.metadata.name);
    await Promise.all([
      page.goto(serviceUrl),
      page.waitForNavigation({
        waitUntil: ['domcontentloaded', 'networkidle0'],
      }),
    ]);
    await kymaConsole.openLinkOnFrame(page, "[data-e2e-id=open-expose-api]", "Expose API");    
    await page.type('#host-input', config.password);
  });
});
