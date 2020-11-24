import React, { Component } from 'react';
import CircularLoader from '../components/CircularLoader';
import Button from '../components/Button';
import Table from '../components/Table';
import { db } from '../config/fire';
import { convertTimeStampToDateString } from '../common_functions/conversion';

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loaded: false
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = () => {
        db.collection("students").get()
            .then((querySnapshot) => {
                let students = []
                querySnapshot.forEach((doc) => {
                    var dataToBePushed = doc.data()
                    dataToBePushed.id = doc.id
                    dataToBePushed.createdOn = convertTimeStampToDateString(dataToBePushed.createdOn)
                    students.push(dataToBePushed)
                    this.setState({
                        students: students,
                        loaded: true
                    })
                })
            })
    }

    render() {
        const { students, loaded } = this.state

        const columns = [
            {
                name: "Name",
                selector: "name"
            },
            {
                name: "Room no.",
                selector: "room"
            },
            {
                name: "Occupancy",
                selector: "occupancy"
            },
            {
                name: "College Year",
                selector: "collegeYear"
            },
            {
                name: "Added On",
                selector: "createdOn"
            }
        ]
        const actions = [
            {
                icon: "far fa-edit",
                link: "/dashboard/students/edit/",
                text: "Edit",
                buttonClass: "action-link action-green"
            }
        ]
        return (
            <div className="dashboard-main-page" >
                <div className="header">
                <div className="dashboard-heading-row">
                    <div className="dashboard-heading">
                        <h1>Students</h1>
                    </div>
                    <div>
                        <Button text="Add" link="/dashboard/students/create" />
                    </div>
                </div>
                </div>
                <div className="content-space">
                    {loaded ?
                        <section className="dashboard-section">
                            <Table
                                columns={columns}
                                data={students}
                                actions={actions}
                            />
                        </section>

                        :
                        <CircularLoader fullPage />}
                </div>



            </div>
        );
    }
}

export default Students;