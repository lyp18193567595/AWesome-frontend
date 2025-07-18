

/**
 * 系统Home页 - 优化版
 */
// @ts-ignore
import React from 'react';
import {
    AppstoreOutlined,
    ApiOutlined,
    ScheduleOutlined,
    QuestionCircleOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
// @ts-ignore
import logoImage from './assets/logo.png'
const { Header, Content, Footer, Sider } = Layout;
const SIDER_BG_COLOR = 'white';

const HomeLayout: React.FC = () => {
    const {
        token: { borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    // 动态获取当前选中的菜单项
    const getSelectedKey = () => {
        const path = location.pathname;
        // @ts-ignore
        if (path.includes('device-center')) return '2';
        // @ts-ignore
        if (path.includes('skill-models')) return '3';
        // @ts-ignore
        if (path.includes('task-center')) return '4';
        // @ts-ignore
        if (path.includes('help-center')) return '5';
        // @ts-ignore
        if (path.includes('profile')) return '6';
        return '1'; // 默认选中首页
    };

    // 菜单项配置
    const menuItems = [
        {
            key: 'logo',
            icon: (
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                   paddingTop :'30px',
                    marginBottom: '16px',
                    borderBottom: '1px solid #f0f0f0',
                }}>
                    <img
                        src={ logoImage }  // 替换为你的 Logo 路径
                        alt="Logo"
                        style={{
                            height: '50px',  // 调整 Logo 大小
                            width: 'auto',
                        }}
                    />
                </div>
            ),
            label: null,  // 不显示 label
            disabled: true,  // 禁止点击
        },
        {
            key: '1',
            icon: <AppstoreOutlined />,
            label: '首页',
        },
        {
            key: '2',
            icon: <AppstoreOutlined />,
            label: '设备中心',
        },
        {
            key: '3',
            icon: <ApiOutlined />,
            label: '技能模型广场',
        },
        {
            key: '4',
            icon: <ScheduleOutlined />,
            label: '任务中心',
        },
        // {
        //     key: '5',
        //     icon: <QuestionCircleOutlined />,
        //     label: '帮助中心',
        // },
        // {
        //     key: '6',
        //     icon: <UserOutlined />,
        //     label: '个人中心',
        // },
    ];

    // 处理菜单点击 - 使用replace防止历史记录堆积
    const handleMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case '1':
                navigate('/layout', { replace: true });
                break;
            case '2':
                navigate('device-center', { replace: true }); // 使用相对路径
                break;
            case '3':
                navigate('skill-models', { replace: true });
                break;
            case '4':
                navigate('task-center', { replace: true });
                break;
            case '5':
                navigate('help-center', { replace: true });
                break;
            case '6':
                navigate('profile', { replace: true });
                break;
            default:
                break;
        }
    };

    return (
        <Layout style={{ minHeight: '100vh', minWidth: '100vw' }}>
            {/* 左侧导航栏 - 保持不变 */}
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{ background: SIDER_BG_COLOR,height:'100vh' }}
            >

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    items={menuItems}
                    onClick={handleMenuClick}
                    style={{ background: SIDER_BG_COLOR }}
                />
            </Sider>

            {/* 右侧内容区域 */}
            <Layout>

                <Content>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 'calc(100vh - 64px)',
                            background: SIDER_BG_COLOR,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* 动态内容区域 - 子路由将在此渲染 */}
                        <Outlet />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    ©{new Date().getFullYear()} 最终序列
                </Footer>
            </Layout>
        </Layout>
    );
};

export default HomeLayout;