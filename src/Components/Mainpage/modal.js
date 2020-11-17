import React, {useState} from "react";
import {Modal, Button, InputGroup, FormControl} from 'react-bootstrap'
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as authActions from "../../actions/authActions"
import {Link} from "react-router-dom"
import modalSignIn from "./modalSignIn";


function ModalCheck(props) {

    const {handleSignUp, setShowSignUp, showSignUp, } = props

    const [showSignIn, setShowSignIn] = useState(false);

    const [signInForm, setSignInForm] = useState({
        email: "",
        password: ""
    })

    const [signUpForm, setSigUpForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onSignInHandler = () => {
        setShowSignUp(false)
        setShowSignIn(true)
    }

    const [history, setHistory] = useState({})

    function historyData(props) {
        setHistory(props.history)
        console.log(history)
    }


    const signUpInputHandler = (e) => {
        const {name, value} = e.target;
        setSigUpForm(prev => ({
            ...prev,
            [name]: value
        }))
    }



    const signInInputHandler = (e) => {
        const {name, value} = e.target;
        setSignInForm(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const submitSignUpForm = () => {
        props.authActions.signUp(signUpForm);

    };

    const submitSignInForm = () => {
        props.authActions.signIn(signInForm, history);
        setShowSignIn(false)
    };



    return (

<div>
        <Modal
            show={showSignUp}
            style={{width: "100%"}}
        >

        <Modal.Dialog  style={{margin: "0px"}} >
            <Modal.Header closeButton>
                <Modal.Title>Регистрация</Modal.Title>
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
                        onChange={signUpInputHandler}
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
                        onChange={signUpInputHandler}                    />
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
                        onChange={signUpInputHandler}
                     />
                </InputGroup>


                {/*<Input placeholder="введите имя" title="name" type="text" onChange={inputHandler}/>*/}
                {/*<Input placeholder="введите email"title="email" type="text" onChange={inputHandler}/>*/}
                {/*<Input placeholder="введите password"title="password" type="password" onChange={inputHandler}/>*/}


            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" size="sm" onClick={() => onSignInHandler()}>Уже зарегистрированы?</Button>
                <Button variant="secondary" onClick={() => handleSignUp()}>Закрыть</Button>
                <Button variant="primary" onClick={() => submitSignUpForm()}>Регистрация</Button>
            </Modal.Footer>
        </Modal.Dialog>


        </Modal>
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
                        <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        name="email"
                        type="email"
                        required="required"
                        placeholder="введите ваш email"
                        aria-label="email"
                        aria-describedby="basic-addon1"
                        onChange={signInInputHandler}                    />
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
                        onChange={signInInputHandler}
                    />
                </InputGroup>


                {/*<Input placeholder="введите имя" title="name" type="text" onChange={inputHandler}/>*/}
                {/*<Input placeholder="введите email"title="email" type="text" onChange={inputHandler}/>*/}
                {/*<Input placeholder="введите password"title="password" type="password" onChange={inputHandler}/>*/}


            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowSignIn(false)}>Закрыть</Button>
                <Button variant="primary" onClick={() => submitSignInForm()}>Войти</Button>
            </Modal.Footer>
        </Modal.Dialog>


    </Modal>
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


export default connect(mapStateToProps, mapDispatchToProps) (ModalCheck);