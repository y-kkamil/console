let k8sDomain = 'kyma.local';
var clusterConfig = window['clusterConfig'];
if (clusterConfig && clusterConfig['domain']) {
  k8sDomain = clusterConfig['domain'];
}
var k8sServerUrl = `https://apiserver.${k8sDomain}`;
var token;
if (localStorage.getItem('luigi.auth')) {
  token = 'Bearer ' + JSON.parse(localStorage.getItem('luigi.auth')).idToken;
}

var isHashRoute = true;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getNodes(environment) {
  var nodes = [
    {
      pathSegment: 'details',
      label: 'Overview',
      viewUrl: '/consoleapp.html#/home/environments/' + environment + '/details'
    },
    {
      pathSegment: 'service-catalog',
      label: 'Service Catalog',
      viewUrl:
        '/consoleapp.html#/home/environments/' +
        environment +
        '/service-catalog'
    },
    {
      category: 'Configuration',
      pathSegment: 'service-instances',
      label: 'Service Instances',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/instances'
    },
    {
      category: 'Configuration',
      pathSegment: 'apis',
      label: 'APIs',
      viewUrl: '/consoleapp.html#/home/environments/' + environment + '/apis'
    },
    {
      category: 'Configuration',
      pathSegment: 'permissions',
      label: 'Permissions',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/permissions'
    },
    {
      category: 'Configuration',
      pathSegment: 'resources',
      label: 'Resources',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/resources'
    },
    {
      category: 'Development',
      pathSegment: 'lambdas',
      label: 'Lambdas',
      viewUrl: '/consoleapp.html#/home/environments/' + environment + '/lambdas'
    },
    {
      category: 'Operation',
      pathSegment: 'deployments',
      label: 'Deployments',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/deployments'
    },
    {
      category: 'Operation',
      pathSegment: 'replica-sets',
      label: 'Replica Sets',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/replicaSets'
    },
    {
      category: 'Operation',
      pathSegment: 'pods',
      label: 'Pods',
      viewUrl: '/consoleapp.html#/home/environments/' + environment + '/pods'
    },
    {
      category: 'Operation',
      pathSegment: 'services',
      label: 'Services',
      viewUrl:
        '/consoleapp.html#/home/environments/' + environment + '/services'
    },
    {
      category: 'Operation',
      pathSegment: 'secrets',
      label: 'Secrets',
      viewUrl: '/consoleapp.html#/home/environments/' + environment + '/secrets'
    }
  ];

  return nodes;

  //   reloginIfTokenExpired();

  //   return new Promise(function(resolve, reject) {
  //     var xmlHttp = new XMLHttpRequest();
  //     xmlHttp.onreadystatechange = function() {
  //       if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
  //         var nodes = [
  //           {
  //             pathSegment: 'details',
  //             label: 'Overview',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/details'
  //           },
  //           {
  //             pathSegment: 'service-catalog',
  //             label: 'Service Catalog',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/service-catalog'
  //           },
  //           {
  //             category: 'Configuration',
  //             pathSegment: 'service-instances',
  //             label: 'Service Instances',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/instances'
  //           },
  //           {
  //             category: 'Configuration',
  //             pathSegment: 'apis',
  //             label: 'APIs',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/apis'
  //           },
  //           {
  //             category: 'Configuration',
  //             pathSegment: 'permissions',
  //             label: 'Permissions',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/permissions'
  //           },
  //           {
  //             category: 'Configuration',
  //             pathSegment: 'resources',
  //             label: 'Resources',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/resources'
  //           },
  //           {
  //             category: 'Development',
  //             pathSegment: 'lambdas',
  //             label: 'Lambdas',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/lambdas'
  //           },
  //           {
  //             category: 'Operation',
  //             pathSegment: 'deployments',
  //             label: 'Deployments',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/deployments'
  //           },
  //           {
  //             category: 'Operation',
  //             pathSegment: 'replica-sets',
  //             label: 'Replica Sets',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/replicaSets'
  //           },
  //           {
  //             category: 'Operation',
  //             pathSegment: 'pods',
  //             label: 'Pods',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/pods'
  //           },
  //           {
  //             category: 'Operation',
  //             pathSegment: 'services',
  //             label: 'Services',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/services'
  //           },
  //           {
  //             category: 'Operation',
  //             pathSegment: 'secrets',
  //             label: 'Secrets',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' + environment + '/secrets'
  //           }
  //         ];
  //         JSON.parse(xmlHttp.response).items.forEach(extension => {
  //           nodes.push({
  //             category: extension.spec.navigation.category,
  //             label: extension.spec.displayName,
  //             pathSegment: 'extensions',
  //             viewUrl:
  //               '/consoleapp.html#/home/environments/' +
  //               environment +
  //               '/extensions/' +
  //               extension.metadata.name
  //           }); // we need dynamic nodes for it to work :) now only the first extension can be shown
  //         });
  //         resolve(nodes);
  //       } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
  //         if (xmlHttp.status === 401) {
  //           relogin();
  //         }
  //         reject(xmlHttp.response);
  //       }
  //     };

  // xmlHttp.open(
  //   'GET',
  //   k8sServerUrl +
  //     '/apis/ui.kyma.cx/v1alpha1/namespaces/' +
  //     environment +
  //     '/microfrontends',
  //   true
  // );
  // xmlHttp.setRequestHeader('Authorization', token);
  // xmlHttp.send(null);
  // });
}

function getEnvs() {
  reloginIfTokenExpired();

  return new Promise(function(resolve, reject) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var envs = [];
        envs.push({
          pathSegment: 'workspace',
          label: 'Workspace',
          viewUrl: '/consoleapp.html#/home/environments/workspace',
          hideFromNav: true
        });
        JSON.parse(xmlHttp.response).items.forEach(env => {
          envName = env.metadata.name;
          envs.push({
            // has to be visible for all views exept 'settings'
            category: 'Environments',
            displayAs: 'dropdown', // TODO: implementation is not super nice (checking first child for displayAs in template), and only with categories
            keepSticky: true, // TODO: not implemented, used to keep this navigation category in the child views
            label: envName,
            pathSegment: envName,
            context: {
              environmentId: envName
            },
            children: getNodes(envName)
          });
        });
        resolve(envs);
      } else if (xmlHttp.readyState == 4 && xmlHttp.status != 200) {
        if (xmlHttp.status === 401) {
          relogin();
        }
        reject(xmlHttp.response);
      }
    };

    xmlHttp.open(
      'GET',
      k8sServerUrl + '/api/v1/namespaces?labelSelector=env=true',
      true
    );
    xmlHttp.setRequestHeader('Authorization', token);
    xmlHttp.send(null);
  });
}

function relogin() {
  localStorage.removeItem('luigi.auth');
  location.reload();
}

function reloginIfTokenExpired() {
  var accessTokenExpirationDate = JSON.parse(localStorage.getItem('luigi.auth'))
    .accessTokenExpirationDate;
  var currentDate = new Date();
  if (accessTokenExpirationDate < currentDate) {
    relogin();
  }
}
LuigiConfig = {
  /**
   * auth identity provider settings
   *
   * use: enum of already implemented providers:
   *  - openIdConnect (eg. Kyma/DEX)
   *  - oAuth2ImplicitGrant (YaaS)
   * custom:
   *  - customIdpProvider (if you provide a class to LuigiConfig.auth.customIdpProvider)
   *
   */
  auth: {
    use: 'openIdConnect',
    openIdConnect: {
      authority: 'https://dex.' + k8sDomain,
      client_id: 'console',
      scope:
        'audience:server:client_id:kyma-client audience:server:client_id:console openid profile email groups',
      // redirect_uri: 'http://console-dev.kyma.local:4200',
      automaticSilentRenew: true,
      loadUserInfo: false
    },

    events: {
      onLogout: () => {
        console.log('onLogout');
      },
      onAuthSuccessful: data => {
        console.log('onAuthSuccessful', data);
      },
      onAuthExpired: () => {
        console.log('onAuthExpired');
      },
      // TODO: define luigi-client api for getting errors
      onAuthError: err => {
        console.log('authErrorHandler 1', err);
      }
    }
  },
  navigation: {
    nodes: () => [
      {
        topnavChildsAsDropdown: true,
        pathSegment: 'environments',
        label: 'Overview',
        defaultPathSegment: 'workspace',
        context: {
          idToken: token
        },
        children: getEnvs
      },
      {
        hideFromNav: true,
        pathSegment: 'home',
        label: 'Home',
        context: {
          idToken: token
        },
        children: [
          {
            // has to be visible for all views exept 'settings'
            pathSegment: 'settings',
            label: 'Administration',
            children: [
              {
                pathSegment: 'organisation',
                label: 'General Settings',
                viewUrl: '/consoleapp.html#/home/settings/organisation'
              },
              {
                pathSegment: 'remote-envs',
                label: 'Remote Environments',
                category: 'Integration',
                viewUrl: '/consoleapp.html#/home/settings/remoteEnvs'
              },
              {
                pathSegment: 'service-brokers',
                label: 'Service Brokers',
                category: 'Integration',
                viewUrl: '/consoleapp.html#/home/settings/serviceBrokers'
              },
              {
                pathSegment: 'idp-presets',
                label: 'IDP Presets',
                category: 'Integration',
                viewUrl: '/consoleapp.html#/home/settings/idpPresets'
              },
              {
                pathSegment: 'global-permissions',
                label: 'Global Permissions',
                category: 'Administration',
                viewUrl: '/consoleapp.html#/home/settings/globalPermissions'
              },
              {
                pathSegment: 'diagnostics',
                label: 'Stats & Metrics',
                category: 'Diagnostics',
                viewUrl: 'https://grafana.' + k8sDomain
              }
            ]
          }
        ]
      }
    ],
    hideNav: false
  },
  routing: {
    nodeParamPrefix: '~',
    useHashRouting: true
  }
};

// Resilience for newer Luigi versions
// Luigi greater than 2.1.0 has new config API
if (window.Luigi && Luigi.setConfig) {
  Luigi.setConfig(LuigiConfig);
}
