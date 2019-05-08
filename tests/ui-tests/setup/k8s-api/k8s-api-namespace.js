import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import k8sApiResource from "./"

export class k8sApiNamespace extends k8sApiResource {
  constructor(definition, apiName) {
    const defaultDefinition = {
      metadata: {
        name: config.testNamespace,
        labels: { env: 'true' },
      }
    };

    super(definition || defaultDefinition, apiName);
    this.create();
  } 

  async create() {
    await this.api.createNamespace(this.definition);
  }
}