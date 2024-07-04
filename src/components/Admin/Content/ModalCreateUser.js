import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop ="static"
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
                <input type="email" className="form-control" />
            </div>
            <div className="col-md-6">
                <label  className="form-label">Password</label>
                <input type="password" className="form-control" />
            </div>
            <div className="col-md-6">
                <label  className="form-label">User name</label>
                <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
                <label for="inputState" className="form-label">Role</label>
                <select id="inputState" className="form-select">
                <option selected value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div classNameName='col-md-12'>
                <label className='form-label'>Image</label>
                <input type = "file"/>
            </div>
           
            </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button   onClick={props.onHide}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

const ModalCreateUser = () => {
  const [modalShow, setModalShow] = useState(false);

  

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default ModalCreateUser;