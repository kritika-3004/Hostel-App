import React, { Component } from 'react';
import Button from '../components/Button';
import { db, timestamp } from '../config/fire';
import { Link, Redirect } from 'react-router-dom';

class CreateStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            room: "",
            occupancy: "Single",
            year: "First Year",
            age: 0,
            mobile: 0,
            parentMobile: 0,
            address: "",
            writeDone: false
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addData = () => {
        const { name, room, occupancy, year, age, mobile, parentMobile, address } = this.state

        db.collection("students").add({
            name: name,
            room: room,
            occupancy: occupancy,
            collegeYear: year,
            age: age,
            mobile: mobile,
            parentMobile: parentMobile,
            address: address,
            createdOn: timestamp.now()
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
        const { name, room, occupancy, year, age, mobile, parentMobile, address, writeDone } = this.state

        if (writeDone === true) {
            return <Redirect to="/dashboard/students" />;
        }

        return (
            <div className="dashboard-main-page" >
                <div className="subnav-container">
                    <ul className="subnav">
                        <li><Link to='/dashboard/students'>Students</Link></li>
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

                <div className="content-space">
                    <section className="dashboard-section">
                        <section className="dashboard-card-section">
                            <h3 className="ui-subheading-light">1. Hostel Information</h3>
                            <div className="card-container">
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Name*</span>
                                            <input type="text" className="ui-form-textField" value={name} name="name" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">College Year*</span>
                                            <select className="ui-form-textField" value={year} name="year" onChange={this.handleChange}>
                                                <option value="First Year">First Year</option>
                                                <option value="Second Year">Second Year</option>
                                                <option value="Third Year">Third Year</option>
                                                <option value="Fourth Year">Fourth Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Room no.*</span>
                                            <input className="ui-form-textField" value={room} name="room" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Occupancy*</span>
                                            <select className="ui-form-textField" value={occupancy} name="occupancy" onChange={this.handleChange}>
                                                <option value="Single">Single</option>
                                                <option value="Double">Double</option>
                                                <option value="Triple">Triple</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                        <section className="dashboard-card-section">
                            <h3 className="ui-subheading-light">2. Personal Information</h3>
                            <div className="card-container">
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Age</span>
                                            <input type="number" className="ui-form-textField" value={age} name="age" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Mobile no.*</span>
                                            <input type="number" className="ui-form-textField" value={mobile} name="mobile" onChange={this.handleChange} />
                                        </div>
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Parent Mobile no.*</span>
                                            <input type="number" className="ui-form-textField" value={parentMobile} name="parentMobile" onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="ui-card-1-2">
                                    <div className="ui-card ui-card-dashboard card-extra-padding">
                                        <div className="ui-card-dashboard-sub">
                                            <span className="ui-form-label">Permanent Address</span>
                                            <textarea className="ui-form-textArea" value={address} name="address" onChange={this.handleChange} />
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

export default CreateStudents;