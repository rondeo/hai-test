import _ from 'lodash';
import React, { Component } from 'react';
import { withRouter } from 'next/router'
import MainLayout from '../components/mainLayout';
import authenticateService from '../services/authenticate.services';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    componentDidMount = async () => {
        const verifySession = await authenticateService.checkSession();
        console.log(verifySession)
        if (verifySession.success === false) {
            location.href = '/login';
            return;
        }
        this.setState({ user: verifySession.data });

    }
    render() {
        return (
            <MainLayout>
                
            </MainLayout>
        );
    }
}

export default withRouter(Dashboard);
