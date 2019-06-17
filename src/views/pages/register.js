import _ from 'lodash';
import React, { Component } from 'react';
import Layout from '../components/layout';
import { withRouter } from 'next/router'
import Loading from '../components/loading';
import authenticateService from '../services/authenticate.services';


class Register extends Component {
    constructor(props) {
        super(props);
        this.changeUsernameHandle = this.changeUsernameHandle.bind(this);
        this.changePasswordHandle = this.changePasswordHandle.bind(this);
        this.changeFullNameHandle = this.changeFullNameHandle.bind(this);
        this.changeMobileHandle = this.changeMobileHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
            fullName: "",
            mobile: "",
            submitting: false,
            message: ""
        }
    }
    componentDidMount = async () => {
        const verifySession = await authenticateService.checkSession();
        if (verifySession.success === true) {
            location.href = decodeURIComponent(this.props.router.query.url) + `?session=${verifySession.data.session}`;
        }
    }
    changeFullNameHandle(e) {
        this.setState({ fullName: e.target.value });
    }
    changeMobileHandle(e) {
        this.setState({ mobile: e.target.value });
    }
    changeUsernameHandle(e) {
        this.setState({ username: e.target.value });
    }
    changePasswordHandle(e) {
        this.setState({ password: e.target.value });
    }
    validate = () => {
        if (this.state.mobile.length === 0) {
            this.setState({ error: "mobile is required" });
            return false;
        }
        if (this.state.username.length === 0) {
            this.setState({ error: "username is required" });
            return false;
        }
        if (this.state.password.length === 0) {
            this.setState({ error: "password is required" });
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
        const loginResult = await authenticateService.register(this.state.username, this.state.password, this.state.fullName, this.state.mobile);
        if (loginResult.success === true) {
            alert("You have successfully registered.");
            window.location="/login";
        }
        else {
            this.setState({ error: loginResult.message });
        }
        this.setState({ submitting: false });
    }
    render() {
        const { handleSubmit, submitting, loginMsg, t } = this.props;
        return (
            <Layout>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col s12 text-center">
                            <h5 className="ml-4">Register</h5>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field col s12">
                            <i className="material-icons prefix pl-1">person_outline</i>
                            <input name="username" onChange={this.changeFullNameHandle} type="text" />
                            <label className="active browser-default">Full Name</label>
                            <span className="helper-text red-text"></span>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field col s12">
                            <i className="material-icons prefix pl-1">person_outline</i>
                            <input name="username" onChange={this.changeMobileHandle} type="number" />
                            <label className="active browser-default">Mobile</label>
                            <span className="helper-text red-text"></span>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field col s12">
                            <i className="material-icons prefix pl-1">person_outline</i>
                            <input name="username" onChange={this.changeUsernameHandle} type="text" />
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
                                SIGN UP
                            </button>
                        </div>
                    </div>

                    <div className="under-text" style={{ marginRight: '-15px', marginLeft: '-15px' }}>
                        <span>
                            Already have an account?
                        </span>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <a className="btn waves-effect waves-light col s12" href="/login">SIGN IN</a>
                        </div>
                    </div>
                </form>
            </Layout>
        );
    }
}

export default withRouter(Register);
