import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';

const AssignQuiz = (props) => {

    
    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listQuiz, setListQuiz] = useState([]);

     
    const [listUsers, setListUsers] = useState({});

    const [selectedUser, setSelectedUser] = useState([]);

    useEffect(() => {
        fetchQuiz();
        fetchUsers();
    }, [])

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id ,
                    label: `${item.id} - ${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const fetchUsers = async() =>{
        
        let res = await getAllUser();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id ,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUsers(newUser)
        }
    }

    const handleAssign = async() =>{
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success(res.EM)
        }else{
            toast.error(res.EM)
        }
        console.log('>>> check res', res)
    }


    return(
        <div className="assign-quiz-conatier row">
            <div className='col-6 form-group'>
                    <label className="form-label">Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        className='select-quiz'
                    />
            </div>
            <div className='col-6 form-group'>
                    <label className="form-label">Select User:</label>
                    <Select
                        defaultValue={selectedUser}
                        onChange={setSelectedUser}
                        options={listUsers}
                        className='select-quiz'
                    />
            </div>
            <div className='mt-5'>
                <button className="button-29" onClick={() => handleAssign()}>Assign Quiz</button>
            </div>
        </div>
    )
}

export default AssignQuiz;