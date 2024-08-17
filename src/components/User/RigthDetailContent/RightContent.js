import CountDown from "./CountDown";
import { useRef } from "react";
const RightContent = (props) =>{
    const refDiv = useRef([])
    const setRef = (ref) => {
        if(refDiv){
            refDiv.current.push(ref)
        }
        
    }

    const { dataQuiz} = props

    const timeOut = () =>{
        alert("You have run out of time")
        props.handleFinish()
        props.setResetTimer()
    }

    const getClassQuestion = (index, question) => {
        //check answered
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true)
            if(isAnswered){
                return "question selected";
            }
        }
        return " question ";
    }

    const handleClickQuestion = (index) => {      
        props.setIndex(index)
    }

    return (
        <>
            <div className="main-timer">
               <CountDown
                timeOut = { timeOut}   
                />
            </div>
            <div className="main-quetions">
                {dataQuiz && dataQuiz.length &&
                    dataQuiz.map((item, index) => {
                        return (
                            <div 
                                key={index} 
                                className={getClassQuestion(index,item)}
                                onClick={() => handleClickQuestion( index)}
                                ref={setRef}
                            >
                                {index + 1}</div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default RightContent;