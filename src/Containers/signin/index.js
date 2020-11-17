import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../actions/authActions"
import {Link} from "react-router-dom"

function Signin(props) {

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

    console.log(props.history)
    const onFinish = (values) => {
        console.log('Success:', values);
        props.authActions.signIn(values, props.history);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh"}}>
            <Form style={{backgroundColor: "#FFF", justifyContent: "center",alignItems: "center", padding: "20px", margin: "auto"}}
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >

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
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
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


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Signin));

