import React, {useEffect, useState} from "react";
import { Form, Input, Select, Modal, Upload, message} from "antd";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as restaurantActions from "../../../../actions/restaurantActions";
import * as kitchenActions from "../../../../actions/kitchenActions";
import * as reviewActions from "../../../../actions/reviewActions"
import Card from 'react-bootstrap/Card'
import {Col} from "react-bootstrap"
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'



function Review(props) {

const { Meta } = Card;
const [visible,setVisible] = useState(false)
const [restaurantId, setRestaurantId] = useState(null)
const { Option } = Select;
const [formdata, setFormData] = useState({
    userId: "",
    restaurantId: "",
    orderdate: "",
    guest: ""

})

useEffect( () => {
    async function fetchData() {
        await props.reviewActions.getReview();
    }
    fetchData();
}, [props.reviewActions])


useEffect( () => {
    async function fetchData() {
        await props.restaurantActions.getRestaurants();
    }
    fetchData();
}, [props.restaurantActions])

const children = [];

const data = props.restaurant?.restaurants?.map((item) => {
    children.push(<Option key={item.id} title="restaurantId">{item.name}</Option>);
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



    const reviews = props.review?.reviews?.map((item, i)   => {
    return (

            <Col className="col-lg-6 col-md-6 col-sm-12 text-center">
                <Card key={i}>
                <Card.Body>
                    <Card.Title>"{item.text}"</Card.Title>
                    <Card.Text>
                        {Date(item.createdAt).slice(0,10)}
                    </Card.Text>
                    <Card.Text>
                        {item.restaurantId}
                    </Card.Text>
                    <Card.Text>
                        {item.userId}
                    </Card.Text>

                </Card.Body>
                <Card.Footer>
                    <Button onClick={() => setVisible(true)} style={{marginTop: 10}}>Добавить</Button>
                    <Button onClick={() => deleteItem(item)} style={{marginTop: 10}}>Удалить</Button>
                </Card.Footer>
                </Card>
            </Col>
    )
})

return (
    <div>
                {reviews}

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
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
    review: state.review,
    role: state.auth.role

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch),
    reviewActions: bindActionCreators(reviewActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Review);
