import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import { withStyles } from '@material-ui/core/styles';
import { createStyles } from '@material-ui/core';
import { PreservedCameraState } from './Camera';
import { createFinancialSummary } from '../../lib/airtable/request';

interface CameraPreviewState extends PreservedCameraState {
    photoUri: string;
}

interface CameraPreviewProps extends RouteComponentProps<{}, {}, CameraPreviewState> {
    classes: { photo: string }
}

const styles = () => createStyles({
    photo: {
        width: '100%',
    }
})

function CameraPreview(props: CameraPreviewProps) {
    const history = useHistory();
    const { preservedState, returnLink, photoUri } = props.location.state;


    // If the user enters the camera screen without a returnLink, 
    // we assume something went wrong and reset them to the home screen
    if (!props.location.state || !props.location.state.returnLink) {
        history.replace('home');
    }

    const handleConfirm = async () => {

        const financialSummary = await createFinancialSummary({ bankSlip: [{ url: photoUri }] });

        console.log(financialSummary);
        history.replace(returnLink, { ...preservedState, photo: photoUri })
    }

    return (
        <BaseScreen title="Preview" leftIcon="backNav">
            <img src={props.location.state.photoUri} className={props.classes.photo} />
            <Button
                label={'Next'}
                onClick={handleConfirm}
            />
        </BaseScreen>
    );
};

export default withStyles(styles)(CameraPreview);