import React, {useEffect, useState} from "react";
import {Card, Row, Col, Button, Input, Pagination, Space, Table, Modal, Form, Select, Upload, message} from 'antd';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {Route, Link} from "react-router-dom"
import {withRouter} from "react-router-dom"
import {bindActionCreators} from "redux";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";
import * as restaurantActions from "../../actions/restaurantActions"
import ModalResto from "./modal";
import EditModalResto from "./editModal";
import {LinkContainer} from "react-router-bootstrap";



function Restaurant(props) {


    const { Meta } = Card;



    const {restoIdData} = props

    const { Option } = Select;
    const [imageUrl, setImageUrl] = useState(``)
    const [image, setImage] = useState(``)
    const [loading, setLoading] = useState(false)
    const [kitchens, setKitchens] = useState([])
    const [formdata, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        location: "",
        amountOfPlace: "",
        image: "",
        averageBill: "",
        kitchens: [],
        rate: ""
    })

    const [restoDataId, setRestoDataId] = useState({
    })



    const  getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }



    useEffect( () => {

        setFormData(props.idItem)

    }, [props.idItem])


    const children = [];

    const data2 = props.kitchens.map((item, i) => {
        children.push(<Option key={i}>{item.name}</Option>);
    })

    function handleChange(value) {
        setKitchens(value)
    }

    const handleUploadChange = info => {
        console.log(info)
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>{
                    setLoading(false)
                    setImageUrl(imageUrl)
                    setImage(info.file.originFileObj)

                }
            );
        }
    };


    const okHandler = () => {
        setModalVisible(false)
        props.restaurantActions.editRestaurant({...formdata, image, kitchens, id});

    }



    const onChange = e => {

        const {value, name} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };


    const [modalVisible, setModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)

    const [searchReq, setSearchReq] = useState("")
    const [search, setSearch] = useState({
        query: ``,
        page: 1
    })

    const [restoId, setRestoId] = useState({})
    const id = restoId

    const modalVisibleHandler = () => setModalVisible(!modalVisible)

    const editModalVisibleHandler = (record) => {
        setRestoId(record.id)
        setEditModalVisible(true)
        props.restaurantActions.getRestaurantsById(record.id)
        setRestoDataId(props.restaurantId)

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
                    <LinkContainer to={`/restaurants/${record.id}`}>
                        <Button type="primary">Показать</Button>
                    </LinkContainer>
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
            <Button type="primary mt-3" style={{display: "block", marginBottom: 10}} onClick={modalVisibleHandler}>Добавить ресторан</Button>
            <Input onChange={searchHandler} style={{marginBottom: 20}} placeholder="Введите название ресторана" />
            <Table columns={columns} dataSource={data} />
            <ModalResto visible={modalVisible} setVisible={setModalVisible}/>

            <Modal
                title="Редактирование"
                visible={editModalVisible}
                onOk={okHandler}
                onCancel={() => setEditModalVisible(false)}
            >
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                >
                    <Form.Item
                        label="Название ресторана"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите название ресторана!',
                            },
                        ]}
                    >
                        <Input name="name"  placeholder={props.restaurantId.name} onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Адрес"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите адрес ресторана!',
                            },
                        ]}
                    >
                        <Input name="location" placeholder={props.restaurantId.location} onChange={onChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Телефоный номер"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите телефонный номер ресторана!',
                            },
                        ]}
                    >
                        <Input name="phone" placeholder={props.restaurantId.phone} onChange={onChange}/>
                    </Form.Item>
                    <Form.Item
                        label="Количество мест"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите вместимость ресторана!',
                            },
                        ]}
                    >
                        <Input name= "amountOfPlace" placeholder={props.restaurantId.amountOfPlace}   onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Средний чек"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите средний чек ресторана!',
                            },
                        ]}
                    >
                        <Input name="averageBill"  placeholder={props.restaurantId.averageBill} onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Кухня"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста выберите кухню ресторана!',
                            },
                        ]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder= "Выберите новую кухню"
                            onChange={handleChange}
                        >
                            {children}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Рейтинг"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста введите рейтинг ресторана!',
                            },
                        ]}
                    >
                        <Input name="rate" placeholder={props.restaurantId.rate} onChange={onChange} />
                    </Form.Item>
                    <Form.Item
                        label="Фото"
                        rules={[
                            {
                                required: true,
                                message: 'Пожалуйста загрузите фото ресторана!',
                            },
                        ]}>
                        <Upload
                            customRequest={dummyRequest}
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>
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
    restaurantId: state.restaurant.restaurantId
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Restaurant));