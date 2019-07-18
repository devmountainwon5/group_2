import React from 'react';
import { Switch, Route } from 'react-router-dom';
import App from './App'

export default (
    <Switch>
        <Route component={App} exact path='/' />
    </Switch>
)