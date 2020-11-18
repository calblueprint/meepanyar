import { store } from './store';
import { setLoadingForSiteData, setCurrSite, saveSiteData } from './siteDataSlice';
import { base } from '../airtable/airtable';

const refreshSiteData = async (user: any): Promise<void> => {
    store.dispatch(setLoadingForSiteData());
    const siteIds: string[] = user.fields.Site;
    let currentSite = null;
    const sites: any = [];

    await base('Sites')
        .select({
            view: 'Grid view',
        })
        .eachPage((records: any, fetchNextPage: any) => {
            records.forEach((record: any) => {
                sites.push(record);
            });
            fetchNextPage();
        });

    if (sites.length > 0) {
        currentSite = sites[0];
    }

    const siteData = {
        sites,
        currentSite,
    };

    store.dispatch(saveSiteData(siteData));
};

const setCurrentSite = (newSiteId: string): void => {
    store.dispatch(setCurrSite(newSiteId));
};

export { refreshSiteData };
