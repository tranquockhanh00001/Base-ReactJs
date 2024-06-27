import React from "react";

class UserInfor extends React.Component {

    state = {
        name : 'Khanh',
        address : 'Hai Duong',
        age : 22
    }


    handleOnChangeInput = (event) =>{
        this.setState({
            name : event.target.value
        })
          
    }

    handleOnChangeAge = (event) =>{
        this.setState({
            age : event.target.value
        })
           
    }

    handleOnSubmit = (event) =>{
       
        event.preventDefault();
        console.log(this.state);
        
    }
    
    render(){
        return (
            <div>
                My name is {this.state.name} and I'm {this.state.age}
               
                <form onSubmit ={this.handleOnSubmit}>
                <label>Your Name</label>
                    <input 
                    value ={this.state.name}
                    type="text" 
                    onChange={this.handleOnChangeInput} 
                    
                    />
                <label>Your Name</label>
                    <input 
                    value ={this.state.age}
                    type="text" 
                    onChange={this.handleOnChangeAge} 
                    
                    />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default UserInfor;