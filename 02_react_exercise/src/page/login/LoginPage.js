import React from 'react';
import axios from 'axios';


class LoginPage extends React.Component {   
    state = {
        id : "",
        password : ""
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    submitHandler = (e) => {
        e.preventDefault();
        
        axios.post('/api/user/login',{
            id : this.state.id,
            password : this.state.password
        }
        // ,
        // {
        //     headers: {
        //         'Content-Type': 'application/json'
        //       }
        // }
        ).then(function(res){
            console.log(res)
        })


        // axios.get('/api/user/login',{
        //     params : {
        //         id : this.state.id,
        //         password : this.state.password
        //     }
        // }
        // ).then(function(res){
        //     console.log(res)
        // })

    }

    render(){
        return(
            <>
          <form onSubmit={this.submitHandler}>
            id : <input type="text" name="id" onChange = {this.changeHandler}/> <br/>
            pw : <input type="password" name="password" onChange = {this.changeHandler}/> <br/>
            <button type="submit">login</button>
          </form>
          {/* <div>
              {this.state.id}
              {this.state.password} 
          </div> */}
          </>
        )
    }


}
export default LoginPage;