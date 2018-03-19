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
    _DEBUG: boolean,
    month: string,
    year: number
}

export default class App extends React.Component<MainProps, MainState> {


    constructor(props: MainProps) {
        super(props);
        this.state = {
            _DEBUG: true,
            month: '',
            year: 0,
            nyear: 0

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
        let date = new Date();
        this.setState({
            month: date.toLocaleString("ru", {month: "long"}),
            year: date.getFullYear()
        })

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

    larr_month_click = () => {
        console.log("larr_month_click: %s", "leftm");
    };
    rarr_month_click = () => {
        console.log("rarr_month_click: %s", "rightm");
    };
    larr_year_click = () => {
        let date = new Date();
        this.setState({
            nyear: date.setFullYear(1945)
        });

        console.log("qweqwe: %i", this.state.nyear);
        console.log("larr_year_click: %s", "lefty");
    };
    rarr_year_click = () => {
        console.log("rarr_year_click: %s", "righty");
    };

    public render() {
        if (this.state._DEBUG) {
            console.group('Main: -> render');
            console.log('props: %s', JSON.stringify(this.props));
            console.log('state: %s', JSON.stringify(this.state));
            console.groupEnd();
        }
        return (
            <div id="main">
                <div id="title">
                    <h1 className="h1_title">Календарь</h1>
                </div>
                <div id="menu">
                    <div id="month">
                        <a href="#" onClick={this.larr_month_click}>
                            &larr;
                        </a>
                        <span>
                            {
                                this.state.month
                            }
                        </span>
                        <a href="#" onClick={this.rarr_month_click}>
                            &rarr;
                        </a>
                    </div>
                    <div id="year">
                        <a href="#" onClick={this.larr_year_click}>
                            &larr;
                        </a>
                        <span>
                            {
                                this.state.year
                            }
                            </span>
                        <a href="#" onClick={this.rarr_year_click}>
                            &rarr;
                        </a>
                    </div>
                </div>
                <div id="body">
                    <div id="calender">
                        <ul>
                            <li></li>
                        </ul>

                    </div>
                    <div id="notes">
                        <span></span>
                        <textarea/>
                        <button></button>
                    </div>
                </div>

            </div>
        );
    }
}


// ---------------------------------------------------------------------------------------------------------------------