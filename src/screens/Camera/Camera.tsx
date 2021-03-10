import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
// Preset styles for camera
import 'react-html5-camera-photo/build/css/index.css';

const styles = (theme: Theme) => createStyles({

})

export interface PreservedCameraState {
    preservedState: object;
    returnLink: string;
}

type CameraProps = RouteComponentProps<{}, {}, PreservedCameraState>;

function CameraScreen(props: CameraProps) {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    // If the user enters the camera screen without a returnLink, 
    // we assume something went wrong and reset them to the home screen
    if (!props.location.state || !props.location.state.returnLink) {
        history.replace('home');
    }

    const { preservedState, returnLink } = props.location.state;

    // We navigate to a new screen and pass all state
    const onTakePhoto = (photoUri: string) => {
        history.push('/photo-preview', { ...preservedState, returnLink, photoUri })
    }

    const onCameraError = (error: Error) => {
        let exposedErrorMessage = '';
        if (error.name === 'NotFoundError') {
            exposedErrorMessage = 'Camera Not found :(';
            // Camera only works on secure contexts (https or localhost). Unsecure contexts are caught here
        } else if (error.name === 'TypeError' && !navigator.mediaDevices) {
            exposedErrorMessage = 'MediaDevices returned undefined. Ensure the connection to site is secure';
        } else {
            exposedErrorMessage = error.message;
        }

        setErrorMessage(exposedErrorMessage);
    }

    const renderErrorMessage = () => {
        return (
            <div>
                {`The following error occurred with camera: ${errorMessage}`}
            </div>
        )
    }

    const renderCamera = () => {
        return <Camera
            onTakePhotoAnimationDone={onTakePhoto}
            onCameraError={onCameraError}
            idealFacingMode={FACING_MODES.ENVIRONMENT}
            isDisplayStartCameraError={true}
            imageType={IMAGE_TYPES.JPG}
        />
    }

    return (
        <BaseScreen leftIcon="backNav">
            {errorMessage ? renderErrorMessage() : renderCamera()}
        </BaseScreen>
    )
}

export default withStyles(styles)(CameraScreen);
