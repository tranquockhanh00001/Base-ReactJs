import { useState } from 'react'
import avtSigup from '../../assets/draw1.webp'
import './Register.scss'
import { postRegister } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () =>{

    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleRegister = async() =>{
        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('Email invalidate ')
            
            return;
        }

        if(!password){
            toast.error('Password is required ')
            return;
        }

        if(!username){
            toast.error('Username is required ')
            return;
        }

        let res = await postRegister(email, username, password);
        if(res.data && res.data.EC === 0){
            toast.success(res.data.EM)
            navigate('/login')
        }else{
            toast.error(res.data.EM)
        }
        console.log(">>>>>check res", res.data)
    }


    return(
        <section className="vh-100" >
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black" >
                <div className="card-body ">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                        <form className="mx-1 mx-md-4">

                        <div className="form-input mb-4">
                            <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example1c">Your Name</label>
                                <input 
                                    type="text" 
                                    id="form3Example1c" 
                                    className="form-control" 
                                    value={username}
                                    onChange={(e) => setUserName(e.target.value)}
                                    />
                           
                            </div>
                        </div>

                        <div className="form-input d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                            <label className="form-label" for="form3Example3c">Your Email</label>
                            <input 
                                type="email" 
                                id="form3Example3c" 
                                className="form-control" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            
                            </div>
                        </div>

                        <div className="form-input d-flex flex-row align-items-center mb-4">
                            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                            <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                <label className="form-label" for="form3Example4c">Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    id="form3Example4c" 
                                    className="form-control" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                { showPassword ?
                                    <span className='show-password'onClick={()=> setShowPassword(false)}>
                                        <i className="fas fa-eye"></i>
                                    </span>
                                    :
                                    <span className='show-password' onClick={()=> setShowPassword(true)}>
                                        <i className="fas fa-eye-slash"></i>
                                    </span>
                                }       
                            </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                            <label className="form-check-label" for="form2Example3">
                            I agree all statements in <a href="#!">KC of service</a>
                            </label>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                            <button  
                                type="button" 
                                data-mdb-button-init data-mdb-ripple-init 
                                className="button-29"
                                onClick={() => handleRegister()}
                                >Register</button>
                        </div>

                        </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                        <img src={avtSigup} className="avtSignup" alt=""/>

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}

export default Register