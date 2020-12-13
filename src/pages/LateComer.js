import React, { Component } from 'react';
import CircularLoader from '../components/CircularLoader';
import Button from '../components/Button';
import Table from '../components/Table';
import Popup from '../components/Popup';
import TabPanel from '../components/TabPanel';
import { db, timestamp } from '../config/fire';
import { convertTimeStampToDateString, convertTimeStampToTimeString} from '../common_functions/conversion';

class LateComer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingList: [],
            reachedList: [],
            loaded: false,
            selection:0,
            popup: {
                show: false,
                headline: "",
                content: <div></div>,
                actions: [
                  {
                    text: "Cancel",
                    buttonType: "red",
                    onClick: this.hidePopup
                  }
                ],
                cancelAction: {
                  show: true,
                  onClick: this.hidePopup
                },
                color: "pink"
              }
        }
    }

    changeSelection = (index) => {
        this.setState({
          selection: index
        })
    }

    handleChange = (e) => {
        console.log("input",e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    componentDidMount = () => {
        this.fetchPendingData();
        this.fetchCompleteData();
    }

    fetchPendingData = () => {
        this.pendingListener= db.collection("lateComer").where("status","==","pending")
            .onSnapshot((querySnapshot) => {
                let pendingList = []
                querySnapshot.forEach((doc) => {
                    var dataToBePushed = doc.data()
                    dataToBePushed.id = doc.id
                    dataToBePushed.date = convertTimeStampToDateString(dataToBePushed.date)
                    pendingList.push(dataToBePushed)
                    this.setState({
                        pendingList:pendingList,
                        loaded: true
                    })
                })
            })

    }
    fetchCompleteData=() =>{
        this.completedListener = db.collection("lateComer").where("status", "==", "reached")
            .onSnapshot((querySnapshot) => {
                let reachedList = [];
                querySnapshot.forEach((doc) => {
                    var dataToBePushed = doc.data();
                    dataToBePushed.id = doc.id;
                    dataToBePushed.date = convertTimeStampToDateString(dataToBePushed.date)
                    dataToBePushed.inTime = convertTimeStampToTimeString(dataToBePushed.inTime)
                    reachedList.push(dataToBePushed);
                    this.setState({
                        reachedList: reachedList,
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
     * @param {string} id - id of student
     */
    showDeletePopup = (type,id) => {
        let lateComer;
        if(type==="pending"){
            lateComer = this.state.pendingList.find(student => student.id === id)
        }else if(type==="reached"){
            lateComer = this.state.reachedList.find(student => student.id === id)
        }

        let popupContent = <div>
            <p>Deleting the record of <strong>"{lateComer.name}"</strong> will remove all data associated with it from database.</p>
        </div>
        this.setState({
                popup: {
                    show: true,
                    headline: "Are you sure you want to delete?",
                    content: popupContent,
                    actions: [
                        {
                            text: "Cancel",
                            buttonType: "grey",
                            onClick: this.hidePopup
                        },
                        {
                            text: "Yes, I'm sure.",
                            buttonType: "warning",
                            onClick: () => this.deleteProcess(id)
                        }
                    ],
                    cancelAction: {
                        show: true,
                        onClick: this.hidePopup
                    },
                    color: "red"
                }
        })
    }

    /**
     * To hide popup
     */
    hidePopup = () => {
        this.setState({
            popup: {
                show: false,
                headline: "",
                content: <div></div>,
                actions: [
                    {
                        text: "Cancel",
                        buttonType: "grey",
                        onClick: this.hidePopup
                    },
                    {
                        text: "Yes, I'm sure.",
                        buttonType: "warning",
                        onClick: this.deleteProcess
                    }
                ],
                cancelAction: {
                    show: true,
                    onClick: this.hidePopup
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
            popup: {
                show: true,
                headline: "Deleting...",
                content: <CircularLoader text={"Deleting..."} color="red" />,
                actions: [],
                cancelAction: {
                    show: false,
                    onClick: this.hidePopup
                },
                color: "red"
            }
        }, () => {
            db.collection("lateComer").doc(id).delete()
                .then(() => {
                    this.setState({
                        popup: {
                            show: true,
                            headline: "Deleted",
                            content: <p>The data was successfully deleted from the list.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hidePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hidePopup
                            },
                            color: "red"
                        }
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.setState({
                        popup: {
                            show: true,
                            headline: "Uh oh!",
                            content: <p>The data could not be deleted.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hidePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hidePopup
                            },
                            color: "red"
                        }
                    })
                })
        })
    }

    
    showDonePopup = (id) => {

        let popupContent = <div>
            <span>The student will be marked as reached and the in time will be the time you click on this button.</span>
        </div>

        this.setState({
            popup: {
                show: true,
                headline: "Are you sure you want to mark it reached?",
                content: popupContent,
                actions: [
                    {
                        text: "Cancel",
                        buttonType: "grey",
                        onClick: this.hidePopup
                    },
                    {
                        text: "Yes, I'm sure.",
                        buttonType: "warning",
                        onClick: () => this.doneProcess(id)
                    }
                ],
                cancelAction: {
                    show: true,
                    onClick: this.hidePopup
                },
                color: "red"
            }
        })
    }

    /**
     * Function to update data 
     * @param {string} id - id of student
     */
    doneProcess = (id) => {

        this.setState({
            popup: {
                show: true,
                headline: "Done...",
                content: <CircularLoader text={"Done..."} color="red" />,
                actions: [],
                cancelAction: {
                    show: false,
                    onClick: this.hidePopup
                },
                color: "red"
            }
        }, () => {
            db.collection("lateComer").doc(id).update({
                status:"reached",
                inTime:timestamp.now()
            })
                .then(() => {
                    this.setState({
                        popup: {
                            show: true,
                            headline: "Completed",
                            content: <p>The data was successfully updated.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hidePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hidePopup
                            },
                            color: "red"
                        }
                    })
                })
                .catch((error) => {
                    console.error(error)
                    this.setState({
                        popup: {
                            show: true,
                            headline: "Uh oh!",
                            content: <p>The maintenance detail could not be deleted.</p>,
                            actions: [
                                {
                                    text: "Okay",
                                    buttonType: "grey",
                                    onClick: this.hidePopup
                                }
                            ],
                            cancelAction: {
                                show: true,
                                onClick: this.hidePopup
                            },
                            color: "red"
                        }
                    })
                })
        })
    }

    render() {
        const { pendingList,reachedList, loaded, popup,selection } = this.state

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
                name: "Out Time",
                selector: "outTime"
            },
            {
                name: "Date",
                selector: "date"
            }
        ]

        const reachedColumn=[
            {
                name: "Name",
                selector: "name"
            },
            {
                name: "Room no.",
                selector: "room"
            },
            {
                name: "Out Time",
                selector: "outTime"
            },
            {
                name:"In Time",
                selector:"inTime"
            },
            {
                name: "Date",
                selector: "date"
            }
        ]
        const pendingActions = [
            {
                icon: "fas fa-check",
                trigger: (id) => this.showDonePopup(id),
                text: "Reached",
                buttonClass: "action-link action-pink"
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
                trigger: (id) => this.showDeletePopup("reached",id),
                text: "Delete",
                buttonClass: "action-link action-red"
            }
        ]

        const tabs=[
            "Remaining",
            "Reached"
        ]

        return (
            <div className="dashboard-main-page" >
                <div className="header">
                <div className="dashboard-heading-row">
                    <div className="dashboard-heading">
                        <h2>Late Comers</h2>
                    </div>
                    <div>
                        <Button text="Add" link={'/dashboard/late-comer/create'} icon="fas fa-plus"/>
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
                                data={pendingList}
                                actions={pendingActions}
                            />:null}
                            {selection===1?
                                <Table
                                columns={reachedColumn}
                                data={reachedList}
                                actions={completedActions}
                            />:null}
                            </>
                            :
                            <CircularLoader fullPage />}
                    </section>
                </div>
                {popup.show ? <Popup headline={popup.headline} content={popup.content} actions={popup.actions} cancelAction={popup.cancelAction} color={popup.color} /> : null}
            </div>
        );
    }
}

export default LateComer;