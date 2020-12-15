import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, Select, Modal, Upload, message } from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";

function EditModalResto(props) {

    const {restoIdData} = props
    const {visible, setVisible, restoId} = props

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

    const { Meta } = Card;


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

    const data = props.kitchens.map((item, i) => {
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

    const id = restoId

    const okHandler = () => {
        setVisible(false)
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



    return (
        <Modal
            title="Редактирование"
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
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите название ресторана!',
                        },
                    ]}
                >
                    <Input name="name"  value={props.restaurantId.name} onChange={onChange} />
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
                    <Input name="location" value={props.restaurantId.location} onChange={onChange}/>
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
                    <Input name="phone" value={props.restaurantId.phone} onChange={onChange}/>
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
                    <Input name= "amountOfPlace" value={props.restaurantId.amountOfPlace}   onChange={onChange} />
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
                    <Input name="averageBill"  value={props.restaurantId.averageBill} onChange={onChange} />
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
                    <Input name="rate" value={props.restaurantId.rate} onChange={onChange} />
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

    )
}

const mapStateToProps = state => ({
    error: state.restaurant.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens,
    restaurants: state.restaurant.restaurants,
    restaurantId: state.restaurant.restaurantId

})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (EditModalResto);
