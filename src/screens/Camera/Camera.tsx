import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import BaseScreen from '../../components/BaseComponents/BaseScreen';


interface CameraProps extends RouteComponentProps {
    location: any;
}

const styles = (theme: Theme) => {
    createStyles({

    })
}


function Camera(props: CameraProps) {
    const [photo, setPhoto] = useState(null);

    return (
        <BaseScreen title="Camera" leftIcon="backNav">
            <div>
                Hello!
        </div>
        </BaseScreen>
    )
}

export default withStyles(styles)(Camera);
