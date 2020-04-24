import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import './App.css';
import browserHistory from './browserHistory';
import Highlights from './highlights/Highlights';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Progress from './layout/Progress';
import Toast from './layout/Toast';
import { useStyles } from './muiStyles';
import rootReducer from './store/rootReducer';
import Upload from './upload/Upload';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, loggerMiddleware));

const Index: React.FC = () => {
    useEffect(() => {
        document.title = 'Highlight Extractor';
    }, []);

    const classes = useStyles();
    return (
        <Container component="div" maxWidth="md" className={classes.paper}>
            <Grid container className={classes.gridContainer} justify="center" spacing={2}>
                <Grid item md={4} xs={12}>
                    <Card className={classes.navigation}>
                        <CardContent className={classes.navigationContent}>
                            <Typography variant="h5" component="h5">
                                View Highlights
                            </Typography>
                            <Link href={'/upload'}>Upload!</Link>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Card className={classes.navigation}>
                        <CardContent className={classes.navigationContent}>
                            <Typography variant="h5" component="h5">
                                More Features
                            </Typography>
                            <Link>Coming Soon!</Link>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

const AppRouter: React.FC = () => {
    const classes = useStyles();
    return (
        <Provider store={store}>
            <Router history={browserHistory}>
                <div className={classes.root}>
                    <Header />
                    <Container component="main" className={classes.main} maxWidth={false}>
                        <Progress />
                        <Switch>
                            <Route path="/" exact component={Index} />
                            <Route path="/upload" exact component={Upload} />
                            <Route path="/highlights" exact component={Highlights} />
                        </Switch>
                        <Toast />
                    </Container>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
};

export default AppRouter;
