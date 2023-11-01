import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { ThemeProvider } from '@emotion/react';
import theme from './utils/desgin/Theme';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SuccessSnackbar } from './features/commons/SuccessSnackbar';

const container = document.getElementById('root');
const root = createRoot(container);
const persistor = persistStore(store);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <PersistGate loading={null} persistor={persistor}>
                    <App />
                    <SuccessSnackbar />
                </PersistGate>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
