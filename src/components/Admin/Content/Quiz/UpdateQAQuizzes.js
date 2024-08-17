import Select from 'react-select';
import './UpadteQAQuizzes.scss'
import { useEffect, useState } from 'react';
import { BsPatchPlusFill, BsFillPatchMinusFill  } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postUpdateQA,getQuizWithQA } from "../../../../services/apiService";
import {  toast } from 'react-toastify';

const UpadteQAQuizzes = (props) =>{

    const initState = [{
        id: uuidv4(),
        description:'',
        imageFile:'',
        imageName:'',
        answers:[
            {
                id:uuidv4(),
                description:'',
                isCorrect: false
            }
        ]
    }]

    const [questions, setQuestions] = useState(initState)

    const [isPreviewImage, setPreviewImage] = useState(false);

    const [dataPreviewImage, setDataPreviewImage] = useState(
        {
            url: '',
            title:''
        }
    )

    const [selectedQuiz, setSelectedQuiz] = useState({});

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, [])

    useEffect(() => {
        if(selectedQuiz && selectedQuiz.value){
            fetchQuizWithQA()
        }
       
    }, [selectedQuiz]);

    // return a promise that resolves with a File instance
    function urltoFile(url, filename, mimeType){
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, {type:mime || mimeType});
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename,{type:mimeType}));
    }

    const fetchQuizWithQA = async() => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if(res && res.EC === 0){
            //convert file
            let newQA =[]
            for (let i = 0; i < res.DT.qa.length; i++){
                let q = res.DT.qa[i];
                if(q.imageFile){
                    q.imageName = `Question-${q.id}`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}`,'image/png')
                }
                newQA.push(q)
            }
            setQuestions(newQA)
            console.log('>>>check : ', newQA)
        }
       
    }

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

    const handlePreviewImage = (questionId) =>{
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if(index > -1){
            setDataPreviewImage({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })
            setPreviewImage(true)
        }

    }

    const handleAddRemoveQuestion = (type, id) => {
        if (type === 'ADD') {
            const newQuestion = 
            {
                
                    id: uuidv4(),
                    description:'',
                    imageFile:'',
                    imageName:'',
                    answers:[
                        {
                            id:uuidv4(),
                            description:'',
                            isCorrect: false
                        }
                    ]
                
            };
            setQuestions([...questions, newQuestion]);
        }
        if(type === 'REMOVE'){
            let questionClone = _.cloneDeep(questions)
            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone);
        }
    }

    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === 'ADD') {
            const newAnswer = 
            {
                   
                id:uuidv4(),
                description:'',
                isCorrect: false
                        
            };

            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(
                newAnswer
            )
            setQuestions(questionsClone);
        }
        if(type === 'REMOVE'){ 
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId) 
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone);
        }
    }

    const handleOnchange = (type, questionId, value) => {
        
        if (type === 'QUESTION'){
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if(index > -1){
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnchangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if(index > -1 && event.target && event.target.files && event.target.files[0]){
            questionsClone[index].imageFile = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
           
        }
    }

    const handleAnswerQuestion = (type, questionId, answerId, value) =>{
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if(index > -1 ){
            questionsClone[index].answers =
                questionsClone[index].answers.map( answer => {
                    if(answer.id === answerId){
                        if (type === 'CHECKBOX'){
                            answer.isCorrect = value;
                        }
                        if(type === 'INPUT'){
                            answer.description = value
                        }                      
                    }
                    return answer;
                })
            setQuestions(questionsClone);
           
        }
    }

    const handleSaveQuestion = async () => {
         //validate
        if(_.isEmpty(selectedQuiz)){
            toast.error("Please choose a quiz")
            return;
        }

        
        //validate question
        let isValidQuestion = true;
        let indexQuestion = 0
        for (let i = 0; i < questions.length; i++){
            if(!questions[i].description){
                isValidQuestion = false;
                indexQuestion = i + 1;
                break;
            }
        }
        if(isValidQuestion === false){
            toast.error(" Questions " + indexQuestion + " invalid input")  
            return;
        }

        //validate answer
        let isValid = true;
        let indexAnswer = 0;
        for (let i = 0; i < questions.length; i++){
            
            for (let j = 0; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j].description){
                    isValid = false;
                    indexAnswer = j + 1;
                    break;
                }
            }
            indexQuestion = i + 1;
            if(isValid === false){
                break;  
            }
        }
        if(isValid === false){
            toast.error("Answers " + indexAnswer + " of Question " + indexQuestion + " invalid input")
            return;
        }
        
        //submit questions
        const toBase64 = file => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })

        let questionClone = _.cloneDeep(questions)
        for ( let i = 0; i< questionClone.length; i++){
            if(questionClone[i].imageFile){
                questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
            }
        }

        let res = await postUpdateQA({
            quizId: selectedQuiz.value,
            questions: questionClone

        });
        console.log('>>>>>>>>>check :', res)

        if(res && res.EC === 0){
            toast.success(res.EM)
            fetchQuizWithQA()
        }else{
            toast.error(res.EM)
        }
    }
    
    return (
        <div className="questions-container">
            <div className="add-new-question mt-3   ">
                <div className='col-6 form-group'>
                    <label className="form-label">Select Quiz:</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                        className='select-quiz'
                    />
                </div>
                <div className='mt-3 questions-title'>
                        Add questions:
                </div>
                {
                    questions && questions.length

                    && questions.map((question, index) =>{
                        return(
                            <div key={question.id} className='q-main mb-5'>
                                <div className='questions-content mt-2'>
                                    <div class="form-floating desciption">
                                        <input type="type" 
                                            className="form-control" 
                                            placeholder="name@example.com"
                                            value={question.description}
                                            onChange={(event) => handleOnchange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label for="floatingInput">Question {index + 1}'s Description</label>
                                    </div>
                                    <div className='group-upload'>
                                        <label htmlFor = {`${question.id}`}>
                                            <RiImageAddFill className='label-upload'/>
                                        </label>
                                        <input 
                                            id = {`${question.id}`}
                                            onChange={(event) => handleOnchangeFileQuestion(question.id, event)}
                                            type={'file'} 
                                            hidden
                                        />
                                        <span>
                                            {question.imageName 
                                            ? 
                                            <span style={{cursor : 'pointer'}} onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>                                            
                                            : 
                                            'No file is uploaded'}
                                        </span>
                                    </div>
                                    <div className='btn-add'>
                                        <span className='button-29' onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                        <BsPatchPlusFill /> 
                                        </span>
                                        {questions && questions.length > 1 &&
                                        <span className='button-29' onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                        <BsFillPatchMinusFill  /> 
                                        </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question && question.answers.length > 0
                                    && question.answers.map((answer, index) =>{
                                        return(
                                            <div key={answer.id} className='answer-content'>
                                                <input                  
                                                    className="form-check-input" 
                                                    type="checkbox"  
                                                    checked = {answer.isCorrect}
                                                    onChange={(event) => handleAnswerQuestion('CHECKBOX', question.id, answer.id, event.target.checked)}
                                                />
                                                <div className="form-floating desciption">
                                                    <input 
                                                        value={answer.description}
                                                        type="text" 
                                                        className="form-control" 
                                                        placeholder="name@example.com"
                                                        onChange={(event) => handleAnswerQuestion('INPUT', question.id, answer.id, event.target.value)}
                                                    />
                                                    <label for="floatingInput">Answer {answer.index}</label>
                                                </div>
                                                <div className='btn-add'>
                                                    <span className='cssbuttons-io-button' onClick={() => handleAddRemoveAnswer('ADD', question.id, '')}>
                                                    <BsPatchPlusFill /> 
                                                    </span>
                                                    {
                                                        question.answers.length > 1 &&
                                                        <span className='cssbuttons-io-button' onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                                        <BsFillPatchMinusFill  /> 
                                                        </span>
                                                    }   
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                                
                            </div>
                           
                        )
                    })
                }
                             
                {
                    questions && questions.length > 0 &&
                        <div>
                            <button 
                                className='button-29 my-5 save-questions'
                                onClick={() => handleSaveQuestion()}
                            >
                                Save Questions
                            </button>
                        </div>
                }

                
                {isPreviewImage === true &&
                                    <Lightbox 
                                        image = {dataPreviewImage.url}
                                        title={dataPreviewImage.title}
                                        onClose = {() => setPreviewImage(false)}
                                    >
                                    </Lightbox>
                }
            </div>
                
           
        </div>
    )
}

export default UpadteQAQuizzes;