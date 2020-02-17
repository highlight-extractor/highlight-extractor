import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Container from '@material-ui/core/Container';
import './App.css';
import browserHistory from './browserHistory';
import Highlights from './highlights/Highlights';
import Progress from './layout/Progress';
import Toast from './layout/Toast';
import { useStyles } from './muiStyles';
import rootReducer from './store/rootReducer';
import Upload from './upload/Upload';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

const Index = (): React.ReactElement => <h2>Home</h2>;

const AppRouter: React.FC = () => {
    const classes = useStyles();
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Container component="main" className={classes.main} maxWidth={false}>
                    <Progress />
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route path="/upload" exact component={Upload} />
                        <Route path="/highlights" exact component={Highlights} />
                    </Switch>
                    <Toast />
                </Container>
            </Router>
        </Provider>
    );
};

export default AppRouter;
