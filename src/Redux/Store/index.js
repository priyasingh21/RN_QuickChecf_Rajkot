import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {AppContainer} from '../../AppNavigator'
import { appReducers } from '../Reducers';
import {persistStore, persistReducer} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware} from 'redux';

const PERSIST_CONFIG = {
    key: 'primary',
    storage: AsyncStorage,
    timeout: null,
    whitelist: ['User']
};

const PERSIST_REDUCER = persistReducer(PERSIST_CONFIG, appReducers);
const PERSIST_STORE = createStore(PERSIST_REDUCER, applyMiddleware(Thunk));
let PERSISTOR = persistStore(PERSIST_STORE);

export default class StoreConfig extends Component {
    render() {
        return(
            <Provider store={PERSIST_STORE}>
                <PersistGate loading={null} persistor={PERSISTOR}>
                    <AppContainer />
                </PersistGate>
            </Provider>
        );
    }
}
