import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './components/redux/reducers/rootReducer'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';

const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}

const loadFromLocalStorage = () =>{
    try{
        const serializedState = localStorage.getItem('state')
        if(serializedState === null){
            return undefined
        }
        return JSON.parse(serializedState)
    }catch(e){
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() =>saveToLocalStorage(store.getState()))

const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[900],
        },
    },
});

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
