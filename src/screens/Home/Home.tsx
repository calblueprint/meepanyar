import Typography from '@material-ui/core/Typography';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import DescriptionIcon from '@material-ui/icons/Description';
import React from 'react';
import { formatDateStringToLocal, getCurrentPeriod, getNextPeriod, getCurrentMonthGracePeriodDeadline } from '../../lib/moment/momentUtils';
import { withStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { SiteRecord } from '../../lib/airtable/interface';
import HomeMenuItem from './components/HomeMenuItem';
import SiteMenu from './components/SiteMenu';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import { selectCustomersToMeter, selectCustomersToCollect } from '../../lib/redux/customerData';
import BaseScrollView from '../../components/BaseComponents/BaseScrollView';
import Button from '../../components/Button';
import { selectAllSitesInformation, selectCurrentSiteInformation, selectCurrentPeriodFinancialSummary } from '../../lib/redux/siteData';
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
  const intl = useInternationalization();
  const { classes } = props;
  const numCustomersToMeter = useSelector(selectCustomersToMeter)?.length || 0;
  const numCustomersToCollect = useSelector(selectCustomersToCollect)?.length || 0;
  const allSites: SiteRecord[] = useSelector(selectAllSitesInformation) || [];
  const currentSite: SiteRecord = useSelector(selectCurrentSiteInformation) || EMPTY_SITE;
  const isOnline = useSelector(selectIsOnline) || false;
  const lastUpdated = formatDateStringToLocal(useSelector(selectLastUpdated));

  return (
    <BaseScreen rightIcon="user">
      <BaseScrollView>
        <div className={classes.header}>
          <div style={{ flex: 2 }}>
            <SiteMenu currentSite={currentSite} sites={allSites} />
            <Typography color='secondary'>
              {intl(words.current_x, words.period)}: {formatDateStringToLocal(getCurrentPeriod(), true)}
            </Typography>
            <Typography color='secondary'>
              {intl(words.next_deadline)}: {formatDateStringToLocal(getNextPeriod(), true)}
            </Typography>
          </div>
          <div className={classes.network}>
            {isOnline ? <CloudOutlinedIcon /> : <CloudOffIcon color="disabled" />}
            <Typography variant="caption" color='secondary'>
              {intl(words.last_connected_to_network)}
            </Typography>
            <Typography variant="caption" color='secondary'>
              {lastUpdated}
            </Typography>
          </div>
        </div>

        <div className={classes.section}>
          <Typography variant='h2'>
            {intl(words.tasks)}
          </Typography>
          <Link to={'/customers'}>
            <HomeMenuItem
              label={intl(words.to_meter)}
              amount={numCustomersToMeter}
              iconType="meter"
            />
          </Link>
          <Link to={'/customers'}>
            <HomeMenuItem
              label={intl(words.to_collect)}
              amount={numCustomersToCollect}
              iconType="collect"
            />
          </Link>
          {/* Screen and workflows not yet built out */}
          <Link to={'/maintenance'}>
            <HomeMenuItem
              label={intl(words.maintenance)}
              amount={0}
              iconType="maintenance"
            />
          </Link>
          {/* Screen and workflows not yet built out */}
          <Link to={'/incidents'}>
            <HomeMenuItem
              label={intl(words.incidents)}
              amount={0}
              iconType="incident"
            />
          </Link>
        </div>
        <div className={classes.section}>
          <Typography variant='h2'>
            {intl(words.financial_reports)}
          </Typography>
          <div className={classes.financialSums}>
            <div style={{ paddingRight: 10 }}>
              <Link
                to={{
                  pathname: '/financial-summaries/report',
                  state: {
                    report: selectCurrentPeriodFinancialSummary(),
                    deadline: formatDateStringToLocal(getCurrentMonthGracePeriodDeadline().toString()),
                  }
                }}
              >
                <Button label={intl(words.current_x, words.period)} startIcon={<DescriptionIcon />} />
              </Link>
            </div>
            <Link to={'/financial-summaries'}>
              <Button label={intl(words.past_x, words.reports)} variant='outlined' />
            </Link>
          </div>
        </div>
      </BaseScrollView>
    </BaseScreen>
  );
}


export default withStyles(styles)(Home);
