import { store } from './store';
import { setLoadingForSiteData, saveSiteData } from './siteDataSlice';
import { base } from '../airtable/airtable';

const refreshSiteData = async (user: any): Promise<void> => {
  store.dispatch(setLoadingForSiteData());
  console.log('refresh Site finished loading for site data');
  const sites: string[] = user.fields.Site;
  console.log('refresh Site finished loading for site data');
  const siteInfo: any = [];

  await base('Sites')
    .select({
      view: 'Grid view',
    })
    .eachPage(async (records: any, fetchNextPage: any) => {
      records.forEach((record: any) => {
        siteInfo.push(record.fields);
        console.log('Site info pushed', JSON.stringify(record));
      });
      await fetchNextPage();
    });

  console.log('dispatch occurring');
  store.dispatch(saveSiteData(siteInfo));
};

export { refreshSiteData };
