import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'next/router'
import MainLayout from '../components/mainLayout';
import authenticateService from '../services/authenticate.services';
import Loading from '../components/loading';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            users: [],
            selected: {
                index: -1,
                data: null
            },
            username: "",
            fullName: "",
            password: "",
            mobile: "",
            error: "",
            submitting: false
        }
        this.selectItem = this.selectItem.bind();
        this.changePasswordHandle = this.changePasswordHandle.bind(this);
        this.changeFullNameHandle = this.changeFullNameHandle.bind(this);
        this.changeMobileHandle = this.changeMobileHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    selectItem = (item, index) => {
        console.timeLog(item, index);
        this.setState({
            selected: {
                index: index,
                data: item
            },
            username: item.username,
            fullName: item.name,
            mobile: item.mobile
        })
    }
    componentDidMount = async () => {
        const verifySession = await authenticateService.checkSession();
        console.log(verifySession)
        if (verifySession.success === false) {
            location.href = '/login';
            return;
        }
        if (verifySession.data.type === 0) {
            location.href = '/dashboard';
            return;
        }
        this.setState({ user: verifySession.data });

        const users = await authenticateService.getAll();
        console.log(users);
        this.setState({ users: users.data });

    }

    changeFullNameHandle(e) {
        this.setState({ fullName: e.target.value });
    }
    changeMobileHandle(e) {
        this.setState({ mobile: e.target.value });
    }
    changePasswordHandle(e) {
        this.setState({ password: e.target.value });
    }
    validate = () => {
        if (this.state.mobile.length === 0) {
            this.setState({ error: "mobile is required" });
            return false;
        }
        if (this.state.fullName.length === 0) {
            this.setState({ error: "name is required" });
            return false;
        }
        return true;
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitting: true });
        if (this.validate() === false) {
            this.setState({ submitting: false });
            return;
        }
        const loginResult = await authenticateService.update(this.state.password, this.state.fullName, this.state.mobile, this.state.selected.data.id);
        if (loginResult.success === true) {
            alert("Update success");
            const users = await authenticateService.getAll();
            this.setState({ users: users.data });
        }
        else {
            this.setState({ error: loginResult.message });
        }
        this.setState({ submitting: false });
    }
    render() {
        return (
            <MainLayout>
                <ul className="navigation">
                    <li><a href="/dashboard">Dashboard</a></li> :
                </ul>
                <div style={{ display: "-webkit-box" }}>
                    <div style={{ width: "40%", marginRight: "20px" }}>
                        {this.state.users.map((item, index) => {
                            return <div key={item.id} onClick={() => this.selectItem(item, index)} className="card">
                                <div className={index === this.state.selected.index ? "active card-body" : "card-body"} > {item.name}</div>
                            </div>
                        })}
                    </div>
                    <div style={{ width: "50%" }}>
                        {this.state.selected !== null ?
                            <form className="login-form col-6" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col s12 text-center">
                                        <h5 className="ml-4">Update Profile</h5>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix pl-1">person_outline</i>
                                        <input name="username" onChange={this.changeFullNameHandle} type="text" value={this.state.fullName} />
                                        <label className="active browser-default">Full Name</label>
                                        <span className="helper-text red-text"></span>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix pl-1">person_outline</i>
                                        <input name="username" onChange={this.changeMobileHandle} type="number" value={this.state.mobile} />
                                        <label className="active browser-default">Mobile</label>
                                        <span className="helper-text red-text"></span>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix pl-1">person_outline</i>
                                        <input name="username" readOnly type="text" value={this.state.username} />
                                        <label className="active browser-default">Username</label>
                                        <span className="helper-text red-text"></span>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix pl-1">lock_outline</i>
                                        <input name="password" onChange={this.changePasswordHandle} type="password" />
                                        <label className="active browser-default">Password</label>
                                        <span className="helper-text red-text"></span>
                                    </div>
                                </div>
                                <div className="row margin">
                                    <div className=" col s6 m6 l6">
                                    </div>
                                    <div className=" col s6 m6 l6">
                                        <p className="right-align">

                                        </p>
                                    </div>

                                </div>

                                <div className="row margin">
                                    <div className="col s12 center-align">
                                        <span className="helper-text red-text">{this.state.error}</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <button disabled={this.state.submitting} className="btn waves-effect waves-light col s12 btn-large light-blue darken-4" type="submit">
                                            <Loading loading={this.state.submitting} size={30}></Loading>
                                            UPDATE
                            </button>
                                    </div>
                                </div>
                            </form> : <p>Please select an user</p>}
                    </div>
                </div>
            </MainLayout>
        );
    }
}

export default withRouter(Dashboard);
