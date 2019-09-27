const domain =
  (window.clusterConfig && window.clusterConfig['domain']) || 'kyma.local';

const auth = {
  use: 'openIdConnect',
  openIdConnect: {
    authority: `https://dex.${domain}`,
    client_id: 'compass-ui',
    scope: 'audience:server:client_id:compass-ui openid profile email groups',
    loadUserInfo: false,
    logoutUrl: '/logout.html',
  },
};

export default auth;
