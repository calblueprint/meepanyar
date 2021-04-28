import Typography from '@material-ui/core/Typography';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import AddIcon from '@material-ui/icons/Add';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { IconButton } from '@material-ui/core';
import React from 'react';
import { formatDateStringToLocal, getCurrentPeriod, getNextPeriod } from '../../lib/moment/momentUtils';
import OutlinedCardList, { CardPropsInfo } from '../../components/OutlinedCardList';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCustomersToMeter, selectCustomersToCollect } from '../../lib/redux/customerData';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { selectAllSitesInformation, selectCurrentSiteInformation } from '../../lib/redux/siteData';
import { EMPTY_SITE } from '../../lib/redux/siteDataSlice';
import { selectCurrentUser, selectIsOnline, selectLastUpdated } from '../../lib/redux/userData';

const styles = (theme: Theme) =>
  createStyles({
    header: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    section: {
      marginTop: theme.spacing(2)
    },
    network: {
      textAlign: 'right',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      flex: 1
    },
    financialSums: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonPrimary: {
      borderRadius: '12px',
      color: 'white',
      marginRight: '5px',
      backgroundColor: theme.palette.primary.main,
    }

  });

interface HomeProps {
  classes: { header: string; network: string, financialSums: string; buttonPrimary: string; section: string; };
}

function Home(props: HomeProps) {
  const { classes } = props;
  const numCustomersToMeter = useSelector(selectCustomersToMeter)?.length || 0;
  const numCustomersToCollect = useSelector(selectCustomersToCollect)?.length || 0;
  const allSites: SiteRecord[] = useSelector(selectAllSitesInformation) || [];
  const currentSite: SiteRecord = useSelector(selectCurrentSiteInformation) || EMPTY_SITE;
  const user = useSelector(selectCurrentUser);
  const isOnline = useSelector(selectIsOnline) || false;
  const lastUpdated = formatDateStringToLocal(useSelector(selectLastUpdated));

  // This'll eventually be calculated via a selector that sums the profit of Mee Panyar over all periods
  // Tiffany will have the profit calculation done on her Financial Summary PR, so we can add it after that
  const amountOwed = isOnline ? 6000 : 0;

  const getAmountOwedCard = () => {
    const amountOwedCardInfo: CardPropsInfo[] = [{
      number: amountOwed.toString(),
      label: 'Owed to MP',
      unit: 'Ks'
    }]

    const addButton = <IconButton
      component={Link}
      to='/home'
      size="small"
      className={classes.buttonPrimary}
    >
      <AddIcon />
    </IconButton>

    return (
      <div className={classes.section}>
        <OutlinedCardList
          highlighted={amountOwed !== 0}
          info={amountOwedCardInfo}
          rightIcon={amountOwed === 0 ? <CheckCircleOutlineIcon /> : addButton}
        />
      </div>)
  }

  return (
    <BaseScreen rightIcon="user">
      <BaseScrollView>
        <div className={classes.header}>
          <div style={{ flex: 2 }}>
            <SiteMenu currentSite={currentSite} sites={allSites} />
            <Typography color='secondary'>
              Current Period: {formatDateStringToLocal(getCurrentPeriod(), true)}
            </Typography>
            <Typography color='secondary'>
              Deadline: {formatDateStringToLocal(getNextPeriod(), true)}
            </Typography>
          </div>
          <div className={classes.network}>
            {isOnline ? <CloudOutlinedIcon /> : <CloudOffIcon color="disabled" />}
            <Typography variant="caption" color='secondary'>
              Last Connected to Network
            </Typography>
            <Typography variant="caption" color='secondary'>
              {lastUpdated}
            </Typography>
          </div>
        </div>

        {user?.organization === 'Meepanyar' && getAmountOwedCard()}

        <div className={classes.section}>
          <Typography variant='h2'>
            Tasks
        </Typography>
          <Link to={'/customers'}>
            <HomeMenuItem
              label="To Meter"
              amount={numCustomersToMeter}
              iconType="meter"
            />
          </Link>
          <Link to={'/customers'}>
            <HomeMenuItem
              label="To Collect"
              amount={numCustomersToCollect}
              iconType="collect"
            />
          </Link>
          {/* Screen and workflows not yet built out */}
          <Link to={'/maintenance'}>
            <HomeMenuItem
              label="Maintenance"
              amount={0}
              iconType="maintenance"
            />
          </Link>
          {/* Screen and workflows not yet built out */}
          <Link to={'/incidents'}>
            <HomeMenuItem
              label="Incidents"
              amount={0}
              iconType="incident"
            />
          </Link>
        </div>
        <div className={classes.section}>
          <Typography variant='h2'>
            Financial Reports
          </Typography>
          {/* TODO: These buttons should lead to the appropriate places */}
          <div className={classes.financialSums}>
            <div style={{ paddingRight: 10 }}>
              <Link to={'/financial-summary'}>
                <Button label='Current Period' startIcon={<DescriptionIcon />} />
              </Link>
            </div>
            <Link to={'/financial-summary'}>
              <Button label='Past Reports' variant='outlined' />
            </Link>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}


export default withStyles(styles)(Home);
