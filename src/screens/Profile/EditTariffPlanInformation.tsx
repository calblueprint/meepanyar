import { List } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemWrapper from '../../components/ListItemWrapper';
import { RouteComponentProps } from 'react-router';
import { TariffPlanRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';


type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { tariffPlan: TariffPlanRecord }>;

function EditTariffPlanInformation(props: EditTarifPlanInformationProps) {
    const { tariffPlan } = props.location.state;

    const [newFixedTariff, setNewFixedTariff] = useState(tariffPlan.fixedTariff.toString() || '');
    const [newTariffByUnit, setNewTariffByUnit] = useState(tariffPlan.tariffByUnit.toString() || '');
    const [newFreeUnits, setNewFreeUnits] = useState(tariffPlan.freeUnits.toString() || '');

    const handleNewFixedTariffInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewFixedTariff(event.target.value as string || '');
    }

    const handleNewTariffByUnitInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewTariffByUnit(event.target.value as string || '');
    }

    const handleNewFreeUnitsInput = (event: React.ChangeEvent<{ value: unknown }>) => {
        setNewFreeUnits(event.target.value as string || '');
    }

    const handleSubmit = () => {

        console.log(`
        New fixed tariff: ${newFixedTariff}
        New Tariff By Unit: ${newTariffByUnit}
        New Free Units: ${newFreeUnits}
        `)
    }

    return (
        <BaseScreen title={tariffPlan.name} leftIcon="backNav">
            <List>
                <ListItemWrapper
                    leftText='Fixed Payment'
                    rightText={newFixedTariff}
                    editable
                    dense
                    editValue={newFixedTariff}
                    onEditChange={handleNewFixedTariffInput}
                    editInputId={'edit-fixed-tariff'}
                />
                <ListItemWrapper
                    leftText='Per Unit Payment'
                    rightText={newTariffByUnit}
                    editable
                    dense
                    editValue={newTariffByUnit}
                    onEditChange={handleNewTariffByUnitInput}
                    editInputId={'edit-tariff-by-unit'}
                />
                <ListItemWrapper
                    leftText='Free Units'
                    rightText={newFreeUnits}
                    editable
                    dense
                    editValue={newFreeUnits}
                    onEditChange={handleNewFreeUnitsInput}
                    editInputId={'edit-free-units'}
                />
            </List>
            <Button fullWidth label={'SAVE'} onClick={handleSubmit} />
        </BaseScreen>
    );
}

export default EditTariffPlanInformation;