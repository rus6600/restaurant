import React, {useState} from "react";
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../actions/authActions"
import {Link} from "react-router-dom"

function SignUp(props) {

// const [visible, setVisible] = useState(false)
    const {visible, setVisible} = props


    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };



    const onFinish = (values) => {
        console.log('Success:', values);
        props.authActions.signUp(values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const handleModal = () => {
        setVisible(!visible)
    };







    return (
        <div style={{display: "flex", textAlign: "center", margin: "0", padding: "50px", justifyContent: "center"}}>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Link to={'/signin'}>Already have an account</Link>
                    </Form.Item>
                </Form>

        </div>
    )
}

const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (SignUp);