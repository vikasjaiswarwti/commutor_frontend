import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const DashboardPage: React.FC = () => {
    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <Title level={2}>Dashboard</Title>
                <Paragraph>
                    Welcome to the Dashboard! This is a simple placeholder page.
                </Paragraph>
                <Paragraph>
                    Your dashboard content will appear here once the APIs are ready.
                </Paragraph>
            </Card>
        </div>
    );
};

export default DashboardPage;