// /**
//  *系统首页
//  */
// // @ts-ignore
// import React from 'react';
//
// const Layout = () => {
//     return (
//         <div>
//             首页
//
//         </div>
//     );
// };
//
// // @ts-ignore
// export default Layout;
//
//
//
/**
 * 系统首页
 */
// // @ts-ignore
// import React, { useEffect } from 'react';
//
// const Layout = () => {
//     useEffect(() => {
//         // 动态创建脚本标签
//         const script = document.createElement('script');
//         script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js';
//         script.async = true;
//
//         // 脚本加载完成后初始化
//         script.onload = () => {
//             new window.CozeWebSDK.WebChatClient({
//                 config: {
//                     bot_id: '7515000154618167323',
//                 },
//                 componentProps: {
//                     title: 'Coze',
//                 },
//                 auth: {
//                     type: 'token',
//                     token: 'pat_********',
//                     onRefreshToken: () => 'pat_********'
//                 }
//             });
//         };
//
//         document.body.appendChild(script);
//
//         // 组件卸载时清理
//         return () => {
//             document.body.removeChild(script);
//         };
//     }, []);
//
//     return (
//         <div>
//             首页
//             {/* 聊天窗口会自动插入到页面中 */}
//         </div>
//     );
// };
//
// export default Layout;
// @ts-ignore
import React, { useEffect } from 'react';

const Layout = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/1.2.0-beta.10/libs/cn/index.js';
        script.async = true;

        script.onload = () => {
            // 现在 TypeScript 知道 CozeWebSDK 是 window 上的合法属性
            // @ts-ignore
            new window.CozeWebSDK.WebChatClient({
                config: {
                    bot_id: '7515000154618167323',
                },
                componentProps: {
                    title: 'Coze',
                },
                auth: {
                    type: 'token',
                    token: 'pat_********',
                    onRefreshToken: () => 'pat_********'
                }
            });
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return <div>首页(嵌入聊天框）</div>;
};

export default Layout;