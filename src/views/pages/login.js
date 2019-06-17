import _ from 'lodash';
import React, { Component } from 'react';
import Layout from '../components/layout';
import { withRouter } from 'next/router'
import Loading from '../components/loading';
import authenticateService from '../services/authenticate.services';


class Login extends Component {
    constructor(props) {
        super(props);
        this.changeUsernameHandle = this.changeUsernameHandle.bind(this);
        this.changePasswordHandle = this.changePasswordHandle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            username: "",
            password: "",
            submitting: false,
            error: ""
        }
    }
    componentDidMount = async () => {
        const verifySession = await authenticateService.checkSession();
        console.log(verifySession);
        if (verifySession.success === true) {
            location.href = decodeURIComponent(this.props.router.query.url) + `?session=${verifySession.data.session}`;
        }
    }
    changeUsernameHandle(e) {
        this.setState({ username: e.target.value });
    }
    changePasswordHandle(e) {
        this.setState({ password: e.target.value });
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState({ submitting: true });
        const loginResult = await authenticateService.login(this.state.username, this.state.password);
        if (loginResult.success === true) {
            location.href = '/dashboard';
        }
        else {
            this.setState({ error: "username or password is not valid" })
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
                            <h5 className="ml-4">Sign in</h5>
                        </div>
                    </div>
                    <div className="row margin">
                        <div className="input-field col s12">
                            <i className="material-icons prefix pl-1">person_outline</i>
                            <input name="username" onChange={this.changeUsernameHandle} type="text" />
                            <label className="active browser-default">Email</label>
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
                                LOGIN
                            </button>
                        </div>
                    </div>

                    <div className="under-text" style={{ marginRight: '-15px', marginLeft: '-15px' }}>
                        <span>
                            Don't have an account?
                        </span>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <a className="btn waves-effect waves-light col s12" href="/register">SIGNUP NOW</a>
                        </div>
                    </div>
                </form>
            </Layout>
        );
    }
}

export default withRouter(Login);
