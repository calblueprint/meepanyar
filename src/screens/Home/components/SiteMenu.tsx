import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../lib/redux/store';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';

import { SiteRecord } from '../../../lib/airtable/interface';
import { setCurrentSite } from '../../../lib/redux/siteData';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      color: '#828282',
      display: 'flex',
      alignItems: 'flex-end',
      width: '150px',
    },
    icon: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '5px',
      padding: 0,
      marginLeft: '10px',
    },
  });

interface SiteMenuProps {
  currentSite: SiteRecord;
  sites: SiteRecord[];
  classes: { root: string; icon: string };
}

function SiteMenu(props: SiteMenuProps) {
  const { currentSite, sites, classes } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const selectSite = (event: React.MouseEvent<HTMLElement>, site: SiteRecord) => {
    setAnchorEl(null);
    setCurrentSite(site);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Typography variant="h1">
        {/* TODO: Loading screen for empty store */}
        {currentSite && currentSite.name}
        <IconButton className={classes.icon} onClick={openMenu}>
          <ArrowDropDownIcon color="primary" />
        </IconButton>
        <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={closeMenu}>
          {sites.map((site) => (
            <MenuItem
              key={site.name}
              selected={currentSite.name === site.name}
              onClick={(event) => selectSite(event, site)}
            >
              {site.name}
            </MenuItem>
          ))}
        </Menu>
      </Typography>
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const sites = state.siteData.sites;
  return { sites };
};

export default connect(mapStateToProps)(withStyles(styles)(SiteMenu));
