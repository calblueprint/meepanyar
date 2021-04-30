import { List } from '@material-ui/core';
import React, { useState } from 'react';
import BaseScreen from '../../components/BaseComponents/BaseScreen';
import ListItemSwitchWrapper from '../../components/ListItemSwitchWrapper';
import { RouteComponentProps, useHistory } from 'react-router';
import { UserRecord } from '../../lib/airtable/interface';
import Button from '../../components/Button';
import { updateUser } from '../../lib/airtable/request';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { selectCurrentUserIsAdmin, updateUserInRedux } from '../../lib/redux/userData';
import { useSelector } from 'react-redux';
import { useInternationalization } from '../../lib/i18next/translator';
import words from '../../lib/i18next/words';

type EditTarifPlanInformationProps = RouteComponentProps<{}, {}, { user: UserRecord }>;

function EditUserInformation(props: EditTarifPlanInformationProps) {
    const intl = useInternationalization();
    const { user } = props.location.state;

    const history = useHistory();
    const currentUserIsAdmin = useSelector(selectCurrentUserIsAdmin);
    const [loading, setLoading] = useState(false);

    const validationSchema = yup.object({
        isAdmin: yup.boolean(),
        isActive: yup.boolean()
    });

    const formik = useFormik({
        initialValues: {
            isAdmin: user.admin || false,
            isActive: !user.inactive
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmit(values)
        }
    })

    const handleSubmit = async (values: any) => {
        const { isAdmin, isActive } = values;
        setLoading(true);

        try {
            await updateUser(user.id, { admin: isAdmin, inactive: !isActive });
        } catch (error) {
            console.error("Error occurred while attempting to update user: ", error);
        } finally {
            // We naively update the user in redux and do proper authentication on the backend
            // to make sure only admins can successfully make other users admins
            updateUserInRedux({ id: user.id, admin: isAdmin, inactive: !isActive });
            history.goBack()
        }
    }

    return (
        <BaseScreen title={user.name} leftIcon="backNav">
            <form noValidate onSubmit={formik.handleSubmit}>
                <List>
                    <ListItemSwitchWrapper
                        id='isAdmin'
                        leftText={intl(words.admin_permission)}
                        checked={formik.values.isAdmin}
                        handleChange={formik.handleChange}
                        disabled={!currentUserIsAdmin}
                    />
                    <ListItemSwitchWrapper
                        id='isActive'
                        leftText={intl(words.active_status)}
                        checked={formik.values.isActive}
                        handleChange={formik.handleChange}
                        disabled={!currentUserIsAdmin}
                    />
                </List>
                {currentUserIsAdmin && <Button fullWidth label={intl(words.save)} loading={loading} />}
            </form>
        </BaseScreen >
    );
}

export default EditUserInformation;