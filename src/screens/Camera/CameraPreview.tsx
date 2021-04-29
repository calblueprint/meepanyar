import { createStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import Button from '../../components/Button';
import { PreservedCameraState } from './Camera';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';


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
    const intl = useInternationalization();
    const history = useHistory();
    const { preservedState, returnLink, photoUri, goBack } = props.location.state;


    // If the user enters the camera screen without a returnLink, 
    // we assume something went wrong and reset them to the home screen
    if (!props.location.state || !props.location.state.returnLink) {
        history.replace('home');
    }

    const handleConfirm = async () => {
        history.replace(returnLink, { ...preservedState, photo: photoUri, goBack: goBack - 1 })
    }

    return (
        <BaseScreen title={intl(words.preview)} leftIcon="backNav">
            <img src={props.location.state.photoUri} className={props.classes.photo} />
            <Button
                fullWidth
                label={intl(words.next)}
                onClick={handleConfirm}
            />
        </BaseScreen>
    );
};

export default withStyles(styles)(CameraPreview);