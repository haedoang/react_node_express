import React from 'react';
import axios from 'axios';
import ApiUrls from '../../utils/api_urls';

import { Input, Button, message } from 'antd';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            idInput: null
        };
    }

    async doLogin() {
        let name = this.state.idInput;
        let params = { name };
        let res = await axios.post(ApiUrls.USER_LOGIN, params);

        if (res.data.success) {            
            window.location.reload();
        } else {
            message.error('등록되지 않은 사용자입니다');
        }
    }

    onKeyUp(e) {
        if (e.keyCode === 13) this.doLogin();
    }

    render() {
        return (
            <div className="login-container">
                <div className="jumbotron">
                    ZiSync
                </div>
                <div className="login-form">
                    <div className="id-container">
                        <Input
                            onChange={(e) => {this.setState({ idInput: e.target.value })}}
                            type="text"
                            onKeyUp={this.onKeyUp.bind(this)}
                        />
                    </div>
                    <Button
                        onClick={this.doLogin.bind(this)}>
                        로그인
                    </Button>
                </div>
            </div>
        );
    }
}

export default LoginPage;
