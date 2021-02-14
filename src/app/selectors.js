// import { createSelector } from 'reselect';

export const getIsConfigDrawerVisible = state => state.configDrawerVisible;

export const getIsConfigEditorVisible = state => state.configEditorVisible;

export const getIsWorkflowCustomizerVisible = state => state.workflowCustomizerVisible;

export const getDevices = state => state.devices;

export const getHWID = state => state.hwid;

export const getCurrMenu = state => state.key;