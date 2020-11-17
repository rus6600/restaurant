import React, {useEffect, useState} from "react";
import {Card, Row, Col, Button, Input,Pagination } from 'antd';
import {Route, Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions"
import ModalResto from "./modal";
import EditModalResto from "./editModal";
import showRestaurant from "./showRestaurant";



function Restaurant(props) {


const { Meta } = Card;




const [modalVisible, setModalVisible] = useState(false)
const [editModalVisible, setEditModalVisible] = useState(false)

const [searchReq, setSearchReq] = useState("")
const [search, setSearch] = useState({
    query: ``,
    page: 1
})
const [editItemForm, setEditForm] = useState({})

const modalVisibleHandler = () => setModalVisible(!modalVisible)

const editModalVisibleHandler = (value) => {
    setEditModalVisible(true)
    setEditForm(value)
    console.log(value)
}


const searchHandler = (e) => {
setSearchReq(e.target.value)
props.restaurantActions.getRestaurants({query: e.target.value, page: search.page})
}

useEffect( () => {
    async function fetchData() {
        await props.restaurantActions.getRestaurants();
    }
    fetchData();
}, [props.restaurantActions])



const onChangePage = e => {
    setSearch(prev => ({
        ...prev,
        page: e
    }))
    props.restaurantActions.getRestaurants({query: search.query, page: e})
}

const deleteItem = item => {
    props.restaurantActions.deleteRestaurant(item.id)
}

const data = props.restaurant?.restaurants?.map((item, i) => {
        return (
            <Col span={6}>
                <Card
                    hoverable
                    style={{ width: 240, margin: 20 }}
                    cover={<img alt="example" src={`http://localhost:5000/${item.image}`} />}

                >
                    <Meta title={item.name}/>
                    <Meta title={item.location}/>
                    <Meta title={item.averageBill}/>
                    <Meta title={item.phone}/>
                    <Link to={`/dashboard/restaurants/${item.id}`}><Button>Показать</Button></Link>
                    <Button onClick={() => deleteItem(item)} style={{marginTop: 10}}>Удалить</Button>
                    <Button onClick={() => {editModalVisibleHandler(item);}}>Редактировать</Button>
                </Card>

            </Col>
        )
    }
)



return (
        <div>
            <Button type="primary" style={{display: "block", marginBottom: 10}} onClick={modalVisibleHandler}>Добавить ресторан</Button>
            <Input onChange={searchHandler} style={{marginBottom: 20}} placeholder="Введите название ресторана" />
                    <Row gutter={20}>
                        {data}
                    </Row>
            <Pagination onChange={onChangePage} current={search.page} pageSize={2} total={Number(props.restaurant?.total)}/>
                <ModalResto visible={modalVisible} setVisible={setModalVisible}/>
                <EditModalResto
                    idItem={editItemForm}
                    visible={editModalVisible}
                    setVisible={setEditModalVisible}
                    />


        </div>
    )
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurant: state.restaurant.restaurant,
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Restaurant));