import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/app.constants';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={
                <Button type="primary" onClick={() => navigate(ROUTES.DASHBOARD)}>
                    Back to Dashboard
                </Button>
            }
        />
    );
};

export default NotFoundPage;