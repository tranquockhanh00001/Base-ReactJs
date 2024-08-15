import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import {FcPlus} from 'react-icons/fc'
import {  toast } from 'react-toastify';
import { postCreateNewUser } from '../../../services/apiService';

const  ModalCreateUser =(props) => {

    const {show, setShow} = props;
    const handleClose = () => {
        setShow(false)
        setEmail("")
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("USER");
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState("")

    const handleUploadImage = (event) =>{
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage ( URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }

    }

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleSubmitCreateUser = async() =>{
        //validate
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('Email invalidate ')
            
            return;
        }

        if(!password){
            toast.error('Password is required ')
            return;
        }

        if(!username){
            toast.error('Username is required ')
            return;
        }

       

        let data = await postCreateNewUser(email, password, role, username, image)
        console.log(">>> check response" , data)
        if(data && data.EC === 0){
            toast.success('Create user success ');
            handleClose();
            // await props.fetchListUsers()
            props.setCurrentPage(1)
            await props.fetchListUsersPaginate(1)
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
          Add New User
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
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label  className="form-label">Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    value={password}
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
                <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)}>
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
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
        <Button   onClick={handleSubmitCreateUser}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}


export default ModalCreateUser;