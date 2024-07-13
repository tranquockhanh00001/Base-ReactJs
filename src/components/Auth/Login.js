import './Login.scss'
import avtLogin from '../../assets/draw2.webp'
import { useState } from 'react'
import { postLogin } from '../../services/apiService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = (props) =>{

    const [email, setEmail] = useState("");
    const [password, setPassWord] = useState("");
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    const handleLogin = async() =>{

        const isValidEmail = validateEmail(email)
        if(!isValidEmail){
            toast.error('Email invalidate ')
            
            return;
        }

        if(!password){
            toast.error('Password is required ')
            return;
        }
        //submit api
        let res = await postLogin(email, password);
        if(res.data && +res.data.EC === 0){
            toast.success(res.data.EM)
            navigate('/')
        }else{
            toast.error(res.data.EM)
        }
    }
        return(
        <section className="vh-100">
        <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
                
                <img src={avtLogin} className='img-fluid' alt='' />
                 
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-facebook-f"></i>
                    </button>

                    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-twitter"></i>
                    </button>

                    <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-floating mx-1">
                    <i className="fab fa-linkedin-in"></i>
                    </button>
                </div>

                <div className="divider d-flex align-items-center my-4">
                    <p className="text-center fw-bold mx-3 mb-0">Or</p>
                </div>

                
                <div data-mdb-input-init className="form-outline mb-4">
                    <label className="form-label" for="form3Example3">Email address</label>
                    <input 
                        type="email" 
                        id="form3Example3" 
                        className="form-control form-control-lg"
                        placeholder="Enter a valid email address"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    
                </div>

               
                <div data-mdb-input-init className="form-outline mb-3">
                    <label className="form-label" for="form3Example4">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 

                        id="form3Example4" 
                        className="form-control form-control-lg"
                        placeholder="Enter password" 
                        value={password}
                        onChange={(event) => setPassWord(event.target.value)}
                    />
                    {showPassword ?
                    <span className='show-password' onClick={() => setShowPassword(false)}>
                        <i className="fa fa-eye"></i>
                    </span>
                    :
                    <span className='show-password' onClick={() => setShowPassword(true)}>
                        <i className="fa fa-eye-slash"></i>
                    </span>
                    }   
                    
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    
                    <div className="form-check mb-0">
                    <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label className="form-check-label" for="form2Example3">
                        Remember me
                    </label>
                    </div>
                    <a href="#!" className="text-body">Forgot password?</a>
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                    <button  
                        type="button" 
                        ata-mdb-button-init data-mdb-ripple-init 
                        className="button-29 btn btn-primary btn-lg"
                        onClick={() => handleLogin()}
                    >
                        Login to KC
                        </button>
                    <p className="small fw-bold mt-4 pt-1 mb-0">Don't have an account? 
                        <a href='/register' className="link-danger">Register</a></p>
                </div>

                </form>
            </div>
            </div>
        </div>
        <div
            className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          
            <div className="text-white mb-3 mb-md-0">
                KC Typeform
            </div>
            
            <div>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="text-white me-4">
                <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="text-white">
                <i className="fab fa-linkedin-in"></i>
            </a>
            </div>
           
        </div>
    </section>
    )
}

export default Login;