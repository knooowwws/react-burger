import React, {useState} from "react";
import {Link, Navigate, Route, Routes, useLocation} from 'react-router-dom'
import {Input, PasswordInput, Button,} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css'
import {useDispatch, useSelector} from "react-redux";
import {profSelectors} from "../../../services/selectors";
import {authorize} from '../../../services/actions/auth';

export const Login = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [valueFromInput, setValueFromInput] = useState({email: '', password: ''});
    const logoutRequest = useSelector(profSelectors.authData);
    const refreshToken = localStorage.refreshToken;

    const changeInput = (e) => {
        setValueFromInput({...valueFromInput, [e.target.name]: e.target.value});
    };

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(authorize(valueFromInput));
    };

    return (
        <>
            {(refreshToken && (logoutRequest !== undefined)) ? (
                <Routes>
                    <Route path="/" element={<Navigate to={location.state?.from || '/'} replace/>}
                    />
                </Routes>
            ) : (
                <section className={style.container}>
                    <h2 className={`${style.title} text text_type_main-medium mb-6`}>Вход</h2>
                    <form className={style.form} onSubmit={submitForm}>
                        <Input
                            placeholder='E-mail'
                            type='email'
                            name='email'
                            value={valueFromInput.email || ''}
                            onChange={changeInput}
                        />
                        <PasswordInput
                            placeholder='Пароль'
                            name='password'
                            value={valueFromInput.password || ''}
                            onChange={changeInput}
                        />
                        <Button type='primary' size='medium'>
                            Войти
                        </Button>
                    </form>
                    <div className={style.text}>
                        <span className='text text_type_main-default text_color_inactive'>
                            Вы — новый пользователь?{' '}
                            <Link to='/register' className={style.link}>Зарегистрироваться</Link>
                        </span>
                        <span className='text text_type_main-default text_color_inactive'>Забыли пароль?{' '}
                            <Link to='/forgot-password' className={style.link}>Восстановить пароль</Link>
                        </span>
                    </div>
                </section>
            )}
        </>
    )
}