
import { Typography, withStyles } from '@material-ui/core';
import { createStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    content: {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '6px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    leftColumnContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    rightColumnContainer: {
      textAlign: 'right',
    },
  });

interface InventoryInfoProps {
  classes: { content: string; leftColumnContainer: string; rightColumnContainer: string; };
  productName: string;
  lastUpdated: string;
  currentQuantity: number;
  unit: string;
}

function InventoryInfo(props: InventoryInfoProps) {
  // TODO: better to pass in individual vars or whole inventory record?
  const { classes, productName, lastUpdated, currentQuantity, unit} = props;

  return (
    <div className={classes.content}>
      <div className={classes.leftColumnContainer}>
        <Typography variant="h2" color="textPrimary">
          {productName}
        </Typography>
        <Typography variant="caption">
          Last Updated
        </Typography>
        <Typography variant="caption">
          {lastUpdated}
        </Typography>
      </div>
      <div className={classes.rightColumnContainer}>
          <Typography variant="body2">{`${currentQuantity} ${unit}(s)`}</Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(InventoryInfo);
