import { List, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { RouteComponentProps, useHistory } from 'react-router';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';
import { updateTariffPlan } from '../../lib/airtable/request';
import { updateTariffPlanInRedux } from '../../lib/redux/siteData';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';


type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { tariffPlan: TariffPlanRecord }>;

function EditTariffPlanInformation(props: EditTarifPlanInformationProps) {
    const intl = useInternationalization();
    const { tariffPlan } = props.location.state;
    const history = useHistory();

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
            setErrorMessage(intl(words.all_fields_must_be_filled_with_numbers));
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
            updateTariffPlanInRedux({id: tariffPlan.id, ...newTariffPlanProperties});
            history.goBack()
        }
    }

    return (
        <BaseScreen title={tariffPlan.name} leftIcon="backNav">
            <List>
                <ListItemWrapper
                    leftText={intl(words.fixed_payment)}
                    rightText={newFixedTariff}
                    editable
                    dense
                    editValue={newFixedTariff}
                    onEditChange={handleNewFixedTariffInput}
                    editInputId={'edit-fixed-tariff'}
                    editUnit={intl(words.ks)}
                    editType={intl(words.number)}
                    editError={newFreeUnits !== ''}
                    editPlaceholder={intl(words.eg_x, '5')}
                />
                <ListItemWrapper
                    leftText={intl(words.per_unit_payment)}
                    rightText={newTariffByUnit}
                    editable
                    dense
                    editValue={newTariffByUnit}
                    onEditChange={handleNewTariffByUnitInput}
                    editInputId={'edit-tariff-by-unit'}
                    editUnit={`${intl(words.ks)}/${intl(words.kwh)}`}
                    editType={intl(words.number)}
                    editError={newFreeUnits !== ''}
                    editPlaceholder={intl(words.eg_x, '5')}
                />
                <ListItemWrapper
                    leftText={intl(words.free_units)}
                    rightText={newFreeUnits}
                    editable
                    dense
                    editValue={newFreeUnits}
                    onEditChange={handleNewFreeUnitsInput}
                    editInputId={'edit-free-units'}
                    editUnit={intl(words.kwh)}
                    editType={intl(words.number)}
                    editError={newFreeUnits !== ''}
                    editPlaceholder={intl(words.eg_x, '5')}
                />
            </List>
            <Button fullWidth label={intl(words.save)} onClick={handleSubmit} loading={loading} />
            {errorMessage ? <Typography color='error' align='center'> {errorMessage} </Typography> : null}
        </BaseScreen>
    );
}

export default EditTariffPlanInformation;