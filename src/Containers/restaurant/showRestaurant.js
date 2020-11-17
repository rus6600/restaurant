import React from "react";



function ShowRestaurant() {
return (
    <div>123</div>
)
}

export default ShowRestaurant

// import {withRouter} from "react-router-dom"
// import {Button, Card, Checkbox, Form, Input} from "antd";
// import {Route, Link} from "react-router-dom"
// import React from "react";
// import { Layout, Menu } from 'antd';
// import Kitchen from "../kitchen";
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     UserOutlined,
//     VideoCameraOutlined,
//     UploadOutlined,
//     CloseCircleOutlined
// } from '@ant-design/icons';
//
//
// import {bindActionCreators} from "redux";
// import * as authActions from "../../actions/authActions";
// import {connect} from "react-redux";
// import Restaurant from "../restaurant";
// import ShowRestaurant from "../restaurant/showRestaurant";
//
// const { Header, Sider, Content } = Layout;
//
//
//
//
//
// function Dashboard(props) {
//
//     const closeSession = (values) => {
//         console.log('Success:', values);
//         props.authActions.signOut(values, props.history);
//     };
//
//
//     return (
//         <Layout>
//             <Sider style={{ minHeight: '100vh' }} trigger={null} collapsible>
//                 <div className="logo" />
//                 <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//                     <Menu.Item key="1" icon={<UserOutlined />}>
//                         <Link to={'/dashboard/kitchen'}>Кухня</Link>
//                     </Menu.Item>
//                     <Menu.Item key="2" icon={<VideoCameraOutlined />}>
//                         <Link to={'/dashboard/restaurant'}>Ресторан</Link>
//                     </Menu.Item>
//                     <Menu.Item key="3" icon={<UploadOutlined />}>
//                         Заказы
//                     </Menu.Item>
//                     <Menu.Item key="4" onClick={() => closeSession()} icon={<CloseCircleOutlined />}>
//                         Выйти из кабинета
//                     </Menu.Item>
//                 </Menu>
//             </Sider>
//             <Layout className="site-layout">
//                 <Header className="site-layout-background" style={{ padding: 0 }}>
//                     {/*{React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
//                     {/*    className: 'trigger',*/}
//                     {/*    onClick: this.toggle,*/}
//                     {/*})}*/}
//                 </Header>
//                 <Content
//                     className="site-layout-background"
//                     style={{
//                         margin: '24px 16px',
//                         padding: 24,
//                         minHeight: "100vh",
//                     }}
//                 >
//                     <Route exact path={"/dashboard/kitchen"} component={Kitchen}/>
//                     <Route exact path={'/dashboard/restaurant'} component={Restaurant}/>
//                     <Route exact path={`/dashboard/restaurants/:id`} component={ShowRestaurant}/>
//                 </Content>
//             </Layout>
//         </Layout>
//     );
// }
//
// const mapStateToProps = state => ({
//     error: state.auth.error,
//     isLoading: state.auth.isLoading
// })
//
// const mapDispatchToProps = dispatch => ({
//     authActions: bindActionCreators(authActions, dispatch)
// })
//
//
// export default connect(mapStateToProps, mapDispatchToProps) (withRouter(Dashboard));
