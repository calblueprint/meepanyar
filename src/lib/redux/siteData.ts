import { setCurrSite } from './siteDataSlice';
import { store } from './store';

const setCurrentSite = (newSite: any): void => {
  store.dispatch(setCurrSite(newSite));
};

const getCurrentSiteId = (): string => {
  return store.getState().siteData.currentSite.id;
}

export { setCurrentSite, getCurrentSiteId };
