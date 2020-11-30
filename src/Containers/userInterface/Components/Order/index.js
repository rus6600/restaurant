import React, {useEffect, useState} from "react";
import {Form, Input, Select, Modal, Upload, message, Table} from "antd";
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

    useEffect( () => {
        async function fetchData() {
            await props.orderActions.getOrder();
        }
        fetchData();
    }, [props.orderActions])


    const onChange = e => {
        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const okHandler = () => {
        setVisible(false)
        props.orderActions.addOrder(formdata);

    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <h4>{text}</h4>,
        },
        {
            title: 'ORDER DATE',
            dataIndex: 'orderdate',
            key: 'orderdate',
            render: text => <h4>{text}</h4>,
        },
        {
            title: 'GUEST',
            dataIndex: 'guest',
            key: 'guest',
            render: text => <h4>{text}</h4>,
        },
        {
            title: 'NAME',
            dataIndex: 'name',
            key: 'name',
            render: text => <h4>{text}</h4>,
        },

    ]

    const orders = props.order?.map((item, i)   => {
        return {
            key:i,
            id: item.id,
            orderdate: item.orderdate,
            guest: item.guest,
            name: item.Restaurant.name,
        }
    })



    return (
        <div>
        <Button onClick={() => setVisible(true)} style={{display: "block", marginBottom: 10}}>Add order</Button>

    <div>
            <Table columns={columns} dataSource={orders} />
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
