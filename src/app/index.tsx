import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './app';

// Импортируем css
import '../css/reset.css';
import '../css/modification.css';

const application = document.getElementById('application');

const render = Component =>
	ReactDOM.render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		application
	);
render(App);

declare let module: { hot: any };
if(module.hot){
	module.hot.accept('./app', () => render(App));
}