import { List, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { RouteComponentProps, useHistory } from 'react-router';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';
import { updateTariffPlan } from '../../lib/airtable/request';
import { updateTariffPlanInRedux } from '../../lib/redux/siteData';
import { useSelector } from 'react-redux';
import { selectCurrentUserIsAdmin } from '../../lib/redux/userData';


type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { tariffPlan: TariffPlanRecord }>;

function EditTariffPlanInformation(props: EditTarifPlanInformationProps) {
    const { tariffPlan } = props.location.state;
    const history = useHistory();

    const currentUserIsAdmin = useSelector(selectCurrentUserIsAdmin);
    const [newFixedTariff, setNewFixedTariff] = useState(tariffPlan.fixedTariff.toString() || '');
    const [newTariffByUnit, setNewTariffByUnit] = useState(tariffPlan.tariffByUnit.toString() || '');
    const [newFreeUnits, setNewFreeUnits] = useState(tariffPlan.freeUnits.toString() || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNewFixedTariffInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewFixedTariff(event.target.value as string || '');
    }

    const handleNewTariffByUnitInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewTariffByUnit(event.target.value as string || '');
    }

    const handleNewFreeUnitsInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewFreeUnits(event.target.value as string || '');
    }

    const handleSubmit = async (event: React.MouseEvent) => {

        const fixedTariff = parseFloat(newFixedTariff);
        const tariffByUnit = parseFloat(newTariffByUnit);
        const freeUnits = parseFloat(newFreeUnits);

        if (isNaN(fixedTariff) || isNaN(tariffByUnit) || isNaN(freeUnits)) {
            setErrorMessage('All fields must be filled with numbers');
            return
        } else {
            setLoading(true)
        }

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
            <List>
                <ListItemWrapper
                    leftText='Fixed Payment'
                    rightText={newFixedTariff}
                    editable={currentUserIsAdmin}
                    dense
                    editValue={newFixedTariff}
                    onEditChange={handleNewFixedTariffInput}
                    editInputId={'edit-fixed-tariff'}
                    editUnit={'Ks'}
                    editType='number'
                    editError={newFreeUnits !== ''}
                    editPlaceholder={'e.g. 5'}
                />
                <ListItemWrapper
                    leftText='Per Unit Payment'
                    rightText={newTariffByUnit}
                    editable={currentUserIsAdmin}
                    dense
                    editValue={newTariffByUnit}
                    onEditChange={handleNewTariffByUnitInput}
                    editInputId={'edit-tariff-by-unit'}
                    editUnit={'Ks/kWh'}
                    editType='number'
                    editError={newFreeUnits !== ''}
                    editPlaceholder={'e.g. 5'}
                />
                <ListItemWrapper
                    leftText='Free Units'
                    rightText={newFreeUnits}
                    editable={currentUserIsAdmin}
                    dense
                    editValue={newFreeUnits}
                    onEditChange={handleNewFreeUnitsInput}
                    editInputId={'edit-free-units'}
                    editUnit={'kWh'}
                    editType='number'
                    editError={newFreeUnits !== ''}
                    editPlaceholder={'e.g. 5'}
                />
            </List>
            {currentUserIsAdmin && <Button fullWidth label={'Save'} onClick={handleSubmit} loading={loading} />}
            {errorMessage ? <Typography color='error' align='center'> {errorMessage} </Typography> : null}
        </BaseScreen>
    );
}

export default EditTariffPlanInformation;