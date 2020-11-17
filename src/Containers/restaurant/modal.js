import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, Select, Modal, Upload, message } from "antd";
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons'
import {bindActionCreators} from "redux";
import * as restaurantActions from "../../actions/restaurantActions";
import * as kitchenActions from "../../actions/kitchenActions";
import {connect} from "react-redux";

function ModalResto(props) {
const {visible, setVisible, handler} = props

const [modalVisible, setModalVisible] = useState(false);
const [componentSize, setComponentSize] = useState('default');

const onFormLayoutChange = ({ size }) => {setComponentSize(size);};
const modalVisibleHandler = () => setModalVisible(!modalVisible)
const { Option } = Select;
const [imageUrl, setImageUrl] = useState(``)
const [image, setImage] = useState(``)
const [loading, setLoading] = useState(false)
const [kitchens, setKitchens] = useState([])
const [formdata, setFormData] = useState({
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
    async function fetchData() {
        await props.kitchenActions.getKitchens();
    }
    fetchData();
}, [props.kitchenActions])


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

const okHandler = () => {
    setModalVisible(false)
    console.log({...formdata, image, kitchens})
    props.restaurantActions.addRestaurant({...formdata, image, kitchens});

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
        title="Добавить ресторан"
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
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите название ресторана!',
                    },
                ]}
            >
                <Input name="name"  onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Адрес"
                name="location"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите адрес ресторана!',
                    },
                ]}
            >
                <Input name="location"  onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Телефоный номер"
                name="phone"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите телефонный номер ресторана!',
                    },
                ]}
            >
                <Input name="phone"  onChange={onChange}/>
            </Form.Item>
            <Form.Item
                label="Количество мест"
                name="amountOfPlace"
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите вместимость ресторана!',
                    },
                ]}
            >
                <Input name= "amountOfPlace"  onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Средний чек"
                name='averageBill'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите средний чек ресторана!',
                    },
                ]}
            >
                <Input name="averageBill"  onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Кухня"
                name="kitchens"
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
                    placeholder="Выберите кухню"
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </Form.Item>
            <Form.Item
                label="Рейтинг"
                name='rate'
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите рейтинг ресторана!',
                    },
                ]}
            >
                <Input name="rate" onChange={onChange} />
            </Form.Item>
            <Form.Item
                label="Фото"
                name="image"
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
    restaurants: state.restaurant.restaurants
})

const mapDispatchToProps = dispatch => ({
    restaurantActions: bindActionCreators(restaurantActions, dispatch),
    kitchenActions: bindActionCreators(kitchenActions, dispatch)

})


export default connect(mapStateToProps, mapDispatchToProps) (ModalResto);
