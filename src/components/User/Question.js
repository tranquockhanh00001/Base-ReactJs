import _ from 'lodash'

const Question = (props) =>{
    const {data, index} = props
    if(_.isEmpty(data)){
        return (<>
        </>)
    }

    const handleCheckbox = (event,aId, qId) =>{
        
        props.handleCheckbox(aId, qId);
    }
    return(
        <>
                     {data.image ? 
                        <div>
                            <img className='' src={`data:image/jpeg;base64,${data.image}`} alt=''/>
                        </div>
                        :
                        <div className='q-image'>

                        </div>
                    } 
                    <div className="question">
                        <div className="question-title">Question {index+1}: {data.questionDescription}</div>
                    </div>
                    <div className="answer">
                        {data.answers && data.answers.length &&
                            data.answers.map((answers, index) => {
                                return (
                                    
                                        <div key={`answer-${index}`} className="a-child">
                                            <div className="form-check">
                                            <input 
                                                onChange={(event) => handleCheckbox(event, answers.id, data.questionId)}
                                                checked = {answers.isSelected}
                                                className="form-check-input" 
                                                type="checkbox"  id="flexCheckDefault"/>
                                            <label className="form-check-label" for="flexCheckDefault">
                                                {answers.description}
                                            </label>
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