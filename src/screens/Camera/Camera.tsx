import React, { useState } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
// Preset styles for camera
import 'react-html5-camera-photo/build/css/index.css';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';

export interface PreservedCameraState {
    preservedState: object;
    returnLink: string;
    goBack: number;
}

// TODO: @julianrkung Styling for camera once deployment occurs and you can access on phone

/**
 * This component is meant to fulfill the role of a general-use camera component.
 * To navigate to this component, invoke the `navigateToCamera` method in `cameraUtils.ts`, passing in any state that should be preserved.
 * After taking a picture, it leads to `/camera/preview` and the `CameraPreview` component, where the user can confirm.
 * Once confirmed, the user will be brought back to the screen where `navigateToCamera` was invoked, passing a `photo` prop with photo data.
 */

type CameraProps = RouteComponentProps<{}, {}, PreservedCameraState>;

function CameraScreen(props: CameraProps) {
    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState('');

    // If the user enters the camera screen without a returnLink,
    // we assume something went wrong and reset them to the home screen
    if (!props.location.state || !props.location.state.returnLink) {
        history.replace('home');
    }

    const { preservedState, returnLink, goBack } = props.location.state;

    // We navigate to a new screen and pass all state
    const onTakePhoto = (photoUri: string) => {
        history.push('/camera/preview', { preservedState, returnLink, photoUri, goBack: goBack - 1 })
    }

    const onCameraError = (error: Error) => {
        let exposedErrorMessage = '';
        if (error.name === 'NotFoundError') {
            exposedErrorMessage = 'Camera Not found';
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
            isImageMirror={false}
        />
    }

    return (
        <BaseScreen leftIcon="backNav" backAction={() => history.replace(returnLink, {...preservedState})}>
            {errorMessage ? renderErrorMessage() : renderCamera()}
        </BaseScreen>
    )
}

export default CameraScreen;
