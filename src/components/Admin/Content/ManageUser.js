
import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss'
// import TableUsers from "./TableUsers";
import {getAllUser, getUserPaginate} from "../../../services/apiService";
import { useEffect, useState } from "react"
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";




const ManageUser = () =>{
    const LIMIT_USER = 6
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [modalShow, setModalShow] = useState(false);
    const [listUser, setListUser] = useState([]);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() =>{
        // fetchListUsers()
        fetchListUsersPaginate(1)
    },[]);

    const fetchListUsers = async() =>{
        let data = await getAllUser()
        if(data.EC === 0 ){
            setListUser(data.DT)
            
        }
    }

    const fetchListUsersPaginate = async(page) =>{
        let data = await getUserPaginate(page, LIMIT_USER)
        if(data.EC === 0 ){
            setListUser(data.DT.users)
            setPageCount(data.DT.totalPages)
        }
    }

    const handalClickBtnUpdate = (user) =>{
        setShowModalUpdateUser(true)
        setDataUpdate(user)
    }

    const handleClickBtnView = (user) =>{
        setShowModalViewUser(true)
        setDataView(user)
    }

    const handleClickBtnDelete = (user) =>{
        setShowModalDeleteUser(true)
        setDataDelete(user)
        
    }

    return(
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-info" onClick={()=>setModalShow(true)}>
                        Add New User
                    </button>
                </div>
                <div className="table-users-container">
                    {/* <TableUsers 
                        listUser ={listUser}
                        handalClickBtnUpdate={handalClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    />  */}
                    <TableUserPaginate
                        listUser ={listUser}
                        handalClickBtnUpdate={handalClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersPaginate={fetchListUsersPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />                    
                </div>

                <ModalCreateUser 
                    show = {modalShow}
                    setShow = {setModalShow}
                    fetchListUsers = { fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                     currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show = {showModalUpdateUser}
                    setShow = {setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers = { fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

                <ModalViewUser
                    show = {showModalViewUser}
                    setShow = {setShowModalViewUser}
                    dataView={dataView}
                />

                <ModalDeleteUser
                    show = {showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers = { fetchListUsers}
                    fetchListUsersPaginate={fetchListUsersPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default ManageUser;