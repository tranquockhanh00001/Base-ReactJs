import videohomepage from '../../assets/video-homepage.mp4'

const HomePage = (props) =>{
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
                <div>
                    <button className='homepage-button' >Get Started - it's free</button>
                </div>
            </div>
        </div>
    )
}

export default HomePage