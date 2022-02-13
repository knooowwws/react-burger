import React from 'react';
import {BurgerIcon, ListIcon, Logo, ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appHeader.module.css';

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={`pt-4 pb-4 ${styles.nav}`}>
                <div className={styles.box}>
                    <div className={`pl-5 pr-5 ${styles.boxElement}`}>
                        <BurgerIcon type="primary"/>
                        <a className='text text_type_main-default ml-2'>Конструктор</a>
                    </div>
                    <div className={`${styles.boxElement}`}>
                        <ListIcon type="secondary"/>
                        <a className='text text_type_main-default text_color_inactive ml-2'>Лента заказов</a>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Logo/>
                </div>
                <div className={`pr-5 ${styles.boxElement}`}>
                    <ProfileIcon type="secondary"/>
                    <a className='text text_type_main-default text_color_inactive ml-2'>Личный кабинет</a>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;
