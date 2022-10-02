import React from 'react';
import Admin from '../components/Admin';
import Layout from '../components/Layout';


const AdminPage = () => {
    return (
        <Layout active="admin">
            <Admin />
        </Layout>
    )
}

export default AdminPage;