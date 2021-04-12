import { List, ListItemText, ListItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { selectCurrentSiteInformation } from '../../lib/redux/siteData';

const styles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      color: theme.palette.primary.dark
    },
    rightTextStyles: {
      color: theme.palette.text.disabled
    },
    inputStyles: {
      textAlign: 'right',
      color: theme.palette.text.disabled
    }
  }));

function TariffPlans() {
    const classes = styles();

    return (
        <BaseScreen title="Tariff Plans" leftIcon="backNav">
            <List>
                <ListItem disableGutters>
                    <ListItemText primary='Used' primaryTypographyProps={{color: 'inherit'}} className={classes.header} />
                </ListItem>
                <ListItemWrapper leftText='Tariff Plan 1' divider />
                <ListItem disableGutters>
                    <ListItemText primary='Unused' className={classes.header} />
                </ListItem>
                <ListItemWrapper leftText='Tariff Plan 2' divider />
            </List>
        </BaseScreen>
    );
}

export default TariffPlans;