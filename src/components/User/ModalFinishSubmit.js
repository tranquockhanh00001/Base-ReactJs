
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


const  ModalFinishSubmit=(props)=> {
  const {show, setShow, dataModalresult} = props
  console.log(dataModalresult)

  const handleClose = () => setShow(false);

  return (
    <>

      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop

      >
        <Modal.Header closeButton>
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='result'>
            Total Questions: <b>{dataModalresult.countTotal}</b>
          </div>
          <div className='result'>
            Total Correct: <b>{dataModalresult.countCorrect}</b>
          </div>
          <div className='result'>
            Mark: <b>{dataModalresult.countCorrect*(10/dataModalresult.countTotal)}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button 
            variant="primary" 
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalFinishSubmit;