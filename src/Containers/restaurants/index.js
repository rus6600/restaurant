import React, {useEffect, useState} from "react";
import logo from "../../Assets/images/DECODE-RGB.png";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Tag, Space, Card, Meta, Rate, Button, Modal, Form, Input, Select} from 'antd';
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom"
import * as restaurantActions from "../../actions/restaurantActions";
import * as kitchenActions from "../../actions/kitchenActions";
import * as favActions from "../../actions/favActions"
import {connect} from "react-redux";
import '../../Assets/css/style.css'
import ModalSignIn from "../../Components/Mainpage/modalSignIn";
import ModalCheck from "../../Components/Mainpage/modal";
import * as reviewActions from "../../actions/reviewActions";
import fav from "../../reducers/favReducer";





function ListRestaurants(props) {

    const { Meta } = Card;

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [visible,setVisible] = useState(false)
    const [favVisible, setFavVisible] = useState(false)

    const handleSignUp = () => setShowSignUp(!showSignUp);
    const handleSignIn = () => setShowSignIn(!showSignIn);


    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurants();
        }
        fetchData();
    }, [props.restaurantActions])

    useEffect( () => {
        async function fetchData() {
            await props.favActions.getFavorites(props.user.id);
        }
        fetchData();
    }, [props.favActions])


    console.log(props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}))

    const check = props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}).filter(item=> item === true).length > 0

    console.log(props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}).filter(item=> item === true).length > 0)

    if (check.length > 0) {
        console.log("Nigga!!!")
    }

    const [formdata, setFormData] = useState({
        text: "",
        restaurantId: ""
    })

    const [favorite, setFavorite] = useState({
        userId: 4,
        restaurantId: 79
    })


    const favHandler = (item) => {
        setFavVisible(true)
        setFavorite(prev => ({
            ...prev,
            restaurantId: item.id,
            userId: props.user.id
        }))
    }

    const favOkHandler = () => {
        setFavVisible(false)
        props.favActions.addFavorite(favorite)

    }


    const reviewHandler = (item) => {
        setVisible(true)
        console.log(item.id)
        setFormData(prev => ({
            ...prev,
            restaurantId: item.id
        }))}

    const onChange = e => {
        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const okHandler = () => {
        setVisible(false)
        console.log(formdata)
        props.reviewActions.addReview(formdata);

    }





    const columns = [
        {
            dataIndex: 'image',
            key: 'image',
            render: image =>
                <Card
                        hoverable
                        style={{width: 480 }}
                        cover={<img alt="example" src={`http://localhost:5000/${image}`} />}
                    >
            </Card>,
        },
        {
            dataIndex: 'item',
            key: 'item',
            render: item =>
                <Card title={item.name} bordered={false}>
                    <p>Адрес : {item.location}</p>
                    <p>Телефон : {item.phone}</p>
                    <p>Средний чек : {item.averageBill}</p>
                    <p>Количество мест : {item.amountOfPlace}</p>

                    <p> {props.isAuth ?
                        <div>

                        <Button className={props.isAuth ? "btn" : "none"} onClick={() => reviewHandler(item)}>Добавить отзыв</Button>

                            {

                                props.favorites?.map((favitem,i) => {return (favitem.Restaurant.name).includes(item.name)}).filter(item=> item === true).length > 0 ?

                                    <Button className="btn">Вы добавили в избранные</Button>

                                    :

                                    <Button className={props.isAuth ? "btn" : "none"} onClick={() => favHandler(item)}>Добавить в избранные</Button>

                            }





                        </div>
                        :
                        <Button className={props.isAuth ? "btn" : "none"} onClick={() => handleSignUp()}>Войдите в систему</Button>
                    }
                    </p>
                    <Rate disabled defaultValue={item.rate}/>
                </Card>
        },

    ];

    const data = props.restaurant?.restaurants?.map((item, i) => {
        return {
            key:i,
            image:item.image,
            name: item.name,
            id: item.id,
            location: item.location,
            averageBill: item.averageBill,
            phone: item.phone,
            amountOfPlace: item.amountOfPlace,
            rate: item.rate,
            item:item
        }
    })









    return (
        <div>
            <ModalCheck showSignUp={showSignUp} handleSignUp={handleSignUp} handleSignIn={handleSignIn} setShowSignIn={setShowSignIn} setShowSignUp={setShowSignUp}/>
            <ModalSignIn showSignIn={showSignIn} handleSignIn={handleSignIn}/>
            <div>
                <header className="top-navbar">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container">
                            <a className="navbar-brand" href="index.html">
                                <img  src={logo} alt="" />
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars-rs-food" aria-controls="navbars-rs-food" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbars-rs-food">
                                <ul className="navbar-nav ml-auto">

                                    <LinkContainer to="/">
                                        <li className="nav-item active"><a className="nav-link">На главную</a></li>
                                    </LinkContainer>

                                    <LinkContainer to="/cabinet/reviews">
                                        <li className="nav-item active"><a className="nav-link">Отзывы</a></li>
                                    </LinkContainer>

                                    <li>


                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <div className="container" style={{paddingTop: "120px"}}>

                <Table columns={columns} dataSource={data} />

            </div>

            <Modal
                title="Отзыв"
                visible={visible}
                onOk={okHandler}
                onCancel={() => setVisible(false)}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Отзыв о ресторане"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Довить ваш отзыв о ресторане!',
                            },
                        ]}
                    >
                        <Input name="text"  onChange={onChange} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                visible={favVisible}
                onOk={favOkHandler}
                onCancel={() => setFavVisible(false)}
            >
                <h2>Добавить ресторан в избранные ?</h2>

            </Modal>

        </div>
    )
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    isAuth: state.auth.isAuth,
    favorites: state.fav.favorites,
    user: state.auth.user

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    reviewActions: bindActionCreators(reviewActions, dispatch),
    favActions: bindActionCreators(favActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ListRestaurants));
