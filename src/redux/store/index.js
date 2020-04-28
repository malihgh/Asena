import {createStore} from 'redux';
import rootReducers from '../reducers/index';

export default (appStore = createStore(rootReducers));
