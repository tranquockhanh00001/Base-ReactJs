import videohomepage from '../../assets/video-homepage.mp4'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const HomePage = (props) =>{
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    
    const handleStart = () =>{
        navigate('/login')
    }

    const handleDoing = () =>[
        navigate('/users')
    ]
    return(
        <div className="homepage-container">
            <video width="750" height="500" autoPlay muted loop>
                <source 
                    src = { videohomepage }
                    type = "video/mp4"
                />
            </video>
            <div className='homepage-content'>
                <div className='title-1'>Make forms
                worth filling out</div>
                <div className='title-2'>Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different.</div>
                {isAuthenticated === false ?
                    <div>
                        <button className='button-29' onClick={() => handleStart()}>Get Started - it's free</button>
                    </div>
                    :
                    <div>
                        <button className='button-29' onClick={() => handleDoing()}>Doing Quizz Now</button>
                    </div>

                }
                
            </div>
        </div>
    )
}

export default HomePage