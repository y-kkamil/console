import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import { kubeConfig } from './../kubeconfig';

export class k8sApiService {
  constructor(definition, namespaceName = config.testNamespace, apiName = k8s.Core_v1Api) {
    const defaultDefinition = {
      metadata: {
        name: resourceName,
        labels: {
          example: resourceName
        },
        annotations: {
          "auth.istio.io/8017": "NONE"
        }
      },
      spec: {
        ports: [
          { name: "http", port: 5050 }  
        ],
        selector: {
          example: resourceName    
        }
      }
    };

    this.definition = definition || defaultDefinition;
    this.api = kubeConfig.makeApiClient(apiName);
    this.namespaceName = namespaceName;
    await this.api.createNamespacedService(this.namespaceName, this.definition);
  } 

  async delete() {
    await this.api.deleteNamespacedService(this.definition.metadata.name, this.namespaceName);
  }
}