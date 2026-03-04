import React from 'react';
import { message } from 'antd';
import { SmileOutlined, FrownOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToasterProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

// Map position to Ant Design placement
const mapPosition = (position: string): 'top' | 'bottom' => {
    return position.startsWith('top') ? 'top' : 'bottom';
};

// Toast API
export const toast = {
    success: (content: string, duration: number = 3) => {
        message.success({
            content,
            duration,
            icon: <SmileOutlined />,
        });
    },

    error: (content: string, duration: number = 4) => {
        message.error({
            content,
            duration,
            icon: <FrownOutlined />,
        });
    },

    info: (content: string, duration: number = 3) => {
        message.info({
            content,
            duration,
            icon: <InfoCircleOutlined />,
        });
    },

    warning: (content: string, duration: number = 3.5) => {
        message.warning({
            content,
            duration,
            icon: <WarningOutlined />,
        });
    },

    loading: (content: string, duration: number = 0) => {
        return message.loading(content, duration);
    },

    dismiss: message.destroy,
};

export const Toaster: React.FC<ToasterProps> = ({
    position = 'top-right'
}) => {
    // Configure message global settings
    React.useEffect(() => {
        message.config({
            top: position.startsWith('top') ? 24 : undefined,
            bottom: position.startsWith('bottom') ? 24 : undefined,
            duration: 3,
            maxCount: 3,
        });
    }, [position]);

    // This component doesn't render anything as Ant Design handles the rendering
    return null;
};