import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import { kubeConfig } from './../kubeconfig';

export class k8sApiResource {
  constructor(definition, apiName = k8s.Core_v1Api) {
    this.definition = definition;
    this.api = kubeConfig.makeApiClient(apiName);
  }  
}