import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="dashboard-main-page" >
                <div className="homepage">
                    <div className="lottie">
                        <lottie-player src="https://assets1.lottiefiles.com/private_files/lf30_TBKozE.json"  background="transparent"  speed="1" loop autoplay></lottie-player>
                    </div>
                    <div className="homepage-text">
                        <h1>Welcome to Hostel Dashboard!!</h1>
                        <p>Here's the dashboard for hostel management system made using react js and cloud firestore database (no sql).</p>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Home;