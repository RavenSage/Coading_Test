import React from 'react';
import { render } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import store from '../Redux/store';
import App from '../App';


describe('App - Page Testing', () => {
    it('Check App - rendering', () => {
        render(
             <reactRedux.Provider store={store}>
               <App />
            </reactRedux.Provider>
        );
    });
});
