import * as k8s from '@kubernetes/client-node';

import k8sApiResourceNamespaced from "./"

export class k8sApiDeployment extends k8sApiResourceNamespaced {
  private defaultDefinition = {
    metadata: {
      name: resourceName,
      spec: {
        replicas: 1,
        template: {
          metadata: {
            labels: {
              example: resourceName
            },
            annotations: {
              sidecar.istio.io/inject: "true"
            }
          },
          spec: {
            imagePullSecrets: [ 
              { name: "kyma-docker-user" }
            ],
            containers: [
              {
                image: "vad1mo/hello-world-rest",
                imagePullPolicy: "IfNotPresent",
                name: resourceName,
                ports: [
                  { name: "http", containerPort: 5050 }
                ],
                env: [
                  { name: "dbtype", value: "memory" }
                ]
              }
            ]
          }
        }
      }
    }
  };

  async constructor(definition = this.defaultDefinition, namespaceName, apiName) {
    super(definition, namespaceName, apiName);
    await this.api.createNamespacedDeployment(this.namespaceName, this.definition);
  } 


  async delete(resourceName = this.resourceName, namespaceName = this.namespaceName) {
    await this.api.deleteNamespacedDeployment(resourceName, namespaceName);
  }
}