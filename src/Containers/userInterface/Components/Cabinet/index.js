import React, {useEffect, useState} from "react";
import {withRouter} from "react-router-dom";
import {Route, Link} from "react-router-dom";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as restaurantActions from "../../../../actions/restaurantActions"
import logo from "../../../../Assets/images/DECODE-RGB.png";
import {LinkContainer} from "react-router-bootstrap";
import '../../../../Assets/css/style.css'
import * as kitchenActions from "../../../../actions/kitchenActions";
import {Form, Input, Modal, PageHeader, Rate, Select} from "antd";
import {Card, Row, Col,Button} from "react-bootstrap/";
import Review from "../Review";
import * as reviewActions from "../../../../actions/reviewActions";


function Cabinet(props) {



    const [visible,setVisible] = useState(false)
    const [formdata, setFormData] = useState({
        userId: "",
        restaurantId: "",
        orderdate: "",
        guest: ""

    })

    function handleChange(value, title) {
        console.log(title)
        setFormData(prev => ({
            ...prev,
            [title.title]: value
        }))}

    const deleteItem = item => {
        props.reviewActions.deleteReview(item.id)
    }

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

    const children = [];

    const data = props.restaurant?.restaurants?.map((item) => {
        children.push(<div key={item.id} title="restaurantId">{item.name}</div>);
    })




    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurantsById(props.match.params.id);
        }
        fetchData();
    }, [props.restaurantActions])

    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurants();
        }
        fetchData();
    }, [props.restaurantActions])

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    const resto = props.restaurantId

    const [searchReq, setSearchReq] = useState("")
    const [search, setSearch] = useState({
        query: ``,
        page: 1
    })
    const [restoId, setRestoId] = useState({})

    const searchHandler = (e) => {
        setSearchReq(e.target.value)
        props.restaurantActions.getRestaurants({query: e.target.value, page: search.page})
    }


    const restaurants = props.restaurant?.restaurants?.map((item, i) => {
        return (
            <Col className="col-lg-6 col-md-6 col-sm-12 text-center">
                <Card >
                    <Card.Body>
                        <img className="card-img-top" variant="top" src={`http://localhost:5000/${item.image}`} />
                        <LinkContainer to={`/restaurants/${item.id}`}>
                            <h1>{item.name}</h1>
                        </LinkContainer>                        <Card.Title>{item.id}</Card.Title>
                        <Card.Title>{item.location}</Card.Title>
                        <Card.Title>{item.averageBill}</Card.Title>
                        <Card.Title>{item.phone}</Card.Title>
                        <Card.Title>{item.amountOfPlace}</Card.Title>
                        <Card.Title><Button onClick={() => setVisible(true)}>Оставить отзыв</Button></Card.Title>
                        <Rate disabled defaultValue={item.rate}/>
                    </Card.Body>
                </Card>
            </Col>
        )
    })


    const data2 = props.restaurantId?.Reviews?.map((item, i) => {
            return (
                <div key={i} >
                    <Card >
                        <Card.Body>

                            <Card.Title>"{item.text}"</Card.Title>
                        </Card.Body>
                    </Card>
                </div>

            )
        }
    )





    return (
        <div>

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


            <div className="container">
                <Input onChange={searchHandler} style={{marginTop: "130px"}} placeholder="Введите название ресторана" />
            </div>


            <div className="container">
                <Row>
                    {restaurants}
                </Row>
            </div>

            <Modal
                title="Basic Modal"
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
                        label="Название ресторана"
                        name="text"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название ресторана!',
                            },
                        ]}
                    >
                        <Input name="text"  onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Ресторан"
                        name="restaurantId"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста выберите ресторана!',
                            },
                        ]}
                    >
                        <Select
                            mode="single"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Выберите кухню"
                            title="restaurantId"
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}


const mapStateToProps = state => ({
    error: state.auth.error,
    isLoading: state.auth.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    restaurantId: state.restaurant.restaurantId
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    reviewActions: bindActionCreators(reviewActions, dispatch)

})

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Cabinet));


