import React, { Component } from 'react';
import CircularLoader from '../components/CircularLoader';
import Button from '../components/Button';
import Table from '../components/Table';
import Popup from '../components/Popup';
import TabPanel from '../components/TabPanel';
import { db, timestamp } from '../config/fire';
import { convertTimeStampToDateString } from '../common_functions/conversion';

class Maintenance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingMaintenanceList: [],
            completedMaintenanceList: [],
            loaded: false,
            selection:0,
            deletePopup: {
                show: false,
                headline: "",
                content: <div></div>,
                actions: [
                  {
                    text: "Cancel",
                    buttonType: "red",
                    onClick: this.hideDeletePopup
                  }
                ],
                cancelAction: {
                  show: true,
                  onClick: this.hideDeletePopup
                },
                color: "pink"
              }
        }
    }

    componentDidMount = () => {
        this.fetchPendingData();
        this.fetchCompleteData();
    }

    fetchPendingData = () => {
        this.pendingListener= db.collection("maintenance").where("status","==","pending")
            .onSnapshot((querySnapshot) => {
                let pendingMaintenanceList = []
                querySnapshot.forEach((doc) => {
                    var dataToBePushed = doc.data()
                    dataToBePushed.id = doc.id
                    dataToBePushed.createdOn = convertTimeStampToDateString(dataToBePushed.createdOn)
                    pendingMaintenanceList.push(dataToBePushed)
                    this.setState({
                        pendingMaintenanceList:pendingMaintenanceList,
                        loaded: true
                    })
                })
            })

    }
    fetchCompleteData=() =>{
        this.completedListener = db.collection("maintenance").where("status", "==", "complete")
            .onSnapshot((querySnapshot) => {
                let completedMaintenanceList = [];
                querySnapshot.forEach((doc) => {
                    var dataToBePushed = doc.data();
                    dataToBePushed.id = doc.id;
                    dataToBePushed.createdOn = convertTimeStampToDateString(dataToBePushed.createdOn);
                    completedMaintenanceList.push(dataToBePushed);
                    this.setState({
                        completedMaintenanceList: completedMaintenanceList,
                        loaded: true
                    });
                });
            });
    }

    componentWillUnmount() {
        this.pendingListener && this.pendingListener()
        this.completedListener && this.completedListener()
    }

    /**
     * To show delete popup
     * @param {string} id - id of request
     */
    showDeletePopup = (type,id) => {
        let maintenance;
        if(type==="pending"){
            maintenance = this.state.pendingMaintenanceList.find(maintenance => maintenance.id === id)
        }else if(type==="complete"){
            maintenance = this.state.completedMaintenanceList.find(maintenance => maintenance.id === id)
        }

        let popupContent = <div>
            <p>Deleting the issue stated by <strong>"{maintenance.name}"</strong> will remove all data associated with it from database.</p>
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
     * @param {string} id - id of maintenance to be deleted
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
            db.collection("maintenance").doc(id).delete()
                .then(() => {
                    this.setState({
                        deletePopup: {
                            show: true,
                            headline: "Deleted",
                            content: <p>The maintenance was successfully deleted from the list.</p>,
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
                            content: <p>The maintenance detail could not be deleted.</p>,
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

    showDonePopup = (id) => {

            let popupContent = <div>
                <p>You can't change it back to pending once it is in completed list.</p>
            </div>
            this.setState({
                deletePopup: {
                    show: true,
                    headline: "Are you sure you want to mark it complete?",
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
                            onClick: () => this.doneProcess(id)
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
     * Function to update data to complete
     * @param {string} id - id of maintenance
     */
    doneProcess = (id) => {

        this.setState({
            deletePopup: {
                show: true,
                headline: "Done...",
                content: <CircularLoader text={"Done..."} color="red" />,
                actions: [],
                cancelAction: {
                    show: false,
                    onClick: this.hideDeletePopup
                },
                color: "red"
            }
        }, () => {
            db.collection("maintenance").doc(id).update({
                status:"complete",
                completedOn:timestamp.now()
            })
                .then(() => {
                    this.setState({
                        deletePopup: {
                            show: true,
                            headline: "Completed",
                            content: <p>The maintenance was successfully changed to completed.</p>,
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
                            content: <p>The maintenance detail could not be deleted.</p>,
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

    changeSelection = (index) => {
        this.setState({
          selection: index
        })
    }

    render() {
        const { pendingMaintenanceList,completedMaintenanceList, loaded, deletePopup,selection } = this.state

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
                name: "Issue",
                selector: "issue"
            },
            {
                name: "Created On",
                selector: "createdOn"
            }
        ]
        const pendingActions = [
            {
                icon: "fas fa-check",
                trigger: (id) => this.showDonePopup(id),
                text: "Done",
                buttonClass: "action-link action-pink"
            },
            {
                icon: "far fa-edit",
                link: "/dashboard/maintenance/edit/",
                text: "Edit",
                buttonClass: "action-link action-green"
            },
            {
                icon: "far fa-trash-alt",
                trigger: (id) => this.showDeletePopup("pending",id),
                text: "Delete",
                buttonClass: "action-link action-red"
            }
        ]

        const completedActions=[
            {
                icon: "far fa-trash-alt",
                trigger: (id) => this.showDeletePopup("complete",id),
                text: "Delete",
                buttonClass: "action-link action-red"
            }
        ]

        const tabs=[
            "Pending Request",
            "Completed Request"
        ]

        return (
            <div className="dashboard-main-page" >
                <div className="header">
                <div className="dashboard-heading-row">
                    <div className="dashboard-heading">
                        <h2>Maintenance</h2>
                    </div>
                    <div>
                        <Button text="Add" link="/dashboard/maintenance/create" icon="fas fa-plus"/>
                    </div>
                </div>
                </div>
                <div className="content-space">
                    <section className="dashboard-section">
                        <TabPanel
                            tabs={tabs}
                            handler={this.changeSelection}
                            selection={selection}
                        />
                        {loaded ?<>
                            
                            {selection===0?
                                <Table
                                columns={columns}
                                data={pendingMaintenanceList}
                                actions={pendingActions}
                            />:
                                <Table
                                columns={columns}
                                data={completedMaintenanceList}
                                actions={completedActions}
                            />}
                            </>
                            :
                            <CircularLoader fullPage />}
                    </section>
                </div>
                {deletePopup.show ? <Popup headline={deletePopup.headline} content={deletePopup.content} actions={deletePopup.actions} cancelAction={deletePopup.cancelAction} color={deletePopup.color} /> : null}
            </div>
        );
    }
}

export default Maintenance;