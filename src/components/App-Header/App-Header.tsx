import React from 'react';
import {BurgerIcon, Logo, MenuIcon, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
    return (
        <header>
            <nav className={styles.nav}>
                <div className={styles.box}>
                    <div className={`pl-5 pr-5 ${styles.boxElement}`}>
                        <BurgerIcon type="primary"/>
                        <a className='text text_type_main-default ml-2'>Конструктор</a>
                    </div>
                    <div className={`pl-5 pr-5 ${styles.boxElement}`}>
                        <BurgerIcon type="primary"/>
                        <a className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</a>
                    </div>
                </div>
                <div>
                    <Logo/>
                </div>
                <div className={`pl-5 pr-5 ${styles.boxElement}`}>
                    <ProfileIcon type="primary"/>
                    <a className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</a>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
