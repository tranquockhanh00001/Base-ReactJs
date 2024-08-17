import axios from '../utils/axiosCustumize';

const postCreateNewUser = (email, password, role, username, image) =>{
     //call api
     const data = new FormData();
     data.append('email', email);
     data.append('password', password);
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.post('v1/participant',data)
}

const putUpdateUser = ( id, username,role, image) =>{
     //call api
     const data = new FormData();
     data.append('id', id)
     data.append('username', username);
     data.append('role', role);
     data.append('userImage', image);

     return axios.put('v1/participant',data)
}

const getAllUser = () =>{
     return axios.get('v1/participant/all')
}

const deleteUser = (userId) =>{
     return axios.delete('v1/participant',{data :{id: userId}})
}

const getUserPaginate = (page, limit) =>{
     return axios.get(`v1/participant?page=${page}&limit=${limit}`)
}

const postLogin = (userEmail, userPassword) => {
     return axios.post(`v1/login`, {
          email: userEmail, 
          password: userPassword,
          delay: 2000
     })
}

const postRegister = (userEmail, userName, userPassword) =>{
     return axios.post(`v1/register`, {username: userName, email: userEmail, password:userPassword})
}

const getQuizByUser = () =>{
     return axios.get('v1/quiz-by-participant')
}

const getDataQuiz = (id) =>{
     return axios.get(`v1/questions-by-quiz?quizId=${id}`)
}

const postSubmitQuiz = (data) =>{
     return axios.post(`v1/quiz-submit`, {...data})
}

const postCreateNewQuiz = (description, name, difficulty, image) =>{
     const data = new FormData();
     data.append('description', description);
     data.append('name', name);
     data.append('difficulty', difficulty);
     data.append('quizImage', image);

     return axios.post(`v1/quiz`, data)
}

const getAllQuizForAdmin = () =>{
     return axios.get(`v1/quiz/all`)
}

const putUpdateQuizForAdmin = (id, name, description, difficulty, image) => {
     const data = new FormData();
     data.append('id', id);
     data.append('description', description);
     data.append('name', name);
     data.append('difficulty', difficulty);
     data.append('quizImage', image);
     return axios.put('v1/quiz', data);
 }
 
 const deleteQuizForAdmin = (id) => {
     return axios.delete(`v1/quiz/${id}`);
 }

 const postCreateNewQuestionForQuiz = (quiz_id, description, image) =>{
     const data = new FormData();
     data.append('quiz_id', quiz_id);
     data.append('description', description);
     data.append('questionImage', image);
     return axios.post('v1/question', data);
 }

 const postCreateNewAnswerForQuestion = (description, correct_answer,  question_id) =>{
     return axios.post('v1/answer', {
          correct_answer,
          description,
          question_id
     });
 }

 const postAssignQuiz = (quizId, userId) =>{
     return axios.post('v1/quiz-assign-to-user',{
          quizId, userId
     })
 }

 const getQuizWithQA = (quizId) =>{
     return axios.get(`v1/quiz-with-qa/${quizId}`)
 }
 const postUpdateQA = (data) =>{
     return axios.post(`v1/quiz-upsert-qa`,{
               ...data   
          }
     )
 }

 const getOverView = () =>{
     return axios.get(`v1/overview`)
 }

export {  postCreateNewUser, getAllUser, putUpdateUser, 
          deleteUser, getUserPaginate, postLogin, 
          postRegister, getQuizByUser, getDataQuiz,
          postSubmitQuiz, postCreateNewQuiz, getAllQuizForAdmin,
          putUpdateQuizForAdmin, deleteQuizForAdmin, postCreateNewQuestionForQuiz,
          postCreateNewAnswerForQuestion, postAssignQuiz, getQuizWithQA,
          postUpdateQA, getOverView
     }