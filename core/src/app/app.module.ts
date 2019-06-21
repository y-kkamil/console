import { RbacService } from './shared/services/rbac.service';
import { ApplicationBindingService } from './content/settings/applications/application-details/application-binding-service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClipboardModule } from 'ngx-clipboard';
import { ApisComponent } from './content/namespaces/configuration/apis/apis.component';
import { FilteredApisComponent } from './content/namespaces/configuration/apis/filtered-apis/filtered-apis.component';
import { EventService } from './content/settings/applications/application-details/services/event.service';
import { ApplicationsService } from './content/settings/applications/services/applications.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './navigation/app-routing.module';

import { TokenInterceptor } from './auth/token.interceptor';

import { SortablejsModule } from 'angular-sortablejs';
import { NamespacesContainerComponent } from './content/namespaces/namespaces-container/namespaces-container.component';
import { WorkspaceOverviewComponent } from './content/workspace-overview/workspace-overview/workspace-overview.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ListModule } from 'app/generic-list/list.module';
import { NamespaceCreateComponent } from './content/namespaces/namespace-create/namespace-create.component';
import { CurrentNamespaceService } from './content/namespaces/services/current-namespace.service';
import { NamespacesService } from './content/namespaces/services/namespaces.service';
import { NamespaceCardComponent } from './content/workspace-overview/namespace-card/namespace-card.component';

import { TimeAgoPipe } from 'time-ago-pipe';
import { ApiDefinitionEntryRendererComponent } from './content/namespaces/configuration/apis/api-definition-entry-renderer/api-definition-entry-renderer.component';
import { ApiDefinitionHeaderRendererComponent } from './content/namespaces/configuration/apis/api-definition-header-renderer/api-definition-header-renderer.component';
import { FilteredApisEntryRendererComponent } from './content/namespaces/configuration/apis/filtered-apis/filtered-apis-entry-renderer/filtered-apis-entry-renderer.component';
import { FilteredApisHeaderRendererComponent } from './content/namespaces/configuration/apis/filtered-apis/filtered-apis-header-renderer/filtered-apis-header-renderer.component';
import { NamespaceDetailsComponent } from './content/namespaces/namespace-details/namespace-details.component';
import { DeploymentEntryRendererComponent } from './content/namespaces/operation/deployments/deployment-entry-renderer/deployment-entry-renderer.component';
import { DeploymentHeaderRendererComponent } from './content/namespaces/operation/deployments/deployment-header-renderer/deployment-header-renderer.component';
import { DeploymentsComponent } from './content/namespaces/operation/deployments/deployments.component';
import { PodsEntryRendererComponent } from './content/namespaces/operation/pods/pods-entry-renderer/pods-entry-renderer.component';
import { PodsHeaderRendererComponent } from './content/namespaces/operation/pods/pods-header-renderer/pods-header-renderer.component';
import { PodsComponent } from './content/namespaces/operation/pods/pods.component';
import { ReplicaSetsEntryRendererComponent } from './content/namespaces/operation/replica-sets/replica-sets-entry-renderer/replica-sets-entry-renderer.component';
import { ReplicaSetsHeaderRendererComponent } from './content/namespaces/operation/replica-sets/replica-sets-header-renderer/replica-sets-header-renderer.component';
import { ReplicaSetsComponent } from './content/namespaces/operation/replica-sets/replica-sets.component';
import { SecretDetailComponent } from './content/namespaces/operation/secrets/secret-detail/secret-detail.component';
import { SecretsEntryRendererComponent } from './content/namespaces/operation/secrets/secrets-entry-renderer/secrets-entry-renderer.component';
import { SecretsHeaderRendererComponent } from './content/namespaces/operation/secrets/secrets-header-renderer/secrets-header-renderer.component';
import { SecretsComponent } from './content/namespaces/operation/secrets/secrets.component';
import { ExposeApiComponent } from './content/namespaces/operation/services/service-details/expose-api/expose-api.component';
import { ExposeApiService } from './content/namespaces/operation/services/service-details/expose-api/expose-api.service';
import { ServiceDetailsComponent } from './content/namespaces/operation/services/service-details/service-details.component';
import { ServicesEntryRendererComponent } from './content/namespaces/operation/services/services-entry-renderer/services-entry-renderer.component';
import { ServicesHeaderRendererComponent } from './content/namespaces/operation/services/services-header-renderer/services-header-renderer.component';
import { ServicesComponent } from './content/namespaces/operation/services/services.component';
import { OrganisationComponent } from './content/settings/organisation/organisation.component';
import { EditBindingsModalComponent } from './content/settings/applications/application-details/edit-bindings-modal/edit-binding-modal.component';
import { ApplicationDetailsComponent } from './content/settings/applications/application-details/application-details.component';
import { ApplicationsEntryRendererComponent } from './content/settings/applications/applications-entry-renderer/applications-entry-renderer.component';
import { ApplicationsHeaderRendererComponent } from './content/settings/applications/applications-header-renderer/applications-header-renderer.component';
import { ApplicationsComponent } from './content/settings/applications/applications.component';
import { ServiceBrokersComponent } from './content/settings/service-brokers/service-brokers.component';
import { ConfirmationModalComponent } from './shared/components/confirmation-modal/confirmation-modal.component';
import { EditResourceComponent } from './shared/components/edit-resource/edit-resource.component';
import { InformationModalComponent } from './shared/components/information-modal/information-modal.component';
import { JsonEditorModalComponent } from './shared/components/json-editor-modal/json-editor-modal.component';
import { JsonEditorComponent } from './shared/components/json-editor-modal/json-editor/json-editor.component';
import { K8sResourceEditorService } from './shared/components/json-editor-modal/services/k8s-resource-editor.service';
import { ResourceUploaderComponent } from './shared/components/resource-uploader/resource-uploader-component/resource-uploader.component';
import { ResourceUploaderModalComponent } from './shared/components/resource-uploader/resource-uploader-modal/resource-uploader-modal.component';
import { ResourceUploadService } from './shared/components/resource-uploader/services/resource-upload.service';
import { UploaderComponent } from './shared/components/resource-uploader/uploader/uploader.component';
import { ComponentCommunicationService } from './shared/services/component-communication.service';
import { RoleBindingModalComponent } from './shared/components/role-binding-modal/role-binding-modal.component';
import { GraphQLClientService } from './shared/services/graphql-client-service';
import { LuigiClientService } from './shared/services/luigi-client.service';
import { ClickOutsideModule } from 'ng-click-outside';
import { PermissionsComponent } from './shared/components/permissions/permissions.component';
import { RolesComponent } from './shared/components/permissions/roles/roles.component';
import { RoleDetailsComponent } from './shared/components/permissions/role-details/role-details.component';
import { RolesEntryRendererComponent } from './shared/components/permissions/roles/roles-entry-renderer/roles-entry-renderer.component';
import { RolesHeaderRendererComponent } from './shared/components/permissions/roles/roles-header-renderer/roles-header-renderer.component';
import { BindingsComponent } from './shared/components/permissions/bindings/bindings.component';
import { BindingEntryRendererComponent } from './shared/components/permissions/bindings/binding-entry-renderer/binding-entry-renderer.component';
import { BindingHeaderRendererComponent } from './shared/components/permissions/bindings/binding-header-renderer/binding-header-renderer.component';
import { AbstractKubernetesElementListComponent } from './content/namespaces/operation/abstract-kubernetes-element-list.component';
import { ServiceBrokerHeaderRendererComponent } from './content/settings/service-brokers/services-header-renderer/service-broker-header-renderer.component';
import { ServiceBrokerEntryRendererComponent } from './content/settings/service-brokers/services-entry-renderer/service-broker-entry-renderer.component';
import { IdpPresetsComponent } from './content/settings/idp-presets/idp-presets.component';
import { IdpPresetsEntryRendererComponent } from './content/settings/idp-presets/idp-presets-entry-renderer/idp-presets-entry-renderer.component';
import { IdpPresetsHeaderRendererComponent } from './content/settings/idp-presets/idp-presets-header-renderer/idp-presets-header-renderer.component';
import { CreatePresetModalComponent } from './content/settings/idp-presets/create-preset-modal/create-preset-modal.component';
import { IdpPresetsService } from './content/settings/idp-presets/idp-presets.service';
import { ResourcesComponent } from './content/namespaces/configuration/resources/resources.component';
import { ResourceQuotasComponent } from './content/namespaces/configuration/resources/resource-quotas/resource-quotas.component';
import { ResourceQuotaEntryRendererComponent } from './content/namespaces/configuration/resources/resource-quotas/resource-quota-entry-renderer/resource-quota-entry-renderer.component';
import { ResourceQuotaHeaderRendererComponent } from './content/namespaces/configuration/resources/resource-quotas/resource-quota-header-renderer/resource-quota-header-renderer.component';
import { LimitRangesComponent } from './content/namespaces/configuration/resources/limit-ranges/limit-ranges.component';
import { LimitRangeEntryRendererComponent } from './content/namespaces/configuration/resources/limit-ranges/limit-range-entry-renderer/limit-range-entry-renderer.component';
import { LimitRangeHeaderRendererComponent } from './content/namespaces/configuration/resources/limit-ranges/limit-range-header-renderer/limit-range-header-renderer.component';
import { Copy2ClipboardModalComponent } from './shared/components/copy2clipboard-modal/copy2clipboard-modal.component';
import { CreateApplicationModalComponent } from './content/settings/applications/create-application-modal/create-application-modal.component';
import { EditApplicationModalComponent } from './content/settings/applications/edit-application-modal/edit-application-modal.component';
import { LabelsInputComponent } from './shared/components/labels-input/labels-input.component';
import { ConfigMapsComponent } from './content/namespaces/operation/configmaps/configmaps.component';
import { ConfigMapsEntryRendererComponent } from './content/namespaces/operation/configmaps/configmaps-entry-renderer/configmaps-entry-renderer.component';
import { ConfigMapsHeaderRendererComponent } from './content/namespaces/operation/configmaps/configmaps-header-renderer/configmaps-header-renderer.component';
import { StatusLabelComponent } from './shared/components/status-label/status-label.component';
import { TooltipComponent } from './shared/components/tooltip/tooltip.component';
import { AboutKymaComponent } from 'shared/components/about-kyma/about-kyma.component';
import { LuigiClientCommunicationDirective } from './shared/directives/luigi-client-communication/luigi-client-communication.directive';

import { FundamentalNgxModule } from 'fundamental-ngx';
import { GraphqlMutatorModalComponent } from 'shared/components/json-editor-modal/graphql-mutator-modal.component';
import { AbstractGraphqlElementListComponent } from 'namespaces/operation/abstract-graphql-element-list.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { AppConfig } from './app.config';
import { WebSocketLink } from './ws';
import { GenericHelpersService } from './shared/services/generic-helpers.service';

@NgModule({
  declarations: [
    AppComponent,
    NamespacesContainerComponent,
    WorkspaceOverviewComponent,
    NamespaceCreateComponent,
    NamespaceCardComponent,
    DeploymentsComponent,
    PodsComponent,
    TimeAgoPipe,
    ApplicationsComponent,
    ApplicationDetailsComponent,
    OrganisationComponent,
    NamespaceDetailsComponent,
    ServiceBrokersComponent,
    ReplicaSetsComponent,
    ServicesComponent,
    SecretsComponent,
    SecretDetailComponent,
    ConfigMapsComponent,
    InformationModalComponent,
    ConfirmationModalComponent,
    ReplicaSetsEntryRendererComponent,
    ReplicaSetsHeaderRendererComponent,
    DeploymentHeaderRendererComponent,
    DeploymentEntryRendererComponent,
    PodsHeaderRendererComponent,
    PodsEntryRendererComponent,
    SecretsEntryRendererComponent,
    SecretsHeaderRendererComponent,
    ConfigMapsEntryRendererComponent,
    ConfigMapsHeaderRendererComponent,
    ServicesHeaderRendererComponent,
    ServicesEntryRendererComponent,
    EditBindingsModalComponent,
    ApplicationsHeaderRendererComponent,
    ApplicationsEntryRendererComponent,
    JsonEditorModalComponent,
    GraphqlMutatorModalComponent,
    JsonEditorComponent,
    EditResourceComponent,
    ServiceDetailsComponent,
    UploaderComponent,
    ResourceUploaderModalComponent,
    ResourceUploaderComponent,
    ExposeApiComponent,
    ApisComponent,
    FilteredApisComponent,
    ApiDefinitionEntryRendererComponent,
    ApiDefinitionHeaderRendererComponent,
    FilteredApisEntryRendererComponent,
    FilteredApisHeaderRendererComponent,
    Copy2ClipboardModalComponent,
    PermissionsComponent,
    RoleDetailsComponent,
    RoleBindingModalComponent,
    RolesComponent,
    BindingsComponent,
    RolesEntryRendererComponent,
    RolesHeaderRendererComponent,
    BindingHeaderRendererComponent,
    BindingEntryRendererComponent,
    AbstractKubernetesElementListComponent,
    AbstractGraphqlElementListComponent,
    ServiceBrokerEntryRendererComponent,
    ServiceBrokerHeaderRendererComponent,
    IdpPresetsComponent,
    IdpPresetsEntryRendererComponent,
    IdpPresetsHeaderRendererComponent,
    CreatePresetModalComponent,
    ResourcesComponent,
    ResourceQuotasComponent,
    ResourceQuotaEntryRendererComponent,
    ResourceQuotaHeaderRendererComponent,
    LimitRangesComponent,
    LimitRangeEntryRendererComponent,
    LimitRangeHeaderRendererComponent,
    CreateApplicationModalComponent,
    EditApplicationModalComponent,
    LabelsInputComponent,
    StatusLabelComponent,
    TooltipComponent,
    LuigiClientCommunicationDirective,
    AboutKymaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SortablejsModule,
    ListModule,
    ClipboardModule,
    ClickOutsideModule,
    FundamentalNgxModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    NamespacesService,
    CurrentNamespaceService,
    ApplicationsService,
    EventService,
    K8sResourceEditorService,
    ComponentCommunicationService,
    ResourceUploadService,
    ExposeApiService,
    ApplicationBindingService,
    RbacService,
    GraphQLClientService,
    IdpPresetsService,
    LuigiClientService,
    GenericHelpersService
  ],
  entryComponents: [
    NamespaceCardComponent,
    ReplicaSetsEntryRendererComponent,
    ReplicaSetsHeaderRendererComponent,
    DeploymentEntryRendererComponent,
    DeploymentHeaderRendererComponent,
    PodsHeaderRendererComponent,
    PodsEntryRendererComponent,
    SecretsHeaderRendererComponent,
    SecretsEntryRendererComponent,
    ConfigMapsEntryRendererComponent,
    ConfigMapsHeaderRendererComponent,
    ServicesHeaderRendererComponent,
    ServicesEntryRendererComponent,
    ApplicationsHeaderRendererComponent,
    ApplicationsEntryRendererComponent,
    ApiDefinitionEntryRendererComponent,
    ApiDefinitionHeaderRendererComponent,
    FilteredApisEntryRendererComponent,
    FilteredApisHeaderRendererComponent,
    BindingHeaderRendererComponent,
    BindingEntryRendererComponent,
    RolesHeaderRendererComponent,
    RolesEntryRendererComponent,
    ServiceBrokerHeaderRendererComponent,
    ServiceBrokerEntryRendererComponent,
    IdpPresetsHeaderRendererComponent,
    IdpPresetsEntryRendererComponent,
    ResourceQuotaEntryRendererComponent,
    ResourceQuotaHeaderRendererComponent,
    LimitRangeEntryRendererComponent,
    LimitRangeHeaderRendererComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {
    // Create an http link:
    const http = httpLink.create({
      uri: AppConfig.graphqlApiUrl
    });

    // Create a WebSocket link:
    const ws = new WebSocketLink({
      uri: AppConfig.subscriptionsApiUrl,
      options: {
        reconnect: true
      }
    });

    const link = split(
      // split based on operation type
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
      },
      ws,
      http
    );

    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
}
