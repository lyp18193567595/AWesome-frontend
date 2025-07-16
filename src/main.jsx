import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import HomeLayout from './app/Home/page.js';
import EquipmentCenter from './app/equipmentCenter/page.js';
import ModelCenter from './app/modelCenter/page.js';
import TaskCenter from './app/TaskCenter/page.js';
import Layout from "@/app/layout/page.js";
import AddEquipPage from "@/app/equipmentCenter/components/EquipAdd.js";
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // 最外层布局（可选）
        children: [
            {
                path: '/',
                element: <HomeLayout />, // 布局组件

                children: [
                    {
                        path: 'device-center',
                        element: <EquipmentCenter />
                    },
                    {
                        path: 'layout',
                        element: <Layout />
                    },
                    {
                        path: 'skill-models',
                        element: <ModelCenter />
                    },
                    {
                        path: 'task-center',
                        element: <TaskCenter />
                    },
                    {
                        path: 'add-equip',
                        element: <AddEquipPage />
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