import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Layout = () => {
    const loc = useLocation().pathname.substring(1);
    useEffect(() => {
        const c = document.getElementById(loc).className;
        document.getElementById(loc).className = c + " active";
    }, [])

    const { logout, roles } = useAuth();
    const navigate = useNavigate();
    async function handleLogout() {
        try {
            await logout();
            navigate("/login");
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark m-0 p-0" style={{width: "100vw", fontSize: "17px"}}>
                    <a className="navbar-brand p-3" href="/">GENSPEAKS</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link" id="dashboard" href="/dashboard">Dashboard</a>
                            </li>
                            {roles.find(role => role === 5001) && <li className="nav-item">
                                <a className="nav-link" id="admin" href="/admin">Admin</a>
                            </li>}
                            <li className="nav-item">
                                <a className='nav-link' id="update-profile" href='/update-profile'>Update Profile</a>
                            </li>
                            <li>
                                <Button onClick={handleLogout}>Logout</Button>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <section className="p-3">
                <Outlet />
            </section>
        </>
        )
}

export default Layout;