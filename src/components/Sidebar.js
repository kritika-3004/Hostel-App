import React from 'react'
import { NavLink } from 'react-router-dom'
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';

const Sidebar = () => {

    return (

        <div>
            <div className="sidebar">
                <div className="sidebar-logo">
                </div>
                <div className="sidebar-links">
                    <ul>
                        <li>
                            <NavLink exact to="/dashboard" >
                                <ExploreOutlinedIcon />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/students" activeClassName="active">
                                <span>Students</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/maintenance" activeClassName="active">
                                <QuestionAnswerOutlinedIcon />
                                <span>Maintenance</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/late-comer" activeClassName="active" >
                                <AccountCircleOutlinedIcon />
                                <span>Late Comer</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Sidebar;