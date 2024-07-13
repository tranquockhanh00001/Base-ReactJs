import ReactPaginate from "react-paginate";



const TableUserPaginate = (props) =>{


    const handlePageClick = (event) => {

        props.fetchListUsersPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        
      };
   
    const {listUser, pageCount} = props

    
    return(
        <>
            <table className="table table-hover table-bordered ">
            <thead>
                <tr className="table-info">
                    <th scope="col">ID</th>
                    <th scope="col">User's name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listUser && listUser.length > 0 &&
                listUser.map((item, index) => {
                    
                    return(
                        <tr key = {`table-user-${index}`}>
                            <th>{item.id}</th>
                            <td>{item.username}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                        <td>
                            <button className="btn btn-success" onClick={()=> props.handleClickBtnView(item)}>View</button>
                            <button className="btn btn-warning mx-3" onClick={() => props.handalClickBtnUpdate(item)}>Update</button>
                            <button className="btn btn-danger" onClick={() => props.handleClickBtnDelete(item)}>Delete</button>
                        </td>
                        </tr>
                    )
                })
                }
                {listUser && listUser.length === 0 && 
                <tr>
                    <td colSpan={4}>
                       Not found data 
                    </td>
                     
                </tr>}
                
            </tbody>
            
            </table>
            <div className="paginate-container">
                <ReactPaginate
                    nextLabel=" >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< "
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage -1 }
                />
            </div>
            
            
        </>
    )
}

export default TableUserPaginate