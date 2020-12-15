import React, {useEffect, useState} from 'react';
import { Table, Space, Button, Modal, Input, Form } from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as kitchenActions from '../../actions/kitchenActions'





function Kitchen(props) {

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
            title: 'Действие',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => openEditModal(record)}>Редактировать</Button>
                    <Button type="link" onClick={() => deleteItem(record)}>Удалить</Button>
                </Space>
            ),
        },
    ];




    const [addVisible, setAddVisible] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    
    const [editForm,setEditForm] = useState({
        name:""
    })
    const [form, setForm] = useState({
        name: ``
    })

    useEffect( () => {
        async function fetchData() {
            await props.kitchenActions.getKitchens();
        }
        fetchData();
    }, [props.kitchenActions])

    const data = props.kitchens.map((item, i) => {
        return {
            key:i,
            name: item.name,
            id: item.id
        }
    })


    const openModal = () => {
        setAddVisible(true)
    }

    const handleOk = () => {
        form.name && form.name.length && props.kitchenActions.addKitchen({name: form.name})
        setAddVisible(false)
    }

    const handleEdit = () => {
        editForm.name && editForm.name.length && props.kitchenActions.editKitchen(editForm)
        setEditVisible(false)

    }

    const deleteItem = record => {
        props.kitchenActions.deleteKitchens(record.id)
    }

    const closeModal = () => {
        setAddVisible(false)
    }

    const closeEditModal = () => {
        setEditVisible(false)
    }

    const openEditModal = item => {
        setEditVisible(true)
        setEditForm({name:item.name, id: item.id})
        console.log(item)
    }

    const onEditChange = e => {
        const {name,value} = e.target
        setEditForm (prev => ({
            ...prev,
        [name]: value
        }))
    }



    const onChange = e => {
        setForm({
            name: e.target.value
        })
    }

    return(
        <div>
            <Button type="primary mt-3" style={{display: "block"}} onClick={openModal}>Добавить кухню</Button>
            <Table columns={columns} dataSource={data} />
            <Modal
                title="Введите название новой кухни"
                visible={addVisible}
                onCancel={closeModal}
                cancelText="Закрыть"
                okText="Добавить кухню"
                onOk={handleOk}
            >
                <Form>
                    <Form.Item>
                        <Input
                            placeholder="Ваше название"
                            onChange={onChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Редактирование"
                visible={editVisible}
                onCancel={closeEditModal}
                cancelText="Закрыть"
                okText="Добавить кухню"
                onOk={handleEdit}
            >
                <Form>
                    <Form.Item>
                        <Input
                            name="name"
                            value={editForm.name}
                            placeholder="Ваше название"
                            onChange={onEditChange}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

const mapStateToProps = state => ({
    error: state.kitchen.error,
    isLoading: state.kitchen.isLoading,
    kitchens: state.kitchen.kitchens
})

const mapDispatchToProps = dispatch => ({
    kitchenActions: bindActionCreators(kitchenActions, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps) (Kitchen);