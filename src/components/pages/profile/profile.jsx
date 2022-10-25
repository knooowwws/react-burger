import React, {useEffect} from 'react';

import style from './profile.module.css';
import {ProfileNav} from '../../profile-nav/profile-nav';
import {ProfileUserInfo} from '../../profile-user-info/profile-user-info';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../../services/actions/auth';
// import {Route, Routes} from "react-router-dom";

export const Profile = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserProfile());
    }, [dispatch]);

    return (
        <section className={style.section}>
            {' '}
            <ProfileNav/>
            {/*<Routes>*/}
            {/*    <Route path='/profile' exact>*/}
            <ProfileUserInfo/>
            {/*</Route>*/}
            {/*<Route path='/profile/orders' ></Route>*/}
            {/*</Routes>*/}
        </section>
    );
};
