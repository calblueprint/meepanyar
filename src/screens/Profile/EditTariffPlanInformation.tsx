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


type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { tariffPlan: TariffPlanRecord }>;

function EditTariffPlanInformation(props: EditTarifPlanInformationProps) {
    const { tariffPlan } = props.location.state;
    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        newFixedTariff: yup.number().min(0, 'Number can not be negative').required('Field is required'),
        newTariffByUnit: yup.number().min(0, 'Number can not be negative').required('Field is required'),
        newFreeUnits: yup.number().min(0, 'Number can not be negative').required('Field is required'),
    });

    const formik = useFormik({
        initialValues: {
            newFixedTariff: tariffPlan.fixedTariff.toString() || '',
            newTariffByUnit: tariffPlan.tariffByUnit.toString() || '',
            newFreeUnits: tariffPlan.freeUnits.toString() || '',
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
                        leftText='Fixed Payment'
                        editable
                        dense
                        editValue={formik.values.newFixedTariff}
                        onEditChange={formik.handleChange}
                        editInputId={'newFixedTariff'}
                        editUnit={'Ks'}
                        editType='number'
                        error={formik.touched.newFixedTariff && Boolean(formik.errors.newFixedTariff)}
                        helperText={formik.touched.newFixedTariff && formik.errors.newFixedTariff}
                        editPlaceholder={'e.g. 5'}
                    />
                    <ListItemWrapper
                        leftText='Per Unit Payment'
                        editable
                        dense
                        editValue={formik.values.newTariffByUnit}
                        onEditChange={formik.handleChange}
                        editInputId={'newTariffByUnit'}
                        editUnit={'Ks/kWh'}
                        editType='number'
                        error={formik.touched.newTariffByUnit && Boolean(formik.errors.newTariffByUnit)}
                        helperText={formik.touched.newTariffByUnit && formik.errors.newTariffByUnit}
                        editPlaceholder={'e.g. 5'}
                    />
                    <ListItemWrapper
                        leftText='Free Units'
                        editable
                        dense
                        editValue={formik.values.newFreeUnits}
                        onEditChange={formik.handleChange}
                        editInputId={'newFreeUnits'}
                        editUnit={'kWh'}
                        editType='number'
                        error={formik.touched.newFreeUnits && Boolean(formik.errors.newFreeUnits)}
                        helperText={formik.touched.newFreeUnits && formik.errors.newFreeUnits}
                        editPlaceholder={'e.g. 5'}
                    />
                </List>
                <Button fullWidth label={'Save'} loading={loading} />
            </form>
        </BaseScreen>
    );
}

export default EditTariffPlanInformation;