import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appHeader.module.css';
import {NavLink, useLocation} from "react-router-dom";

function AppHeader() {
    const {pathname} = useLocation()
    let activeStyle = {
        color: "white",
    };

    return (
        <header className={styles.header}>
            <nav className={`pt-4 pb-4 ${styles.nav}`}>
                <div className={styles.box}>
                    <div className={`pl-5 pr-5 ${styles.boxElement}`}>
                        <NavLink to='/' style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        } className={`text text_type_main-default mr-2 pr-5 ${styles.link}`}>
                            <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'}/>
                            <span className='text text_type_main-default ml-2'>Конструктор</span>
                        </NavLink>
                    </div>
                    <div className={`${styles.boxElement}`}>
                        <NavLink to='orders' style={({isActive}) =>
                            isActive ? activeStyle : undefined
                        } className={`text text_type_main-default mr-2 pr-5 ${styles.link}`}>
                            <ListIcon type={pathname === '/orders' ? 'primary' : 'secondary'}/>
                            <span className='text text_type_main-default ml-2'>Лента заказов</span>
                        </NavLink>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <div className={`pr-5 ${styles.boxElement}`}>
                    <NavLink to='/profile'
                             style={({isActive}) => isActive ? activeStyle : undefined}
                             className={`text text_type_main-default mr-2 pr-5 ${styles.link}`}>
                        <ProfileIcon type={pathname === '/profile' || pathname === '/profile/orders' ? 'primary' : 'secondary'}/>
                        <span className='text text_type_main-default ml-2'>Личный кабинет</span>
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default React.memo(AppHeader);
