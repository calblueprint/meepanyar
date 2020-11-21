import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container, FormControl } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

// export const Title = styled.h1`
//   width: 153.9px;
//   height: 33.83px;
//   left: 25.6px;
//   top: 96px;
//   font-family: Helvetica Neue;
//   font-style: normal;
//   font-weight: 500;
//   font-size: 30px;
//   line-height: 115%;
//   color: #828282;
//   flex-grow: 1;
// `;

// export const HeaderWrapper = styled.div`
//   display: flex;
//   flex-direction: row;
//   width: 100%;
// `;

// export const DropDown = styled(FormControl)``;
// export const SelectionHeader = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex-grow: 1;
// `;

// export const ScrollDiv = styled('div')`
//   max-height: 380px;
//   overflow: auto;
//   margin-left: auto;
//   margin-right: auto;
//   width: 310.71px;
// `;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      width: '153.9px',
      height: '33.83px',
      left: '25.6px',
      top: '96px',
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '30px',
      lineHeight: '115%',
      color: '#828282',
      flexGrow: 1,
    },
    headerWrapper: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    selectionHeader: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    scrollDiv: {
      maxHeight: '380px',
      overflow: 'auto',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '310.71px',
    },
  }),
);

export default useStyles;
