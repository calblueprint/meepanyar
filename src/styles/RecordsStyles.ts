import styled from 'styled-components';
import { Button, Typography, Container, AppBar, Tabs, Tab } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const Label = styled(Typography)`
    color: #828282;
    font-size: 12px;
    font-weight: bold;
    text-align: left;
    padding: 6px 0px;
    margin-left: 11%;
`;

export const BackButton = styled(Button)`
    border-radius: 60px;
    width: 60px;
    height: 60px;
`;

export const BackArrow = styled(ArrowBackIosIcon)`
    color: #FF922E;
    margin-left: 5px;
`;

export const HeaderText = styled(Typography)`
    font-size: 18px;
    align-self: center;
    margin-left: 8%;
    font-weight: bold;
    color: #828282;
`;

export const HeaderDiv = styled('div')`
    display: flex;
    margin-top: 30px;
    margin-left: 20px;
`;

export const MainDiv = styled('div')`
    margin-top: 20px;
`;

export const RecordsAppBar = styled(AppBar)`
`;

export const RecordsTabs = styled(Tabs)`
`;

export const RecordTab = styled(Tab)`
`;

export const RecordsTabPanel = styled(TabPanel)`
`;
