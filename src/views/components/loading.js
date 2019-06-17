import React, { Component } from 'react';

class Loading extends Component {
    render() {
        return (
            <div className={this.props.loading === true ? 'sweet-loading' : 'none-display'}>
                <div className="preloader-wrapper small active" style={this.props.size !== null && this.props.size !== undefined ? { width: this.props.size + "px", height: this.props.size + "px" } : {}} >
                    <div className="spinner-layer">
                        <div className="circle-clipper left">
                            <div className="circle"></div>
                        </div>
                        <div className="gap-patch">
                            <div className="circle"></div>
                        </div>
                        <div className="circle-clipper right">
                            <div className="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Loading