import React from 'react';
import { Card } from "react-bootstrap"
import { Link } from 'react-router-dom';


const Unauthorized = () => {
    return (
        <Card>
            <div className='card-body'>
                <h1 className="card-title">
                    No such page exists 
                    <div className='text-center'>🥲</div>
                    Goto home by clicking <Link to="/">here</Link>
                </h1>
            </div>
        </Card>
    )
}
export default Unauthorized;