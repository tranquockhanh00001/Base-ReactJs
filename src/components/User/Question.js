import _ from 'lodash'
import { useState } from 'react';
import Lightbox from "react-awesome-lightbox";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = (props) =>{
    const {data, index, isShowAnswer} = props
    const [isPreviewImage, setIsPreviewImage] = useState(false);

    if(_.isEmpty(data)){
        return (<>
        </>)
    }

    const handleHanleCheckbox = (event,aId, qId) =>{
        
        props.handleCheckbox(aId, qId);
    }
    return(
        <>
                     {data.image ? 
                        <div className='q-image'>
                            <img className='' src={`data:image/jpeg;base64,${data.image}`} alt='' onClick={() => setIsPreviewImage(true)}/>                            
                           {isPreviewImage === true &&
                                <Lightbox 
                                    image = {`data:image/jpeg;base64,${data.image}`}
                                    title={"Questions image"}
                                    onClose = {() => setIsPreviewImage(false)}
                                >
                                </Lightbox>
                            }
                        </div>
                        :
                        <div className='q-image'>
                            
                        </div>
                    } 
                    <div className="question">
                        <div className="question-title">Question {index+1}: {data.questionDescription} ? </div>
                    </div>
                    <div className="answer">
                        {data.answers && data.answers.length &&
                            data.answers.map((a, i) => {
                                return (
                                    
                                    <div
                                    key={`answer-${i}`}
                                    className="a-child">
                                    <div className="form-check">
                                        <input
                                            id={`checkbox-${i}-${index}`}
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={a.isSelected}
                                            disabled={props.isSubmitQuiz}
                                            onChange={(event) => handleHanleCheckbox(event, a.id, data.questionId)}
                                        />
                                        <label className="form-check-label" htmlFor={`checkbox-${i}-${index}`} >
                                            {a.description}
                                        </label>
                                        {isShowAnswer === true &&
                                            <>
                                                {a.isSelected === true && a.isCorrect === false
                                                    && <IoIosClose className='incorrect' />
                                                }
    
                                                {a.isCorrect === true
                                                    && <IoIosCheckmark className='correct' />
                                                }
                                            </>
                                        }
    
                                    </div>
                                </div>
                                    
                                )
                            })
                        }
                        
                    </div>
                
        </>
    )
}

export default Question