import { k8sApiNamespace, k8sApiDeployment, k8sApiService } from "./"

let n;
let d;
let s;

// export function create ( ) {
  n = new k8sApiNamespace();
  d = new k8sApiDeployment();
  s = new k8sApiService();
// } 
// export function delete( ) {
//   n.delete()
//   d.delete()
//   s.delete()
// } 