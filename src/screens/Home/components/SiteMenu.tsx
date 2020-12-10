import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../lib/redux/store';

import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { SiteRecord } from '../../../utils/airtable/interface';
import { setCurrentSite } from '../../../lib/redux/siteData';

const styles = (theme: Theme) =>
  createStyles({
    icon: {
      border: '1px solid',
      borderColor: theme.palette.primary.main,
      borderRadius: '5px',
      padding: 0,
    },
  });

interface SiteMenuProps {
  currentSite: SiteRecord;
  sites: SiteRecord[];
  classes: any;
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
    </div>
  );
}

const mapStateToProps = (state: RootState) => {
  const sites = state.siteData.sites;
  return { sites };
};

export default connect(mapStateToProps)(withStyles(styles)(SiteMenu));
