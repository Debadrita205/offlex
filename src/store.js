import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducer from './reducers/reducer';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'reducer',
    storage: AsyncStorage,
};
const presistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
    presistedReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);
const persistor = persistStore(store);
export {persistor, store};
