import config from '../config';
import kymaConsole from '../commands/console';
import common from '../commands/common';
import { describeIf } from '../utils/skip';
import dex from '../utils/dex';
import address from '../utils/address';
import { retry } from '../utils/retry';
import { testPluggable } from '../setup/test-pluggable';
import { k8sApiNamespace, k8sApiDeployment, k8sApiService } from "./../setup/k8s-api"

let page, browser;
let token = '';

// TODO: Move application tests to a separate file
const REQUIRED_MODULE = 'application';

describeIf(dex.isStaticUser(), 'Console basic tests', () => {
  beforeAll(async () => {

let n;
let d;
let s;

// export function create ( ) {
  n = new k8sApiNamespace();
  // d = new k8sApiDeployment();
  // s = new k8sApiService();
// } 
// export function delete( ) {
//   n.delete()
//   d.delete()
//   s.delete()
// } 
    await retry(async () => {
      const data = await common.beforeAll(t => (token = t));
      browser = data.browser;
      page = data.page;
    });
  });

  afterAll(async () => {
    await kymaConsole.clearData(token, config.testNamespace);
    if (browser) {
      await browser.close();
    }
  });

  test('Check if namespaces exist', async () => {
    const dropdownButton = '.fd-button--shell';
    const dropdownMenu = 'ul#context_menu_middle > li';
    await page.click(dropdownButton);
    await page.waitForSelector(dropdownMenu, { visible: true });
    const namespaces = await kymaConsole.getNamespacesFromContextSwitcher(page);
    await page.click(dropdownButton);
    console.log('Check if namespaces exist', namespaces);
    expect(namespaces.length).toBeGreaterThan(1);
  });

  test('Create namespace', async () => {
    await kymaConsole.createNamespace(page, config.testNamespace);
    await Promise.all([
      page.goto(address.console.getNamespacesAddress()),
      page.waitForNavigation({
        waitUntil: ['domcontentloaded', 'networkidle0'],
      }),
    ]);
    const namespaceNames = await kymaConsole.getNamespaceNamesFromNamespacesPage(
      page,
    );
    expect(namespaceNames).toContain(config.testNamespace);
  });

  test('Delete namespace', async () => {
    const initialNamespaceNames = await kymaConsole.getNamespaceNamesFromNamespacesPage(
      page,
    );
    await kymaConsole.deleteNamespace(page, config.testNamespace);
    const namespaceNames = await retry(async () => {
      const namespaceNamesAfterDelete = await kymaConsole.getNamespaceNamesFromNamespacesPage(
        page,
      );
      if (initialNamespaceNames <= namespaceNamesAfterDelete) {
        throw new Error(`Namespace ${config.testNamespace} not yet deleted`);
      }
      return namespaceNamesAfterDelete;
    });

    //assert
    expect(initialNamespaceNames).toContain(config.testNamespace);
    expect(namespaceNames).not.toContain(config.testNamespace);
  });
});
