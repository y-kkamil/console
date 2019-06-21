import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../app.config';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about-kyma',
  templateUrl: './about-kyma.component.html',
  styleUrls: ['./about-kyma.component.scss']
})
export class AboutKymaComponent implements OnInit {

  constructor(private http: HttpClient) {}
  public deployment;
  public kymaVersion: string;

  ngOnInit() {
    this.http.get(`${AppConfig.k8sServerUrl}/apis/extensions/v1beta1/namespaces/kyma-installer/deployments/kyma-installer`).subscribe((res: any) => {
      const imageUrl = res.spec.template.spec.containers[0].image;
      this.kymaVersion = this.processKymaVersion(imageUrl);
    })
  }

  private processKymaVersion(imageUrl: string) {
    if (imageUrl.startsWith('eu.gcr.io') && (this.endsWithSemanticVersion(imageUrl) || this.endsWithCommitHash(imageUrl))) {
      return imageUrl.split(':')[1];
    }
    else {
      return imageUrl;
    }
  }

  private endsWithSemanticVersion(imageUrl: string) {
    return imageUrl.match(/^.+:\d\.\d\.\d(-rc\d)*$/);
  }

  private endsWithCommitHash(imageUrl: string) {
    return imageUrl.match(/^.+:.+-[0-9a-fA-F]{8}$/)
  }
}
