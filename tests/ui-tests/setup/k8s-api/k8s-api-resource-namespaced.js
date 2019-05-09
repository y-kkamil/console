import * as k8s from '@kubernetes/client-node';

import config from './../../config';
import k8sApiResource from "./k8s-api-resource";

export class k8sApiResourceNamespaced extends k8sApiResource {
  constructor(definition, namespaceName = config.testNamespace, apiName) {
    super();
    // super(definition, apiName);
    console.log('jtest', k8sApiResource);
    
    // this.namespaceName = namespaceName;
  }  
}