import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/chat/Chat'
import { Provider } from 'react-redux';
import 'react-app-polyfill/ie11';

import { PersistGate } from 'redux-persist/integration/react';

// import store
import store, { persistor } from './store/index';

export function Root() {
    return (
        <Provider store={ store } >
            <PersistGate persistor={ persistor } loading={ <span></span> } >
               <Chat/>
            </PersistGate>
        </Provider>
    );
}

ReactDOM.render( <Root />, document.getElementById( 'root' ) );