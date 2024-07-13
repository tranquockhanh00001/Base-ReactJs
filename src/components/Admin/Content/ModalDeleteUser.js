
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteUser } from '../../../services/apiService';
import { toast } from 'react-toastify';

const  ModalDeleteUser=(props)=> {
  const {show, setShow, dataDelete} = props

  const handleClose = () => setShow(false);

  const handleSubmitDeleteUser =async() =>{
    let res = await deleteUser(dataDelete.id)
    console.log(">>>>check res",res.data.DT.id)
    if(res.data && res.data.EC === 0){
        toast.success(res.data.EM)
        handleClose()
        // await props.fetchListUsers()
        props.setCurrentPage(1)
        await props.fetchListUsersPaginate(1)
    }else{
        toast.error(res.data.EM)
    }
  }


  return (
    <>

      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop

      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>You definitely want to delete this user. Email : <b>{dataDelete.email}</b></Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={()=>{handleSubmitDeleteUser()}}  
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDeleteUser;