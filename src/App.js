import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css.map'
import './App.css';
import {Panel, Table, Navbar, Nav, NavItem} from 'react-bootstrap'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            input: null,
            from: '',
            to: '',
            calc: false,
            conv: false
        }
    }
    handleOpen(item){
        switch (item) {
            case 'calculator':
                this.setState({
                    calc: true,
                    conv: false
                });
                break;
            case 'converter':
                this.setState({
                    calc: false,
                    conv: true
                })
                break;
        }
    }

    toCelsius(from, input){
        switch (from) {
            case 'Градусы Кельвина':
                return (input - 273.15);
            case 'Градусы Фаренгейта':
                return (input-32)*5/9;
            default:
                return input;
        }
    }

    fromCelsius(to, input){
        switch (to) {
            case 'Градусы Кельвина':
                return parseInt(input) + 273.15;
            case 'Градусы Фаренгейта':
                return (input*9/5)+32;
            default:
                return input;
        }
    }

    handleConvert(obj) {
        this.setState({
            input:obj.input,
            result: this.fromCelsius(obj.to,this.toCelsius(obj.from, obj.input)),
            from: obj.from,
            to: obj.to
        })
    }
    render(){
        return(
            <div>
                <Menu handleOpen={(item) => this.handleOpen(item)}/>
                <Panel bsStyle="primary" style={{margin: 20}}>
                    <Panel.Heading>
                        <p className='text-center'>Добро пожаловать!</p>
                    </Panel.Heading>
                    <Panel.Body>
                        {this.state.conv &&
                            <div>
                                <TempInput handleClick={(obj) => this.handleConvert(obj)}/>
                                <Output show={this.state.show} data={this.state}/>
                            </div>
                        }
                        {this.state.calc &&
                            <div>
                                <Calc />
                            </div>
                        }
                    </Panel.Body>
                </Panel>
            </div>
        );
    }
}

class TempInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: null,
            from: 'Градусы Цельсия',
            to: 'Градусы Цельсия'
        }
    }

    clear(){
        this.setState({
            input: '',
            from: 'Градусы Цельсия',
            to: 'Градусы Цельсия'
        });
        this.props.handleClick(this.state)
    }

    render(){
        return (
            <div className='row' style={{marginLeft:20}}>
                <input className="form-control col-md-2"
                       value={this.state.input}
                       maxLength={6}
                       onChange={(event) => this.setState({input: event.target.value})}
                       style={{width:200,marginRight: 20}}
                       placeholder='Your temperature...'/>
                <select className="form-control col-md-1"
                        onChange={(event) => this.setState({from: event.target.value})}
                        value={this.state.from}
                        style={{marginRight: 20, width: 200}} >
                    <option value="Градусы Цельсия">Градусы Цельсия</option>
                    <option value="Градусы Кельвина">Градусы Кельвина</option>
                    <option value="Градусы Фаренгейта">Градусы Фаренгейта</option>
                </select>
                <select className="form-control col-md-1"
                        onChange={(event) => this.setState({to: event.target.value})}
                        value={this.state.to}
                        style={{marginRight: 20, width: 200}} >
                    <option value="Градусы Цельсия">Градусы Цельсия</option>
                    <option value="Градусы Кельвина">Градусы Кельвина</option>
                    <option value="Градусы Фаренгейта">Градусы Фаренгейта</option>
                </select>
                <button className='btn btn-primary col-md-1'
                        style={{marginRight: 20}}
                        onClick={() => this.props.handleClick(this.state)}>
                    Перевести
                </button>
                <button className='btn btn-primary col-md-1'
                        onClick={() => this.clear()}>
                    Очистить
                </button>
            </div>
        );
    }
}

class Output extends React.Component{
    render() {
        if(this.props.data.input === null){
            return null;
        } else {
            return (
                <div>
                    <h2>Перевод {this.props.data.input} из {this.props.data.from} в {this.props.data.to}...</h2>
                    <h2>Результат: {this.props.data.result}</h2>
                </div>
            );
        }
    }
}


class Calc extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            input: null,
            from: 'Градусы Цельсия',
            to: 'Градусы Цельсия'
        }
    }
    render(){
        return(
        <div>
            <div>
            <input className="form-control col-md-2"
                   value={this.state.first}
                   maxLength={6}
                   onChange={(event) => this.setState({first: event.target.value})}
                   style={{width:200,marginRight: 20}}
                   placeholder='Your temperature...'/>
                   <div>
                       <div>
                       <button onClick={() => this.setState({
                           full: parseInt(this.state.first) + parseInt(this.state.second)
                       })}>Сложить</button>
                       </div>
                       <div>
                       <button style={{marginTop: 10}} onClick={() => this.setState({
                           full: parseInt(this.state.first) - parseInt(this.state.second)
                       })}>Отнять</button>
                       </div>
                       <div>
                       <button style={{marginTop: 10, marginLeft:220}} onClick={() => this.setState({
                           full: parseInt(this.state.first) * parseInt(this.state.second)
                       })}>Умножить</button>
                       </div>
                       <div>
                       <button style={{marginTop: 10, marginLeft:220}} onClick={() => this.setState({
                           full: parseInt(this.state.first) / parseInt(this.state.second)
                       })}>Разделить</button>
                       </div>
                   </div>
            </div>
            <div>
            <input className="form-control"
                   value={this.state.second}
                   maxLength={6}
                   onChange={(event) => this.setState({second: event.target.value})}
                   style={{width:200,marginRight: 20}}
                   placeholder='Your temperature...'/>
            </div>
            <div>
                {this.state.full &&
                    <p>Сумма двух температур равна {this.state.full}</p>
                }
            </div>
        </div>
        );
    }
}

class Menu extends React.Component {
    render(){
        return(
            <Navbar bsStyle='default'>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Мое приложение</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#" onClick={() => this.props.handleOpen('calculator')}>
                        Открыть калькулятор
                    </NavItem>
                    <NavItem eventKey={2} href="#" onClick={() => this.props.handleOpen('converter')}>
                        Открыть конвертер
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default App;
