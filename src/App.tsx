import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import './App.css';
import browserHistory from './browserHistory';
import Highlights from './highlights/Highlights';
import rootReducer from './store/reducers/rootReducer';
import Upload from './upload/Upload';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

const Index = (): React.ReactElement => {
    return <h2>Home</h2>;
};

const AppRouter: React.FC = () => {
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" exact component={Index} />
                <Route path="/upload" exact component={Upload} />
                <Route path="/highlights" exact component={Highlights} />
            </Router>
        </Provider>
    );
};

export default AppRouter;
