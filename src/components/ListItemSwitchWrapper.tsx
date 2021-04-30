import { ListItem, ListItemSecondaryAction, ListItemText, Switch } from '@material-ui/core';
import React from 'react';

interface ListItemSwitchWrapperProps {
    leftText: string;
    checked: boolean;
    handleChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
    id: string;
    disabled?: boolean;
}


const ListItemSwitchWrapper = (props: ListItemSwitchWrapperProps) => {

    return (
        <ListItem disableGutters>
            <ListItemText
                primary={props.leftText}
                primaryTypographyProps={{ color: 'textPrimary', variant: 'body1' }}
            />
            <ListItemSecondaryAction>
                <Switch color='primary' edge='end' id={props.id} checked={props.checked} onChange={props.handleChange} />
            </ListItemSecondaryAction>
        </ListItem>
    )
}


export default ListItemSwitchWrapper