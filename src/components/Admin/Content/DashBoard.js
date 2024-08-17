import './DashBroad.scss';
import { BarChart, CartesianGrid, XAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverView } from '../../../services/apiService';
import { useEffect, useState } from 'react';


const DashBoard = () =>{

    const [dataOverView, setDataOverView] = useState([]);

    const [dataChart, setDataChart] = useState([]);

    const data = [
        {
          "name": "Users",
          "Us": 4000,
        },
        {
          "name": "Quizzes",
          "Qz": 3000,
        },
        {
          "name": "Questions",
          "Qs": 2000,
        },
        {
          "name": "Answers",
          "As": 2780,
        }
      ]

    useEffect(() => {
        fetchApiOverView()
    },[])

    const fetchApiOverView = async() => {
        let res = await getOverView()
        if(res && res.EC=== 0){
            setDataOverView(res.DT)
            let Us = res.DT.users.total, Qz = res.DT.others.countQuiz, Qs = res.DT.others.countQuestions, As = res.DT.others.countAnswers
            const data = [
                {
                  "name": "Users",
                  "Us": Us,
                },
                {
                  "name": "Quizzes",
                  "Qz": Qz,
                },
                {
                  "name": "Questions",
                  "Qs": Qs,
                },
                {
                  "name": "Answers",
                  "As": As,
                }
              ]
            setDataChart(data)
        }
        console.log('>>> check ress', res)
    }
    return(
        <div className='dashbroad-container'>
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='dashbroad-content'>
                <div className='dashbroad-content-left'>
                    <div className='total'>
                       <span className='text-1'> Total Users</span>
                       <span className='text-2'>
                        {dataOverView && dataOverView.users && dataOverView.users.total
                            ? <>{dataOverView.users.total}</> : <>0</>
                        }
                        </span>
                    </div>
                    <div className='total'>                       
                        <span className='text-1'> Total Quizzes</span>
                        <span className='text-2'> {dataOverView && dataOverView.others && dataOverView.others.countQuiz
                            ? <>{dataOverView.others.countQuiz}</> : <>0</>
                        }</span>
                    </div>
                    <div className='total'>                      
                        <span className='text-1'> Total Questions</span>
                        <span className='text-2'>{dataOverView && dataOverView.others && dataOverView.others.countQuestions
                            ? <>{dataOverView.others.countQuestions}</> : <>0</>
                        }</span>
                    </div>
                    <div className='total'>                       
                        <span className='text-1'> Total Answers</span>
                        <span className='text-2'> {dataOverView && dataOverView.others && dataOverView.others.countAnswers
                            ? <>{dataOverView.others.countAnswers}</> : <>0</>
                        }</span>
                    </div>
                </div>
                <div className='dashbroad-content-right'>
                    <BarChart width={690} height={440} data={dataChart}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        {/* <YAxis /> */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Us" fill="#8884d8" />
                        <Bar dataKey="Qz" fill="#82ca9d" />
                        <Bar dataKey="Qs" fill="#fcb12a" />
                        <Bar dataKey="As" fill="#e23e7c" />
                    </BarChart>
                </div>
            </div>
        </div>
    )
}

export default DashBoard;