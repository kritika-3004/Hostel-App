import React, { Component } from 'react';
import Button from '../components/Button';
import { db, timestamp } from '../config/fire';
import { Link, Redirect } from 'react-router-dom';

class CreateMaintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: '',
            issue:"Electricity",
            description:'',
            writeDone: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addData = () => {
        const { name, room, issue,description} = this.state

        db.collection("maintenance").add({
            name: name,
            room: room,
            issue:issue,
            description:description,
            createdOn: timestamp.now(),
            status:"pending"
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
        const { name, room, issue,description,writeDone } = this.state

        if (writeDone === true) {
            return <Redirect to="/dashboard/maintenance" />;
        }

        return (
            <div className="dashboard-main-page" >
                <div className="header">
                    <div className="subnav-container">
                        <ul className="subnav">
                            <li><Link to='/dashboard/maintenance'>Maintenance</Link></li>
                            <li>Create</li>
                        </ul>
                    </div>
                    <div className="dashboard-heading-row">
                        <div className="dashboard-heading">
                            <h2>Create</h2>
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
                                            <input type="text" className="ui-form-textField" value={name} name="name" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Room no.*</span>
                                            <input className="ui-form-textField" value={room} name="room" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Issue*</span>
                                            <select className="ui-form-textField" value={issue} name="issue" onChange={this.handleChange}>
                                                <option value="Electricity">Electricity</option>
                                                <option value="Plumber">Plumber</option>
                                                <option value="Furniture">Furniture</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Description*</span>
                                            <textarea className="ui-form-textArea" value={description} name="description" onChange={this.handleChange} />
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

export default CreateMaintenance;