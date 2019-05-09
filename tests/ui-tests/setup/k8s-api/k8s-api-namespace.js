import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import { kubeConfig } from './../kubeconfig';

export class k8sApiNamespace {
  constructor(definition, apiName = k8s.Core_v1Api) {
    const defaultDefinition = {
      metadata: {
        name: config.testNamespace,
        labels: { env: 'true' }
      }
    };
    this.definition = definition || defaultDefinition;
    this.api = kubeConfig.makeApiClient(apiName);
    this.create();
  } 

  async create() {    
    testNamespaceExist = (await this.api.listNamespace(undefined, undefined, undefined, "metadata.name="+config.testNamespace)).length > 0;
    if (testNamespaceExist) {
      await this.delete();
    }
    await this.api.createNamespace(this.definition);
  }

  async delete() {
    await this.api.deleteNamespace(this.definition.metadata.name);
  }
}