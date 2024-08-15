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
import { Link, useNavigate } from 'react-router-dom';


const SideBar = (props) => {
    const {   collapsed, toggled, handleToggleSidebar } = props;
    const navigate = useNavigate();
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
                            onClick={() => navigate('/')}
                        >
                            
                                <DiReact size = {'3em'} color={"00bfff"}/>
                                <div className='sidebar-header-title'>KC</div>
                            
                        </div> 
                        
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
                            <MenuItem> 
                            Manage Quizzes
                            <Link to = "/admins/manage-quizzes"/>
                            </MenuItem>
                            <MenuItem> 
                            <Link to = "/admins/manage-questions"/>
                            Question Management
                            <Link to = "/admins/manage-questions"/>
                            </MenuItem>
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