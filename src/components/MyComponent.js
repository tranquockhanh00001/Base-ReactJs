// class component
// funtion component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {


    //JSX
    render(){
        const myInfor = ['abc' , 'c', 'd']
        

        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <DisplayInfor name="Khanh dep trai" age = "30"/>
                <hr/>
                <DisplayInfor name="Kien ngu" age = "26" myInfor = {myInfor}/>

            </div>
        );
    }
}

export default MyComponent;