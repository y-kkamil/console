import * as k8s from '@kubernetes/client-node';

import k8sApiResourceNamespaced from "./k8s-api-resource"

export class k8sApiService extends k8sApiResourceNamespaced {
  private defaultDefinition = {
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

  async constructor(definition = this.defaultDefinition, namespaceName, apiName) {
    super(definition, namespaceName, apiName);
    await this.api.createNamespacedService(this.namespaceName, this.definition);
  } 

  async delete(resourceName = this.definition.metadata.name, namespaceName = this.namespaceName) {
    await this.api.deleteNamespacedService(resourceName, namespaceName);
  }
}