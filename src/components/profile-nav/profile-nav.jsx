import React from 'react';
import { useDispatch } from 'react-redux';
import {NavLink, useNavigate, useLocation, } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import style from './profile-nav.module.css';

export const ProfileNav = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goLogin = () => {
        navigate('/login')
    };

    let activeStyle = {
        color: "white",
    };

    const handleClick = () => {
        dispatch(logout(goLogin));
    };
    const { pathname } = useLocation();
    return (
        <div className={style.container}>
            <ul className={style.list}>
                <li className={style.listItem}>
                    <NavLink
                        className={`text text_type_main-medium ${style.link}`}
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        to='/profile'
                        // exact
                    >
                        Профиль
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink
                        className={`text text_type_main-medium ${style.link}`}
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        to='/profile/orders'
                        // exact
                    >
                        История заказов
                    </NavLink>
                </li>
                <li className={style.listItem}>
                    <NavLink
                        onClick={handleClick}
                        className={`text text_type_main-medium ${style.link}`}
                        style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        }
                        to='/login'
                        // exact
                    >
                        Выход
                    </NavLink>
                </li>
            </ul>
            {pathname === '/profile' && (
                <span className={`text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные{' '}
        </span>
            )}
        </div>
    );
};
