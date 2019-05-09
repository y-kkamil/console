import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import { kubeConfig } from './../kubeconfig';

export class k8sApiDeployment {
  constructor(definition, namespaceName = config.testNamespace, apiName = k8s.Core_v1Api) {
    const defaultDefinition = {
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
                "sidecar.istio.io/inject": "true"
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

    this.definition = definition || defaultDefinition;
    this.api = kubeConfig.makeApiClient(apiName);
    this.namespaceName = namespaceName;
    await this.api.createNamespacedDeployment(this.namespaceName, this.definition);
  } 

  async delete() {
    await this.api.deleteNamespacedDeployment(this.definition.metadata.name, this.namespaceName);
  }
}