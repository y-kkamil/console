import React, { Component } from 'react';
import { InstanceStatus as Is} from './styled';
import { statusColor } from '../../commons/status-color';

const InstanceStatus = ({status}) => <Is statusColor={statusColor(status)}>{status}</Is>;

export default InstanceStatus;
