import React, {useEffect, useState} from "react";
import logo from "../../Assets/images/DECODE-RGB.png";
import {LinkContainer} from "react-router-bootstrap";
import {Table, Tag, Space, Card, Meta, Rate, Button, Modal, Form, Input, Select, DatePicker, Alert, notification } from 'antd';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
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
import Order from "../userInterface/Components/Order";
import * as orderActions from "../../actions/orderActions";





function ListRestaurants(props) {

    const { Meta } = Card;

    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);
    const [visible,setVisible] = useState(false)
    const [orderVisible, setOrderVisible] = useState(false)
    const [favVisible, setFavVisible] = useState(false)
    const [btnAdded, setBtnAdded] = useState(false)
    const [searchReq, setSearchReq] = useState("")
    const [search, setSearch] = useState({
        query: ``,
        page: 1
    })
    const [orderdata, setOrderData] = useState({
        usedId: props.user.id,
        restaurantId: "",
        orderdate: "",
        guest: ""
    })


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

    useEffect( () => {
        async function fetchData() {
            await props.orderActions.getOrder();
        }
        fetchData();
    }, [props.orderActions])


    // console.log(props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}))
    //
    // const check = props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}).filter(item=> item === true).length > 0
    //
    // console.log(props.favorites?.map((item,i) => {return (item.Restaurant.name).includes("МЯТА FOOD")}).filter(item=> item === true).length > 0)
    //
    // if (check.length > 0) {
    //     console.log("Nigga!!!")
    // }

    const [formdata, setFormData] = useState({
        text: "",
        restaurantId: ""
    })

    const [favorite, setFavorite] = useState({
        userId: 4,
        restaurantId: 79
    })


    const searchHandler = (e) => {
        setSearchReq(e.target.value)
        props.restaurantActions.getRestaurants({query: e.target.value, page: search.page})
    }


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
        setBtnAdded(true)
        props.favActions.addFavorite(favorite)

    }

    const orderAdd = (item) => {
        setOrderVisible(true)
        setOrderData(prev => ({
            ...prev,
            restaurantId: item.id
        }))
    }

    const orderHandler = () => {
        setOrderVisible(false)
        openOrderNotification()
        props.orderActions.addOrder(orderdata);

    }

    const openOrderNotification = () => {
        notification.open({
            message: 'Спасибо',
            description:
                `Ваш заказ на ${orderdata.orderdate} успешно добавлен`,
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };

    function orderHandleChange(value, title) {
        console.log(title)
        setOrderData(prev => ({
            ...prev,
            [title.title]: value
        }))}


    const orderHandleChangeResto = (e,dateString) => {
        const {value, name} = e.target;
        setOrderData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    function onChangeDate(date, dateString) {
        setOrderData(prev => ({
            ...prev,
            orderdate : dateString
        }))    }



    const restaurantsSelect = [];


    const orderDateIndex = props.restaurant?.restaurants?.map((item) => {
        restaurantsSelect.push(<div key={item.id} title="restaurantId">{item.name}</div>);
    })

    const reviewHandler = (item) => {
        setVisible(true)
        console.log(item.id)
        setFormData(prev => ({
            ...prev,
            restaurantId: item.id
        }))}

    const openReviewNotification = () => {
        notification.open({
            message: 'Спасибо',
            description:
                "Ваш отзыв добавлен",
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };


    const onChange = e => {
        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const okHandler = () => {
        setVisible(false)
        openReviewNotification()
        console.log(formdata)
        props.reviewActions.addReview(formdata);

    }



    const columns = [
        {
            dataIndex: 'image',
            key: 'image',
            render: image =>
                <Card
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
                    <LinkContainer to={`/restaurants/${item.id}`}>
                        <Button type="primary">На страницу ресторана</Button>
                    </LinkContainer>
                    <p> {props.isAuth ?
                        <div>

                        <Button className={props.isAuth ? "btn" : "none"} type="primary" onClick={() => reviewHandler(item)}>Добавить отзыв</Button>
                        <Button className={props.isAuth ? "btn" : "none"} type="primary" onClick={() => orderAdd(item)}>Добавить заказ</Button>

                            {

                                props.favorites?.map((favitem,i) => {return (favitem.Restaurant.name).includes(item.name)}).filter(item=> item === true).length > 0 ?

                                    <Switch defaultChecked={true} disabled={true} checkedChildren="added" unCheckedChildren="add fav"/>

                                    :

                                    <Switch checkedChildren="added" unCheckedChildren="add fav" onChange={() => favHandler(item)}/>

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
                            <LinkContainer to="/">
                                <a className="navbar-brand" href="index.html">
                                    <img  src={logo} alt="" />
                                </a>
                            </LinkContainer>
                            <div>
                            <Input className="nav-input" onChange={searchHandler} placeholder="Введите название ресторана" />
                            </div>
                            <div className="collapse navbar-collapse" id="navbars-rs-food">
                                <ul className="navbar-nav ml-auto">
                                    <LinkContainer to="/">
                                        <li className="nav-item active"><a className="nav-link">На главную</a></li>
                                    </LinkContainer>

                                    {/*<LinkContainer to="/cabinet/reviews">*/}
                                    {/*    <li className="nav-item active"><a className="nav-link">Отзывы</a></li>*/}
                                    {/*</LinkContainer>*/}

                                </ul>
                                <div className="input-wrapper">
                                </div>
                            </div>
                        </div>

                    </nav>

                </header>


            </div>


            <div className="container" style={{paddingTop: "120px"}}>

                <Table columns={columns} dataSource={data} />

            </div>

            <Modal
                title="Добавьте ваш отзыв"
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

            <Modal
                title="Добавить бронь"
                visible={orderVisible}
                onOk={orderHandler}
                onCancel={() => setOrderVisible(false)}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Количество гостей"
                        name="guest"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название ресторана!',
                            },
                        ]}
                    >
                        <Input name="guest"  onChange={orderHandleChangeResto} />
                    </Form.Item>
                    <Form.Item
                        label="Бронь на дату"
                        name="orderdate"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название ресторана!',
                            },
                        ]}
                    >
                        <DatePicker onChange={onChangeDate} />
                    </Form.Item>
                </Form>
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
    favActions: bindActionCreators(favActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),


})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(ListRestaurants));
