import { List } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectCurrentSiteInformation, updateSiteInRedux } from '../../lib/redux/siteData';
import Button from '../../components/Button';
import { updateSite } from '../../lib/airtable/request';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';


function EditSiteInformation() {
    const intl = useInternationalization();
    const history = useHistory();

    const currentSite = useSelector(selectCurrentSiteInformation);
    const currentUserIsAdmin = useSelector(selectCurrentUserIsAdmin);
    const currentSiteName = currentSite ? currentSite.name : intl(words.no_site);

    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        siteName: yup.string().required('Site name can not be empty')
    });

    const formik = useFormik({
        initialValues: {
            siteName: currentSiteName
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: any) => {
        const { siteName } = values;
        setLoading(true);

        const newSiteInformation = {
            name: siteName
        }

        try {
            await updateSite(currentSite.id, newSiteInformation);

        } catch (error) {
            console.error("Error occurred while attempting to update site information: ", error);
            console.log('Network errors will have their requests retried when back online');
        } finally {
            // We naively update the tariff plan in redux and do proper authentication on the backend
            // to make sure only admins can successfully change tariff plans
            updateSiteInRedux({ id: currentSite.id, ...newSiteInformation });
            history.goBack()
        }
    }

    return (
        <BaseScreen title={intl(words.edit_site_information)} leftIcon="backNav">
            <form noValidate onSubmit={formik.handleSubmit}>
                <List>
                    <ListItemWrapper
                        leftText={intl(words.site_name)}
                        editable={currentUserIsAdmin}
                        dense
                        editValue={formik.values.siteName}
                        error={formik.touched.siteName && Boolean(formik.errors.siteName)}
                        helperText={formik.touched.siteName && formik.errors.siteName}
                        onEditChange={formik.handleChange}
                        editInputId={'siteName'}
                        editPlaceholder={'Input Site Name'}
                    />
                </List>
                {currentUserIsAdmin && <Button fullWidth label={intl(words.save)} loading={loading} />}
            </form>
        </BaseScreen>
    );
}

export default EditSiteInformation;