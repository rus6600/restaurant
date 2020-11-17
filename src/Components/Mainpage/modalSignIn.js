import React, {useState} from "react";
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../actions/authActions"
import {Link} from "react-router-dom"

function ModalSignIn(props) {

    const {showSignIn, handleClose, handleShow} = props

    const [userParams, setUserParams] = useState({
        name: "",
        email: "",
        password: ""
    })

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setUserParams(prev => ({
            ...prev,
            [name]: value
        }))
        console.log(userParams)
    }


    const submitSignUpForm = () => {
        console.log('Success:', userParams);
        props.authActions.signUp(userParams);
    };

    const submitSignInForm = (values) => {
        console.log('Success:', values);
        props.authActions.signIn(values, props.history);
    };

    return (

        <Modal
            show={showSignIn}
            style={{width: "100%"}}
        >

            <Modal.Dialog  style={{margin: "0px"}} >
                <Modal.Header closeButton>
                    <Modal.Title>Авторизация</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Имя</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="name"
                            type="text"
                            required="true"
                            placeholder="введите ваше имя"
                            aria-label="name"
                            aria-describedby="basic-addon1"
                            onChange={inputHandler}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="email"
                            type="email"
                            required="required"
                            placeholder="введите ваш email"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                            onChange={inputHandler}                    />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Пароль</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            name="password"
                            type="password"
                            required="true"
                            placeholder="введите ваш пароль"
                            aria-label="password"
                            aria-describedby="basic-addon1"
                            onChange={inputHandler}
                        />
                    </InputGroup>


                    {/*<Input placeholder="введите имя" title="name" type="text" onChange={inputHandler}/>*/}
                    {/*<Input placeholder="введите email"title="email" type="text" onChange={inputHandler}/>*/}
                    {/*<Input placeholder="введите password"title="password" type="password" onChange={inputHandler}/>*/}


                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => handleClose()}>Close</Button>
                    <Button variant="primary" onClick={() => submitSignInForm()}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        </Modal>
    )

}

const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading
})

const mapDispatchToProps = dispatch => ({
    authActions: bindActionCreators(authActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (ModalSignIn);