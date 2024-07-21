import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import {FcPlus} from 'react-icons/fc'
import {  toast } from 'react-toastify';
import { putUpdateUser } from '../../../services/apiService';
import _ from 'lodash'

const  ModalUpdateUser =(props) => {

    const {show, setShow, dataUpdate} = props;
    const handleClose = () => {
        setShow(false)
        setEmail(dataUpdate.email)
        setUsername(dataUpdate.username)
        setRole(dataUpdate.role)
        setImage(dataUpdate.image)
        setpreviewImage("")
        
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState();
    const [previewImage, setpreviewImage] = useState("")

    useEffect(() =>{
        console.log(dataUpdate)
        if(!_.isEmpty(dataUpdate)){
            //updateState
            setEmail(dataUpdate.email)
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage(dataUpdate.image)
            if(dataUpdate.image){
                setpreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
            
        }
    },[dataUpdate])

    const handleUploadImage = (event) =>{
        if(event.target && event.target.files && event.target.files[0]){
            setpreviewImage ( URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }

    }

    const handleSubmitUpdateUser = async() =>{
        //validate

        if(!username){
            toast.error('Username is required ')
            return;
        }

       

        let data = await putUpdateUser( dataUpdate.id, username,role, image)
        if(data && data.EC === 0){
            toast.success('Update user success ');
            handleClose();
            //await props.fetchListUsers()
            // props.setCurrentPage(1)
            await props.fetchListUsersPaginate(props.currentPage)
        }else{
            toast.error('Your email has been used ')
        }
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop ="static"
      className='modal-add-user'
      show = {show}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update A User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label  className="form-label">Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    value={email}
                    disabled
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label  className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    value={password}
                    disabled
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label  className="form-label">User Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
            </div>
            <div className="col-md-4">
                <label for="inputState" className="form-label">Role</label>
                <select className="form-select" onChange={(event) => setRole(event.target.value)}>
                    <option  value="USER">USER</option>
                    <option  value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className='col-md-12'>
                <label className='form-label label-upload' htmlFor='labelUpload'>
                   <FcPlus className='btn-choose'/> Choose avatar
                </label>
                <input 
                    type = "file" 
                    hidden id="labelUpload"
                    onChange={(event) => handleUploadImage(event)}
                />
            </div>
            <div className='col-md-12 img-preview'>
                {previewImage ? <img src={previewImage} alt="preview" className='img-thumbnail' /> :  <span>Preview image</span>}
               
                
            </div>
           
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button   onClick={handleSubmitUpdateUser}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default ModalUpdateUser;