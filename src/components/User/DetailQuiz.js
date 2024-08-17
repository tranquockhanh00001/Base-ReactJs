import { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from "./Question";
import ModalFinishSubmit from './ModalFinishSubmit'
import RightContent from "./RigthDetailContent/RightContent";
import PerfectScrollbar from 'react-perfect-scrollbar'
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
// import { NavLink } from "react-router-dom";


const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [index, setIndex] = useState(0);
    const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
    const [isShowAnswer, setIsShowAnswer] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false);
    const [dataModalresult, setDataModalResult] = useState({});
    

    useEffect(()=>{
        fetchQuestions()
    },[quizId])

    const fetchQuestions = async() =>{
        let res = await getDataQuiz(quizId)
        if(res && res.EC === 0){
            let raw = res.DT; 
            let data = _.chain(raw)
            // Group the elements of Array based on `color` property
            .groupBy("id")
            // `key` is group's name (color), `value` is the array of objects
            .map((value, key) => {
                let answers = [];
                let questionDescription, image = null
                value.forEach((item, index) =>{
                    item.answers.isSelected = false;
                    answers.push(item.answers)
                    if(index === 0){
                        questionDescription = item.description
                        image = item.image
                    }
                })
                answers = _.orderBy(answers, ['id'], ['asc']);
                
                return { questionId: key, answers, questionDescription, image }
            })
            .value()
            setDataQuiz(data)
        }
    }

    const handleBack = () =>{
        if(index -1 < 0) return;
        setIndex(index - 1)
    }

    const handleNext = () =>{
        if(dataQuiz && dataQuiz.length > index+1)       
        setIndex(index + 1)
    }

    const handleCheckbox = (answersId, questionId) =>{
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if(question && question.answers){
            let b = question.answers.map(item =>{
                if(+item.id === +answersId){
                    item.isSelected = !item.isSelected
                }
                return item;
            }) 
            question.answers = b
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if(index > -1){
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
        
    }  
    
    const handleFinish = async() =>{
        console.log('>>>> check data before', dataQuiz)
        let payload = {
            quizId: +quizId,
            answers : []
        }
        let answers = [];
        if(dataQuiz&& dataQuiz.length > 0){
        dataQuiz.forEach(question =>{
            
            let questionId = question.questionId;
            let userAnswerId = [];

            question.answers.forEach(a =>{
                if(a.isSelected === true){
                    userAnswerId.push(a.id)
                }
            })
            answers.push({
                questionId: +questionId,
                userAnswerId: userAnswerId
                })
            })    
        }
        payload.answers = answers;
        // submit api

        let res = await postSubmitQuiz(payload)

        if(res && res.EC === 0){
            setIsSubmitQuiz(true)
            setDataModalResult({
                countCorrect: res.DT.countCorrect,
                countTotal: res.DT.countTotal,
                quizData: res.DT.quizData
            })
            setIsShowModal(true);
              //update DataQuiz with correct answer
            if (res.DT && res.DT.quizData) {
                let dataQuizClone = _.cloneDeep(dataQuiz);
                let a = res.DT.quizData;
                for (let q of a) {
                    for (let i = 0; i < dataQuizClone.length; i++) {
                        if (+q.questionId === +dataQuizClone[i].questionId) {
                            //update answer
                            let newAnswers = [];
                            for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                                let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                                if (s) {
                                    dataQuizClone[i].answers[j].isCorrect = true;
                                }
                                newAnswers.push(dataQuizClone[i].answers[j]);
                            }
                            dataQuizClone[i].answers = newAnswers;
                        }
                    }
                }
                setDataQuiz(dataQuizClone);
            }
        }else{
            alert('submit fail')
        }  
    }

    const handleShowAnswer = () => {
        if (!isSubmitQuiz) return;
        setIsShowAnswer(true);
    }
    return(
        <>
        {/* <Breadcrumb className="quiz-detai-new-header">
                <NavLink to='/' className='breadcrumb-item'>
                    {t('header.home')}
                </NavLink>
                <NavLink to='/users' className='breadcrumb-item'>
                    {t('header.user')}
                </NavLink>
                <Breadcrumb.Item active>
                    {t('header.quiz')}
                </Breadcrumb.Item>
        </Breadcrumb> */}

        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quizz {quizId}: {location?.state?.quizTitle}
                </div>
                <div className="q-content">
                    <Question 
                        
                        index = {index}
                        handleCheckbox = {handleCheckbox}
                        isShowAnswer={isShowAnswer}
                        isSubmitQuiz={isSubmitQuiz}
                        data={ dataQuiz && dataQuiz.length >0 ? dataQuiz[index] : []}
                    />
                </div>
              
                
                <div className="footer">
                    <button className="btn btn-secondary mr-3" onClick={() => handleBack()}>Back</button>
                    <button className="btn btn-danger ml-3" onClick={() => handleNext()}>Next</button>
                    <button className="btn btn-warning ml-3" onClick={() => handleFinish()}>Finish</button>
                    
                </div>
            </div>
            <div className="right-content">
                <PerfectScrollbar>
                    <RightContent
                        dataQuiz = {dataQuiz}
                        handleFinish ={handleFinish}
                        setIndex = {setIndex}
                    />
                </PerfectScrollbar>   
            </div>
            <ModalFinishSubmit
                show = {isShowModal}
                setShow = {setIsShowModal}
                dataModalresult={dataModalresult}
                handleShowAnswer={handleShowAnswer}
            />
          
        </div>
        </>
    )
}

export default DetailQuiz