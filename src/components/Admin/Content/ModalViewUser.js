import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import {FcPlus} from 'react-icons/fc'
import _ from 'lodash'

const  ModalViewUser =(props) => {

    const {show, setShow, dataView} = props;
    const handleClose = () => {
            setShow(false)
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            setImage(dataView.image)
            setpreviewImage("")

            
    }

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [role, setRole] = useState("USER");
    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = useState();
    const [previewImage, setpreviewImage] = useState("")

    const handleUploadImage = (event) =>{
        if(event.target && event.target.files && event.target.files[0]){
            setpreviewImage ( URL.createObjectURL(event.target.files[0]))
            setImage(event.target.files[0])
        }

    }

    useEffect(()=>{
        console.log('>>>check data view', dataView)
        if(!_.isEmpty(dataView)){
            setEmail(dataView.email)
            setUsername(dataView.username)
            setRole(dataView.role)
            setImage(dataView.image)
            if(dataView.image){
                setpreviewImage(`data:image/jpeg;base64,${dataView.image}`)
            }
        }

    },[dataView])
    
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
                        disabled
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                {/* <div className="col-md-6">
                    <label  className="form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        value={password}
                        disabled
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div> */}
                <div className="col-md-6">
                    <label  className="form-label">User Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        disabled
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

        </Modal.Footer>
        </Modal>
    );
    }


export default ModalViewUser;