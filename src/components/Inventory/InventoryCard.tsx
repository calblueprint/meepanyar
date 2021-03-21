import { Card, CardActions, IconButton, Typography } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import React from 'react';
import { connect } from 'react-redux';
import { InventoryRecord, ProductRecord } from '../../lib/airtable/interface';
import { RootState } from '../../lib/redux/store';


const styles = (theme: Theme) =>
  createStyles({
    arrow: {
      color: theme.palette.primary.main,
    },
    cardContent: {
      flexGrow: 1,
      display: 'flex',
      margin: '0px',
      paddingTop: '16px',
      paddingLeft: '16px',
    },
    titleText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '20px',
      lineHeight: '98.1%',
      color: theme.palette.text.primary,
      paddingTop: '14px'
    },
    updatedText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: theme.typography.body1.fontWeight,
      fontSize: theme.typography.body1.fontSize,
      color: '#BDBDBD',
    },
    totalText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: theme.typography.body1.fontWeight,
      fontSize: theme.typography.body1.fontSize,
      color: '#6A6A6A',
      paddingTop: '14px'
    },
    numberText: {
      fontFamily: 'Helvetica Neue',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '15px',
      color: '#FF866F',
    },
    divSpacing: {
      paddingLeft: '15px',
    },
    singleCard: {
      width: '100%',
      height: '93.26px',
      background: '#ffffff',
      border: '1px solid #e5e5e5',
      boxSizing: 'border-box',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.14)',
      borderRadius: '10px',
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'row',
      marginBottom: '10px',
    },
    active: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: '#64B676',
      marginTop: '26px',
      marginRight: '5px',
    },
    notActive: {
      height: '7px',
      width: '7px',
      borderRadius: '50%',
      backgroundColor: '#E0E0E0',
      marginTop: '26px',
      marginRight: '5px',
    },
    arrowSpacing: {
      padding: '0px',
    },
  });
interface InventoryCardProps {
  inventoryItem: InventoryRecord;
  classes: {
    arrow: string; cardContent: string; updatedText: string;
    singleCard: string; titleText: string; totalText: string;
    numberText: string; divSpacing: string; active: string;
    notActive: string; arrowSpacing: string;
  };
  products: Record<string, ProductRecord>;
}

function InventoryCard(props: InventoryCardProps) {
  const { classes, inventoryItem, products} = props;
  return (
    <Card className={classes.singleCard}>
      <div className={classes.cardContent}>
        <div>
          <Typography className={classes.titleText}>{products[inventoryItem.productId]?.name}</Typography>
          <Typography className={classes.updatedText}>Last Updated: 00.00</Typography>
        </div>
      </div>
      <CardActions className={classes.arrowSpacing}>
        <IconButton>
          <ArrowForwardIosIcon className={classes.arrow} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: RootState) => ({
  products: state.inventoryData.products || {}
});

export default connect(mapStateToProps)(withStyles(styles)(InventoryCard));
