import styled from 'styled-components';
import { Button, TextField, Typography, Link, Container, Checkbox } from '@material-ui/core';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

export const Label = styled(Typography)`
  color: #828282;
  font-size: 12px;
  font-weight: bold;
`;

export const BackButton = styled(Button)`
  position: absolute;
  border-radius: 60px;
  width: 60px;
  height: 60px;
  margin: 3px -8px;
`;

export const BackArrow = styled(ArrowBackIosIcon)`
  color: #FF922E;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
`;

export const HeaderText = styled(Typography)`
  font-size: 18px;
  width: 100%;
  font-weight: bold;
  color: #828282;
  padding: 20px;
`;

export const HeaderDiv = styled('div')`
  display: flex;
  margin-top: 20px;
`;

export const MainDiv = styled('div')`
  margin-top: -10px;
`;

export const FieldDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 95%;
  margin: auto;
  margin-bottom: -10px;
`;

export const Field = styled(TextField)`
  background-color: white;
  border: 1px solid #FF922E;
  border-radius: 5px;
  width: 100%;
  height: 30px;
  padding: 1px 10px;
  margin-bottom: 25px;
`;

export const AddButton = styled(Button)`
  color: white;
  position: absolute;
  background-color: #FF922E;
  font-size: 12px;
  font-weight: bold;
  border-radius: 20px;
  width: 187px;
  height: 48px;
  margin: 0 auto;
  right: 0; left: 0;
  top: 60%;
  text-transform: none;
`;

export const Check = styled(Checkbox)`
  color: #FF922E;
  float: left;
  margin-left: 5%;
  size: small;
`;

export const CheckIcon = styled('div')`
  background-color: white;
  width: 20px;
  height: 20px;
  border: 1px solid #FF922E;
  border-radius: 3px;
  position: absolute;
`;

export const CheckDiv = styled('div')`
  display: flex;
  margin-top: 10px;
  margin-left: -6px;
  margin-bottom: 14px;
`;

export const CheckedIcon = styled(CheckBoxIcon)`
  position: absolute;
  color: #FF922E;
  width: 26px;
  height: 26px;
`;

export const CheckLabel = styled(Typography)`
  color: #828282;
  position: absolute;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  padding: 6px 0px;
  width: 300px;
  margin-left: 50px;
  margin-top: -5px;
`;

export const CheckField = styled(TextField)`
  position: absolute;
  background-color: white;
  border: 1px solid #FF922E;
  border-radius: 5px;
  width: 76px;
  height: 30px;
  margin-left: 95px;
  margin-top: -6px;
  padding: 0px 10px;
`;

//ONLY METER//

export const MeterDiv = styled('div')`
  display: block;
  text-align: left;
  padding: 20px;
`;

export const MeterLabel = styled(Typography)`
  color: #BDBDBD;
  font-weight: bold;
  font-size: 12px;
`;

export const OutlinedDiv = styled('div')`
  display: block;
  text-align: left;
  width: 100%;
  padding: 15px 15px 0px 15px;
  border: 1px solid #E5E5E5;
  border-radius: 6px;
`;
