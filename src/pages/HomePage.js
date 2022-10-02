import React from 'react';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const HomePage = () => {
    return (
        <Layout active={"dashboard"}>
            <Dashboard />
        </Layout>
    )
}

export default HomePage;
