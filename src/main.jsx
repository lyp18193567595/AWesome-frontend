import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomeLayout from './app/Home/page.js';
import EquipmentCenter from './app/equipmentCenter/page.js';
import ModelCenter from './app/modelCenter/page.js';
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // 最外层布局（可选）
        children: [
            {
                path: '/',
                element: <HomeLayout />, // 布局组件
                children: [
                    // {
                    //     index: true,
                    //     element: <HomeContent /> // 首页内容组件
                    // },
                    {
                        path: 'device-center',
                        element: <EquipmentCenter />
                    },
                    {
                        path: 'skill-models',
                        element: <ModelCenter />
                    },
                    // 其他子路由...
                ]
            }
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);