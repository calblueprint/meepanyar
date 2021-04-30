import { List } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { RouteComponentProps, useHistory } from 'react-router';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';
import { updateTariffPlan } from '../../lib/airtable/request';
import { updateTariffPlanInRedux } from '../../lib/redux/siteData';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { useSelector } from 'react-redux';
import { selectCurrentUserIsAdmin } from '../../lib/redux/userData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';
import { roundToString } from '../../lib/utils/utils';

type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { tariffPlan: TariffPlanRecord }>;

function EditTariffPlanInformation(props: EditTarifPlanInformationProps) {
    const intl = useInternationalization();
    const { tariffPlan } = props.location.state;
    const history = useHistory();
    const currentUserIsAdmin = useSelector(selectCurrentUserIsAdmin)
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        newFixedTariff: yup.number().min(0, 'Number can not be negative').required('Field is required'),
        newTariffByUnit: yup.number().min(0, 'Number can not be negative').required('Field is required'),
        newFreeUnits: yup.number().min(0, 'Number can not be negative').required('Field is required'),
    });

    const formik = useFormik({
        initialValues: {
            newFixedTariff: roundToString(tariffPlan.fixedTariff) || '',
            newTariffByUnit: roundToString(tariffPlan.tariffByUnit) || '',
            newFreeUnits: roundToString(tariffPlan.freeUnits) || '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: any) => {
        const { newFixedTariff, newTariffByUnit, newFreeUnits } = values;
        setLoading(true);

        const fixedTariff = parseFloat(newFixedTariff);
        const tariffByUnit = parseFloat(newTariffByUnit);
        const freeUnits = parseFloat(newFreeUnits);

        const newTariffPlanProperties = {
            fixedTariff,
            tariffByUnit,
            freeUnits
        }

        try {
            await updateTariffPlan(tariffPlan.id, newTariffPlanProperties);

        } catch (error) {
            console.error("Error occurred while attempting to update tariff plan: ", error);
            console.log('Network errors will have their requests retried when back online');
        } finally {
            // We naively update the tariff plan in redux and do proper authentication on the backend
            // to make sure only admins can successfully change tariff plans
            updateTariffPlanInRedux({ id: tariffPlan.id, ...newTariffPlanProperties });
            history.goBack()
        }
    }

    return (
        <BaseScreen title={tariffPlan.name} leftIcon="backNav">
            <form noValidate onSubmit={formik.handleSubmit}>
                <List>
                    <ListItemWrapper
                        leftText={intl(words.fixed_payment)}
                        editable={currentUserIsAdmin}
                        dense
                        editValue={formik.values.newFixedTariff}
                        onEditChange={formik.handleChange}
                        editInputId={'newFixedTariff'}
                        editUnit={intl(words.ks)}
                        editType='number'
                        error={formik.touched.newFixedTariff && Boolean(formik.errors.newFixedTariff)}
                        helperText={formik.touched.newFixedTariff && formik.errors.newFixedTariff}
                        editPlaceholder={intl(words.eg_x, '5')}
                    />
                    <ListItemWrapper
                        leftText={intl(words.per_unit_payment)}
                        editable={currentUserIsAdmin}
                        dense
                        editValue={formik.values.newTariffByUnit}
                        onEditChange={formik.handleChange}
                        editInputId={'newTariffByUnit'}
                        editUnit={`${intl(words.ks)}/${intl(words.kwh)}`}
                        editType='number'
                        error={formik.touched.newTariffByUnit && Boolean(formik.errors.newTariffByUnit)}
                        helperText={formik.touched.newTariffByUnit && formik.errors.newTariffByUnit}
                        editPlaceholder={intl(words.eg_x, '5')}
                    />
                    <ListItemWrapper
                        leftText={intl(words.free_units)}
                        editable={currentUserIsAdmin}
                        dense
                        editValue={formik.values.newFreeUnits}
                        onEditChange={formik.handleChange}
                        editInputId={'newFreeUnits'}
                        editUnit={intl(words.kwh)}
                        editType='number'
                        error={formik.touched.newFreeUnits && Boolean(formik.errors.newFreeUnits)}
                        helperText={formik.touched.newFreeUnits && formik.errors.newFreeUnits}
                        editPlaceholder={intl(words.eg_x, '5')}
                    />
                </List>
                {currentUserIsAdmin && <Button fullWidth label={intl(words.save)} loading={loading} />}
            </form>
        </BaseScreen>
    );
}

export default EditTariffPlanInformation;
