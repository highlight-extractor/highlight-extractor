import React from 'react';
import { connect } from 'react-redux';
import { LinearProgress } from '@material-ui/core';
import { useStyles } from '../muiStyles';
import { AppState, ProgressState } from '../store/appCommons';

const Progress = ({ inProgress }: ProgressState): React.ReactElement => {
    const classes = useStyles();
    return <React.Fragment>{inProgress ? <LinearProgress className={classes.progress} /> : null}</React.Fragment>;
};

const mapStateToProps = ({ progress }: AppState): ProgressState => progress;

export default connect(mapStateToProps)(Progress);
