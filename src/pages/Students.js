import React, { Component } from 'react';
import CircularLoader from '../components/CircularLoader';
import Button from '../components/Button';
import Table from '../components/Table';
import Popup from '../components/Popup';
import { db } from '../config/fire';
import { convertTimeStampToDateString } from '../common_functions/conversion';

class Students extends Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            loaded: false,
            deletePopup: {
                show: false,
                headline: "",
                content: <div></div>,
                actions: [
                  {
                    text: "Cancel",
                    buttonType: "red",
                    onClick: this.hideProcessPopup
                  }
                ],
                cancelAction: {
                  show: true,
                  onClick: this.hideProcessPopup
                },
                color: "pink"
              }
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = () => {
        this.listener= db.collection("students")
            .onSnapshot((querySnapshot) => {
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

/**
     * To show delete popup
     * @param {string} id - id of student
     */
    showDeletePopup = (id) => {
        const student = this.state.students.find(student => student.id === id)

            let popupContent = <div>
                <p>Deleting the student <strong>"{student.name}"</strong> will remove all data associated with it from database.</p>
            </div>
            this.setState({
                deletePopup: {
                    show: true,
                    headline: "Are you sure you want to delete?",
                    content: popupContent,
                    actions: [
                        {
                            text: "Cancel",
                            buttonType: "grey",
                            onClick: this.hideDeletePopup
                        },
                        {
                            text: "Yes, I'm sure.",
                            buttonType: "warning",
                            onClick: () => this.deleteProcess(id)
                        }
                    ],
                    cancelAction: {
                        show: true,
                        onClick: this.hideDeletePopup
                    },
                    color: "red"
                }
            })
    }

    /**
     * To hide delete popup
     */
    hideDeletePopup = () => {
        this.setState({
            deletePopup: {
                show: false,
                headline: "",
                content: <div></div>,
                actions: [
                    {
                        text: "Cancel",
                        buttonType: "grey",
                        onClick: this.hideDeletePopup
                    },
                    {
                        text: "Yes, I'm sure.",
                        buttonType: "warning",
                        onClick: this.deleteProcess
                    }
                ],
                cancelAction: {
                    show: true,
                    onClick: this.hideDeletePopup
                },
                color: "red"
            }
        })
    }

    /**
     * Function to delete data from database
     * @param {string} id - id of student to be deleted
     */
    deleteProcess = (id) => {

        this.setState({
            deletePopup: {
                show: true,
                headline: "Deleting...",
                content: <CircularLoader text={"Deleting..."} color="red" />,
                actions: [],
                cancelAction: {
                    show: false,
                    onClick: this.hideDeletePopup
                },
                color: "red"
            }
        }, () => {
            db.collection("students").doc(id).delete()
                .then(() => {
                    this.setState({
                        deletePopup: {
                            show: true,
                            headline: "Deleted",
                            content: <p>The student was successfully deleted from the list.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hideDeletePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hideDeletePopup
                            },
                            color: "red"
                        }
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.setState({
                        deletePopup: {
                            show: true,
                            headline: "Uh oh!",
                            content: <p>The student detail could not be deleted.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hideDeletePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hideDeletePopup
                            },
                            color: "red"
                        }
                    })
                })
        })
    }

    render() {
        const { students, loaded, deletePopup } = this.state

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
            },
            {
                icon: "far fa-trash-alt",
                trigger: (id) => this.showDeletePopup(id),
                text: "Delete",
                buttonClass: "action-link action-red"
            }
        ]
        return (
            <div className="dashboard-main-page" >
                <div className="header">
                <div className="dashboard-heading-row">
                    <div className="dashboard-heading">
                        <h2>Students</h2>
                    </div>
                    <div>
                        <Button text="Add" link="/dashboard/students/create" icon="fas fa-plus"/>
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
                {deletePopup.show ? <Popup headline={deletePopup.headline} content={deletePopup.content} actions={deletePopup.actions} cancelAction={deletePopup.cancelAction} color={deletePopup.color} /> : null}
            </div>
        );
    }
}

export default Students;