let domain,
  localDomain,
  localDevDomainBindings;

export default function processNodeForLocalDevelopment(node, spec, config) {
  ({ domain, localDomain } = config);
  localDevDomainBindings = [
    { startsWith: 'lambdas-ui', replaceWith: config.lambdasModuleUrl },
    { startsWith: 'brokers', replaceWith: config.serviceBrokersModuleUrl },
    { startsWith: 'instances', replaceWith: config.serviceInstancesModuleUrl },
    { startsWith: 'catalog', replaceWith: config.serviceCatalogModuleUrl },
    { startsWith: 'add-ons', replaceWith: config.addOnsModuleUrl },
    { startsWith: 'log-ui', replaceWith: config.logsModuleUrl },
  ];

  if (node.viewUrl.startsWith(`https://console.${domain}`)) {
    node.viewUrl = adjustMicroFrontendUrlForLocalDevelopment(node.viewUrl);

    if (spec.preloadUrl) {
      spec.preloadUrl = adjustMicroFrontendUrlForLocalDevelopment(spec.preloadUrl);
    }
  }

  //cluster microfrontends
  localDevDomainBindings.forEach(binding => {
    if (node.viewUrl.startsWith(`https://${binding.startsWith}.${domain}`)) {
      node.viewUrl = node.viewUrl.replace(
        `https://${binding.startsWith}.${domain}`,
        binding.replaceWith,
      );
    }
    if (spec.preloadUrl) {
      spec.preloadUrl = adjustClusterMicroFrontendUrlForLocalDevelopment();
    }
  });

  return node;
}

function adjustMicroFrontendUrlForLocalDevelopment(url) {
  return url.replace(
    `https://console.${domain}`,
    `http://${localDomain}:4200`,
  );
}

function adjustClusterMicroFrontendUrlForLocalDevelopment(url) {
  return url.replace(
    `https://${binding.startsWith}.${domain}`,
    binding.replaceWith,
  );
}
