const defaultCode = `module.exports = { 
  main: function (event, context) {
    return "Hello World!";
  }
}`;
const defaultDeps = `{ 
  "name": "{lambdaName}",
  "version": "1.0.0",
  "dependencies": {}
}`;

const defaultConfig = {
  functionUsageKind: 'serverless-function',
  restrictedVariables: [
    'K_REVISION',
    'K_CONFIGURATION',
    'K_SERVICE',
    'FUNC_RUNTIME',
    'FUNC_HANDLER',
    'FUNC_TIMEOUT',
    'FUNC_PORT',
    'PORT',
    'MOD_NAME',
    'NODE_PATH',
  ],
  resources: {
    min: {
      memory: '16Mi',
      cpu: '10m',
    },
  },
  defaultLambdaCode: defaultCode,
  defaultLambdaDeps: defaultDeps,
};

function getConfigValue(field) {
  const serverlessConfig = window.clusterConfig?.serverless;
  const defaultValue = defaultConfig[field];

  if (!serverlessConfig) {
    return defaultValue;
  }

  return serverlessConfig[field] || defaultValue;
}

function loadConfig() {
  return {
    functionUsageKind: getConfigValue('functionUsageKind') || '',
    restrictedVariables: getConfigValue('restrictedVariables') || [],
    resources: getConfigValue('resources') || {},
    defaultLambdaCode: getConfigValue('defaultLambdaCode') || '',
    defaultLambdaDeps: getConfigValue('defaultLambdaDeps') || '',
  };
}

export const CONFIG = loadConfig();