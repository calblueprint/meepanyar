import styled from 'styled-components';
import { Button, Typography, Container, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const HeaderText = styled(Typography)`
  font-size: 30px;
  width: 100%;
  color: #828282;
  display: flex;
  padding: 20px;
  margin-top: 45px;
  margin-left: -5px;
`;

export const MainDiv = styled('div')`
  padding: 0px 8px;
  margin-top: -14px;
`;

export const RecordAppBar = styled(AppBar)`
  box-shadow: none;
`;

export const RecordTabs = styled(Tabs)`
  background: white;
  outline: 3px solid white;
  border: 1px solid white;
`;

export const RecordTab = styled(Tab)`
  color: #E5E5E5;
  font-size: 12px;
  &:focus {
    outline: none;
  }
`;

export const ScrollDiv = styled('div')`
  max-height: 380px;
  overflow: auto;
`;
