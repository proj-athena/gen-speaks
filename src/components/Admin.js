import React from 'react';
import { Card } from 'react-bootstrap';

export default function Admin() {
    return (
        <div id="admin">
            <Card>
                <div className='card-body'>
                    <h1 className='card-title'>This is Admin page</h1>
                </div>
            </Card>
            {/* <Link to="/dashboard">Click here to dashboard</Link> */}
        </div>
    );
}
