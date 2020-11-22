import React, {useEffect, useState} from "react";
import {Card, Row, Col, Button, Input, Pagination, Space, Table} from 'antd';
import {Route, Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions"
import ModalResto from "./modal";
import EditModalResto from "./editModal";



function Restaurant(props) {


    const { Meta } = Card;




    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)

    const [searchReq, setSearchReq] = useState("")
    const [search, setSearch] = useState({
        query: ``,
        page: 1
    })
    const [restoId, setRestoId] = useState({})

    const modalVisibleHandler = () => setModalVisible(!modalVisible)

    const editModalVisibleHandler = (record) => {
        setRestoId(record.id)
        setEditModalVisible(true)
        console.log(restoId)

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

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: text => <h4>{text}</h4>,
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            render: id => <span>{id}</span>,
        },
        {
            title: 'LOCATION',
            dataIndex: "location",
            key: 'location',
            render: location => <span>{location}</span>,
        },
        {
            title: 'AVERAGEBILL',
            dataIndex: "averageBill",
            key: 'averageBill',
            render: averageBill => <span>{averageBill}</span>,
        },
        {
            title: 'PHONE',
            dataIndex: "phone",
            key: 'phone',
            render: phone => <span>{phone}</span>,
        },
        {
            title: 'AMOUNTOFPLACE',
            dataIndex: "amountOfPlace",
            key: 'amountOfPlace',
            render: amountOfPlace => <span>{amountOfPlace}</span>,
        },
        {
            title: 'RATE',
            dataIndex: "rate",
            key: 'rate',
            render: rate => <span>{rate}</span>,
        },
        {
            title: 'Действие',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button onClick={() => {editModalVisibleHandler(record);}}>Редактировать</Button>
                    <Button onClick={() => deleteItem(record)}>Удалить</Button>
                </Space>
            ),
        },
    ];

    const data = props.restaurant?.restaurants?.map((item, i) => {
        return {
            key:i,
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
            <Button type="primary" style={{display: "block", marginBottom: 10}} onClick={modalVisibleHandler}>Добавить ресторан</Button>
            <Input onChange={searchHandler} style={{marginBottom: 20}} placeholder="Введите название ресторана" />
            <Table columns={columns} dataSource={data} />

            {/*<Pagination onChange={onChangePage} current={search.page} pageSize={2} total={Number(props.restaurant?.total)}/>*/}
            <ModalResto visible={modalVisible} setVisible={setModalVisible}/>
            <EditModalResto
                restoId={restoId}
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