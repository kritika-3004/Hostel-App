import React from 'react'
import { NavLink } from 'react-router-dom'
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import HomeIcon from '@material-ui/icons/Home';

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
                                <HomeIcon/>
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/students" activeClassName="active">
                                <GroupAddIcon/>
                                <span>Students</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/maintenance" activeClassName="active">
                                <SettingsIcon/>
                                <span>Maintenance</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/late-comer" activeClassName="active" >
                                <WatchLaterIcon/>
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