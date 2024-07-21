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

export {  postCreateNewUser, getAllUser, putUpdateUser, 
          deleteUser, getUserPaginate, postLogin, 
          postRegister, getQuizByUser, getDataQuiz
     }