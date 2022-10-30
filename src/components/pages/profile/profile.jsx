import React, {useEffect} from 'react';

import style from './profile.module.css';
import {ProfileNav} from '../../profile-nav/profile-nav';
import {ProfileUserInfo} from '../../profile-user-info/profile-user-info';
import {useDispatch} from 'react-redux';
import {getUserProfile} from '../../../services/actions/auth';
import {Route, Routes} from "react-router-dom";
import {getUserInfo} from "../../../utils/functions";

export const Profile = () => {
    const dispatch = useDispatch();
    const asd = () => {
        return function () {
            getUserInfo().then(r => console.log('r'))
        }
    };


    useEffect(() => {
        dispatch(getUserProfile());
    }, []);

    return (
        <section className={style.section}>
            {' '}
            <ProfileNav/>
            <Routes>
                <Route path="" element={<ProfileUserInfo/>}/>
                <Route path='orders'>{''}</Route>
            </Routes>
        </section>
    );
};
