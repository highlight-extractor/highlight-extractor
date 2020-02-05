// Using 'browserHistory' instead of 'history' because of conflict with existing 'history'
// ref: https://github.com/ReactTraining/history/issues/681
import { createBrowserHistory } from 'history';

export default createBrowserHistory();
