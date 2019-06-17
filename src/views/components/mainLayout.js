import React from 'react';
import Head from 'next/head';
export default class MainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
        this.run = this.run.bind(this);
    }
    run() {
        this.setState({ name: 11111 });
    }
    render() {
        return (
            <React.Fragment>
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />

                    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                    <link href="/static/assets/vendors/vendors.min.css" rel="stylesheet" />
                    <link href="/static/assets/css/themes/vertical-dark-menu-template/materialize.css" rel="stylesheet" />

                    <link rel="stylesheet" type="text/css" href="/static/assets/vendors/data-tables/css/jquery.dataTables.min.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/vendors/data-tables/extensions/responsive/css/responsive.dataTables.min.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/vendors/data-tables/css/select.dataTables.min.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/vendors/materialize-stepper/materialize-stepper.min.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/themes/vertical-dark-menu-template/materialize.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/themes/vertical-dark-menu-template/style.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/custom/pages.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/custom/custom.css" />
                    <link rel="stylesheet" type="text/css" href="/static/assets/css/responsive/responsive.css" />
                    {/* <script src='./intercom.js'></script> */}
               
                </Head>
                <div className="row">
                    <div className="col s12">
                        <div className="container">
                            {this.props.children}
                        </div>
                    </div>
                </div>

            </React.Fragment>
        )
    }
}
