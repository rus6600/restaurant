import React, {useEffect, useState} from "react";
import { Form, Input, Select, Modal, Upload, message} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as restaurantActions from "../../../../actions/restaurantActions";
import * as kitchenActions from "../../../../actions/kitchenActions";
import * as reviewActions from "../../../../actions/reviewActions"
import * as orderActions from "../../../../actions/orderActions"
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'



function Order(props) {

    const { Meta } = Card;
    const [visible,setVisible] = useState(false)
    const [restaurantId, setRestaurantId] = useState(null)
    const { Option } = Select;
    const [formdata, setFormData] = useState({
        usedId: props.user.id,
        restaurantId: "",
        orderdate: Date(Date.UTC()),
        guest: ""
    })

    useEffect( () => {
        async function fetchData() {
            await props.orderActions.getOrder();
        }
        fetchData();
    }, [props.orderActions])


    useEffect( () => {
        async function fetchData() {
            await props.restaurantActions.getRestaurants();
        }
        fetchData();
    }, [props.restaurantActions])

    const restaurantsSelect = [];

    const data = props.restaurant?.restaurants?.map((item) => {
        restaurantsSelect.push(<Option key={item.id} title="restaurantId">{item.name}</Option>);
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

    console.log(props.order)
    console.log(props.restaurant)

    const okHandler = () => {
        setVisible(false)
        console.log(formdata)
        props.orderActions.addOrder(formdata);

    }


    const orders = props.order?.order?.map((item, i)   => {
        console.log(item)

        return (
            <Card key={i}>
                <Card.Body>
                    <Card.Title>"{item.id}"</Card.Title>
                    <Card.Text>
                        {Date(item.orderdate).slice(0,10)}
                    </Card.Text>
                    <Card.Text>
                        {item.guest}
                    </Card.Text>
                    <Card.Text>
                        {item.orderdate}
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setVisible(true)} style={{marginTop: 10}}>Добавить</Button>
                </Card.Footer>
            </Card>
        )
    })

    return (
        <div>
            {orders}

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
                        label="Количество гостей"
                        name="guest"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название ресторана!',
                            },
                        ]}
                    >
                        <Input name="guest"  onChange={onChange} />
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
                            {restaurantsSelect}
                        </Select>
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
    review: state.review,
    order: state.order.order,
    role: state.auth.role,
    user: state.auth.user

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    reviewActions: bindActionCreators(reviewActions, dispatch),
    orderActions: bindActionCreators(orderActions, dispatch),
})


export default connect(mapStateToProps, mapDispatchToProps) (Order);
