import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'next/router'
import MainLayout from '../components/mainLayout';
import authenticateService from '../services/authenticate.services';
import openSocket from 'socket.io-client';
const socket = openSocket.connect("http://localhost:1002");

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            users: []
        }
    }
    getUsers = async () => {
        const users = await authenticateService.getAll();
        this.setState({ users: users.data });

        socket.on("users", function (data) {
            console.log("runnning", data);
            this.setState({users: data})
        });
    }
    componentDidMount = async () => {
        const verifySession = await authenticateService.checkSession();
        console.log(verifySession)
        if (verifySession.success === false) {
            location.href = '/login';
            return;
        }
        this.setState({ user: verifySession.data });
        console.log("socket =>>>>>>>>>>>>>>>>>>", socket.id);
        await authenticateService.addSocket(socket.id);
        this.getUsers();
        // window.Intercom("boot", {
        //     app_id: "kyqm6cho",
        //     name: "hai nguyen", // Full name
        //     email: "nnhaigl@gmail.com", // Email address
        //     created_at: "1560784527664" // Signup date as a Unix timestamp
        //   });

    }
    render() {
        return (
            <MainLayout>
                <ul className="navigation">
                    {this.state.user !== null && this.state.user.type === 1 ?
                        <li><a href="/user-management">User Management</a></li> :
                        <li><a href="/profile">Update Profile</a></li>
                    }
                </ul>
                <div className="">
                    {this.state.users.map(item => {
                        return <div key={item.id} class="card">
                            <div class="card-body">{item.name}</div>
                            <div class="card-body">{item.isOnline === 1 ? "Online" : "Offline"}</div>
                        </div>
                    })}
                </div>
            </MainLayout>
        );
    }
}

export default withRouter(Dashboard);
