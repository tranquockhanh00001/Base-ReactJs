import 'react-pro-sidebar/dist/css/styles.css';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import { FaGem,  FaGithub } from 'react-icons/fa';
import { DiReact} from 'react-icons/di'
import { MdDashboard} from 'react-icons/md'
import sidebarBg from '../../assets/bg2.jpg';
import './Sidebar.scss'
import { Link } from 'react-router-dom';


const SideBar = (props) => {
    const {   collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
                className='sidebar-container'
            >
                
                    <SidebarHeader>
                        <Link to="/">
                        <div
                            className='sidebar-header-container'
                            style={{
                                padding: '24px',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: 14,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                
                            }}
                        >
                            
                                <DiReact size = {'3em'} color={"00bfff"}/>
                                <div className='sidebar-header-title'>KC</div>
                            
                        </div> 
                        </Link>
                    </SidebarHeader>
                

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard />}
                            // suffix={<span className="badge red">New</span>}
                        >
                           Dashboard
                           <Link to = "/admins" />
                        </MenuItem>
                        
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem />}
                            title="Features"
                        >
                            <MenuItem>
                             User Management
                             <Link to = "/admins/manage-user"/>
                             </MenuItem>
                            <MenuItem> Manage Quizzes</MenuItem>
                            <MenuItem> Question Management</MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                    >
                        <a
                            href="https://github.com/tranquockhanh00001/Base-ReactJs/tree/main/src"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                            <FaGithub />
                            <span style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                viewSource
                            </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;