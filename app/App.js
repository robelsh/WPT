import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {routes} from './config/routes';

injectTapEventPlugin();

render(
  <div>{routes}</div>, document.getElementById('app')
);
