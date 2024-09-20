import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import menuData from '../data/menuData.json';

const Sidebar = () => {
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(null);

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:4000/api/v1/user/logout", {}, {
                withCredentials: true // Ensure cookies are sent with the request
            });

            Cookies.remove('token'); // Remove token from cookies
            setSuccess("User logout successful!");
            setError(null);
            navigate("/auth/login");
        } catch (err) {
            console.error(err);
            setError("Logout failed. Please try again.");
            setSuccess(null);
        }
    };

    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <Link aria-label='Navigate to sneat homepage' to="/" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <img src="/assets/img/sneat.svg" alt="sneat-logo" aria-label='Sneat logo image' />
                    </span>
                    <span className="app-brand-text demo menu-text fw-bold ms-2">Sneat</span>
                </Link>

                <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
                    <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </a>
            </div>

            <div className="menu-inner-shadow"></div>

            <ul className="menu-inner py-1">
                {menuData.map((section) => (
                    <React.Fragment key={section.header}>
                        {section.header && (
                            <li className="menu-header small text-uppercase">
                                <span className="menu-header-text">{section.header}</span>
                            </li>
                        )}
                        {section.items.map(item => (
                            <MenuItem key={item.text} item={item} handleLogout={handleLogout} />
                        ))}
                    </React.Fragment>
                ))}
            </ul>

            {/* Success and Error Messages */}
            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}
            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}
        </aside>
    );
};

const MenuItem = ({ item, handleLogout }) => {
    const location = useLocation();
    const isActive = location.pathname === item.link;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const isSubmenuActive = hasSubmenu && item.submenu.some(subitem => location.pathname === subitem.link);

    const handleItemClick = (e) => {
        if (item.onClick === "handleonClick") {
            handleLogout(e);
        }
    };

    return (
        <li className={`menu-item ${isActive || isSubmenuActive ? 'active' : ''} ${hasSubmenu && isSubmenuActive ? 'open' : ''}`}>
            <NavLink
                aria-label={`Navigate to ${item.text} ${!item.available ? 'Pro' : ''}`}
                to={item.link}
                className={`menu-link ${item.submenu ? 'menu-toggle' : ''}`}
                onClick={handleItemClick}
            >
                <i className={`menu-icon tf-icons ${item.icon}`}></i>
                <div>{item.text}</div>
                {item.available === false && (
                    <div className="badge bg-label-primary fs-tiny rounded-pill ms-auto">Pro</div>
                )}
            </NavLink>
            {item.submenu && (
                <ul className="menu-sub">{item.submenu.map(subitem => (
                    <MenuItem key={subitem.text} item={subitem} handleLogout={handleLogout} />
                ))}</ul>
            )}
        </li>
    );
};

export default Sidebar;
