import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { createStyles, Theme } from '@material-ui/core';
import { RouteComponentProps, useHistory } from 'react-router-dom';


interface CameraProps extends RouteComponentProps {
    location: any;
}

const styles = (theme: Theme) => {
    createStyles({

    })
}


function Camera(props: CameraProps) {
    const [photo, setPhoto] = useState(null);

    return <div>
        Camera Component!
        </div>
}

export default withStyles(styles)(Camera);
