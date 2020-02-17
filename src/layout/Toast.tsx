import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { AppState, ToastState } from '../store/appCommons';

const Alert = (props: AlertProps): React.ReactElement => <MuiAlert elevation={6} variant="filled" {...props} />;

const EMPTY_MESSAGE = '';

const Toast = ({ type = 'info', message = EMPTY_MESSAGE }: ToastState): React.ReactElement => {
    const [alertText, setAlertText] = useState(message);

    // needed because same page will be reloaded at times
    // state has to be updated with the latest props because useState will run only the first time
    useEffect(() => setAlertText(message), [message]);

    const handleClose = (_event?: React.SyntheticEvent | React.MouseEvent, reason?: string): void => {
        if (reason === 'timeout' || reason === 'click') {
            setAlertText(EMPTY_MESSAGE);
        }
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            autoHideDuration={6000}
            open={alertText !== EMPTY_MESSAGE}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity={type}>
                {alertText}
            </Alert>
        </Snackbar>
    );
};

const mapStateToProps = ({ toast }: AppState): ToastState => toast;

export default connect(mapStateToProps)(Toast);
