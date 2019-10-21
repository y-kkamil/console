import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { K8sNameField } from './components/K8sNameField/K8sNameField';
import { GenericList } from './components/GenericList/GenericList';

import { handleDelete } from './components/GenericList/actionHandlers/simpleDelete';

import { CustomPropTypes } from './typechecking/CustomPropTypes';

export { CustomPropTypes, GenericList, K8sNameField, handleDelete };
