import React, { Component } from 'react';
import Button from '../components/Button';
import { db, timestamp } from '../config/fire';
import { Link, Redirect } from 'react-router-dom';

class CreateLateComer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"",
            room:"",
            outTime:"",
            writeDone: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addData = () => {
        const { name, room, outTime} = this.state

        db.collection("lateComer").add({
            name:name,
            room:room,
            outTime:outTime,
            status:"pending",
            date:timestamp.now()
        }).then(
            this.setState({
                writeDone: true
            })
        ).catch((error) => {
            console.error('Error writing document: ', error);
            this.setState({
                writeDone: false
            });
        });
    }
    render() {
        const { name, room, outTime,writeDone } = this.state

        if (writeDone === true) {
            return <Redirect to="/dashboard/late-comer" />;
        }

        return (
            <div className="dashboard-main-page" >
                <div className="header">
                    <div className="subnav-container">
                        <ul className="subnav">
                            <li><Link to='/dashboard/late-comer'>Late Comers</Link></li>
                            <li>Create</li>
                        </ul>
                    </div>
                    <div className="dashboard-heading-row">
                        <div className="dashboard-heading">
                            <h1>Create</h1>
                        </div>
                        <div>
                            <Button text="Save" onClick={this.addData} />
                        </div>
                    </div>
                </div>
                <div className="content-space">
                    <section className="dashboard-section">
                        <section className="dashboard-card-section">
                            <div className="card-container">
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Name*</span>
                                            <input type="text" className="ui-form-textField" name="name" value={name} onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Room*</span>
                                            <input type="text" className="ui-form-textField" value={room} name="room" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Out Time (00:00)*</span>
                                            <input type="text" className="ui-form-textField" value={outTime} name="outTime" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>



            </div>
        );
    }
}

export default CreateLateComer;