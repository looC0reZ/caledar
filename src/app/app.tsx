import * as React from 'react';
import * as equal from 'fast-deep-equal';


// ---------------------------------------------------------------------------------------------------------------------
let language = 'ru';
if ('language' in window.navigator) {
    language = window.navigator['language'];
}
if ('browserLanguage' in window.navigator) {
    language = window.navigator['browserLanguage'];
}
if ('userLanguage' in window.navigator) {
    language = window.navigator['userLanguage'];
}

console.log('language: %s', language);

// > Main --------------------------------------------------------------------------------------------------------------
interface MainProps {

}

interface MainState {
    _DEBUG: boolean
}

export default class App extends React.Component<MainProps, MainState> {


    constructor(props: MainProps) {
        super(props);
        this.state = {
            _DEBUG: true

        };

    }

    public componentDidCatch(error: any, info: any) {
        if (this.state._DEBUG) {
            console.group('Main: -> componentDidCatch');
            console.log('error: %s', JSON.stringify(error));
            console.log('info: %s', JSON.stringify(info));
            console.groupEnd();
        }
    }

    public componentWillMount() {
        if (this.state._DEBUG) {
            console.group('Main: -> componentWillMount');
            console.groupEnd();
        }


    }

    public componentDidMount() {
        if (this.state._DEBUG) {
            console.group('Main: -> componentDidMount');
            console.groupEnd();
        }
    }

    public componentWillUnmount() {
        if (this.state._DEBUG) {
            console.group('Main: -> componentWillUnmount');
            console.groupEnd();
        }
    }

    public componentWillReceiveProps(nextProps: any) {
        if (this.state._DEBUG) {
            console.group('Main: -> componentWillReceiveProps');
            console.log('nextProps: %s', JSON.stringify(nextProps));
            console.groupEnd();
        }
    }

    public shouldComponentUpdate(nextProps: any, nextState: any) {
        let retProps = equal(this.props, nextProps);
        let retState = equal(this.state, nextState);
        let ret = !retProps || !retState;
        if (this.state._DEBUG) {
            console.group('Main: -> shouldComponentUpdate');
            console.log('prevProps: %s', JSON.stringify(this.props));
            console.log('nextProps: %s', JSON.stringify(nextProps));
            console.log('prevState: %s', JSON.stringify(this.state));
            console.log('nextState: %s', JSON.stringify(nextState));
            console.log('props compare -> %s', retProps);
            console.log('state compare -> %s', retState);
            console.log('update -> %s', ret);
            console.groupEnd();
        }
        return ret;
    }

    public componentWillUpdate(nextProps: any, nextState: any) {
        if (this.state._DEBUG) {
            console.group('Main: -> componentWillUpdate');
            console.log('nextProps: %s', JSON.stringify(nextProps));
            console.log('nextState: %s', JSON.stringify(nextState));
            console.groupEnd();
        }
    }

    public componentDidUpdate(prevProps: any, prevState: any) {
        if (this.state._DEBUG) {
            console.group('Main: -> componentDidUpdate');
            console.log('prevProps: %s', JSON.stringify(prevProps));
            console.log('prevState: %s', JSON.stringify(prevState));
            console.groupEnd();
        }
    }


    public render() {
        if (this.state._DEBUG) {
            console.group('Main: -> render');
            console.log('props: %s', JSON.stringify(this.props));
            console.log('state: %s', JSON.stringify(this.state));
            console.groupEnd();
        }
        return (
            <div>

            </div>
        );
    }
}


// ---------------------------------------------------------------------------------------------------------------------