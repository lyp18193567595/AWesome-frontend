
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>

            <Outlet /> {/* 这里会渲染子路由组件 */}
        </>
    );
}

export default App;