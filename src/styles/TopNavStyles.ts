import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const Root = styled.div`
    flex-grow: 1;
`;

export const Bar = styled(AppBar)`
    position: sticky;
    background: transparent;
    box-shadow: none;
`;

export const ToolBar = styled(Toolbar)`
    && { min-height: 128px;
    align-items: flex-start;
    padding-top: 8px;
    padding-bottom: 16px;
    background: white;
    }
`;

export const MenuButton = styled(IconButton)`
    color: #808080;
    margin-right: 8px;
    edge: start;
    aria-label: open drawer;
`;

export const Typograph = styled(Typography)`
    color: black;
    flex-grow: 1;
    align-self: flex-end;
`;

export const AccountButton = styled(IconButton)`
    color: #808080;
    edge: end;
    aria-label: account of current user;
    aria-controls: menu-appbar;
    aria-haspopup: true;
`;

export const ListStyle = styled.div`
    width: 250;
    role: presentation;
`;