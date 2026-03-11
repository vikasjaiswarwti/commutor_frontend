import React from 'react';
import { Typography, } from 'antd'; // Typography is usually safe, or wrap it
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// IMPORT FROM YOUR SHARED UI WRAPPERS

import { Button, Input, Card, Form } from '../../../shared/components/ui/index';

// import { useAuth } from '../hooks/useAuth';


const { Title, Text } = Typography;


const LoginPage: React.FC = () => {

    // const { handleLogin, isLoading, error } = useAuth();

    return (
        <div className="min-h-screen flex justify-center items-center from-indigo-500 to-purple-700">
            <Card className="shadow-lg">
                <div className="text-center mb-8">
                    <Title level={2}>Welcome Back</Title>
                    <Text type="secondary">Please sign in to continue</Text>
                </div>

                {/* {error && <Alert message={error} type="error" showIcon className="mb-6" />} */}

                {/* Use the abstract Form wrapper if you have one, 
            otherwise ensure the Form fields use shared/ui components */}
                <Form onFinish={() => { () => { } }} layout="vertical" size="large">
                    <Form.Item name="username" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{ required: true }]}>
                        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={false} block>
                        Sign In
                    </Button>
                </Form>
            </Card>
        </div>
    );
};

export default LoginPage; 