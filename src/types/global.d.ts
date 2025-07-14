// src/types/global.d.ts
export {}; // 确保文件是模块

declare global {
    interface Window {
        CozeWebSDK: {
            WebChatClient: new (options: {
                config: {
                    bot_id: string;
                };
                componentProps: {
                    title: string;
                };
                auth: {
                    type: string;
                    token: string;
                    onRefreshToken: () => string;
                };
            }) => void;
        };
    }
}