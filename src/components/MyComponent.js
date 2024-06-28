// class component
// funtion component

import React from "react";
import UserInfor from "./UserInfor";
import DisplayInfor from "./DisplayInfor";

// eslint-disable-next-line no-unused-vars
class MyComponent extends React.Component {

    state = {
            listUsers : [
                {id: 1, name: 'Nguyen Van A', age: 20},
                {id: 2, name: 'Nguyen Van B', age: 23},
                {id: 3, name: 'Nguyen Van C', age: 26},
            ]
        }

    //JSX
    render(){

        return (
            <div>
                <UserInfor></UserInfor>
                <br></br>
                <DisplayInfor listUsers = {this.state.listUsers}/>
                

            </div>
        );
    }
}

export default MyComponent;