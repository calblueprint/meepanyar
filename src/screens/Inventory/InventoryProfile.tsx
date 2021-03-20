import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import { InventoryRecord, SiteRecord } from '../../lib/airtable/interface';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { RootState } from '../../lib/redux/store';


const styles = (theme: Theme) =>
  createStyles({
    content: {
      color: theme.palette.text.primary,
    },
    section: {
      marginTop: '30px',
    },
    headerWrapper: {
      marginTop: '15px',
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    buttonPrimary: {
      borderRadius: '12px',
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    buttonSecondary: {
      borderRadius: '12px',
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.secondary.main,
    },
  });

interface InventoryProps extends RouteComponentProps {
  classes: { content: string; section: string; headerWrapper: string; buttonPrimary: string; buttonSecondary: string;};
  currentSite: SiteRecord;
  location: any;
}

function InventoryProfile(props: InventoryProps) {
  const { classes } = props;
  const inventoryItem: InventoryRecord = props.location.state.inventoryItem;
  console.log("in inventory profile", inventoryItem);

  // data retrieval
  const UNDEFINED_AMOUNT = '-';
  
  return (
    <BaseScreen leftIcon="backNav" title={"PROFILE"}>
      <BaseScrollView>
        <div className={classes.content}>
          <Typography variant="h1">{inventoryItem.productId}</Typography>
          <Typography variant="body1" color="textSecondary">
            "WOW"
          </Typography>
          <div className={classes.section}>
            <Typography variant="h2">
              Meter Reading
            </Typography>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}

const mapStateToProps = (state: RootState) => ({
  currentSite: state.siteData.currentSite || EMPTY_SITE,
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryProfile));
