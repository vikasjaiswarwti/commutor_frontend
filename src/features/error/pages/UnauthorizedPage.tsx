import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../shared/constants/app.constants';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Button type="primary" onClick={() => navigate(ROUTES.DASHBOARD)}>
                    Back to Dashboard
                </Button>
            }
        />
    );
};

export default UnauthorizedPage;