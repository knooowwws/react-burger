import React, {useState} from 'react';
import {
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './forgot-password.module.css';
import {useDispatch} from "react-redux";
import {forgotPassword} from '../../../services/actions/auth'
import {Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";

export const ForgotPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [valueFromInput, setValueFromInput] = useState({email: ''});
    const token = localStorage.refreshToken;
    const location = useLocation()

    const linkReset = () => navigate('/reset-password')


    const submitForm = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(valueFromInput, linkReset));
    };

    const changeInput = (e) => {
        setValueFromInput({...valueFromInput, [e.target.name]: e.target.value});
    };

    return (
        <>
            {(token) ? (
                <Routes>
                    <Route path="/" element={<Navigate to={location.state?.from || '/'} replace/>}/>
                </Routes>
            ) : (
                <section className={style.container}>
                    <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
                    <form className={style.form} onSubmit={submitForm}>
                        <Input
                            placeholder='Укажите e-mail'
                            type='email'
                            name='email'
                            value={valueFromInput.email || ''}
                            onChange={changeInput}
                        />
                        <Link to={'/reset-password'}>
                            <Button disabled={!valueFromInput.email} type='primary' size='medium'>
                                Восстановить
                            </Button>
                        </Link>
                    </form>
                    <div className={style.text}>
                        <span className='text text_type_main-default text_color_inactive'>
                            Вспомнили пароль?{' '}
                            <Link to='/login' className={style.link}>Войти</Link>
                        </span>
                    </div>
                </section>
            )
            }
        </>
    )
}