import React, {useState} from 'react';
import {
    Input,
    Button,
    PasswordInput
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './reset-password.module.css';
import {useDispatch, useSelector} from "react-redux";
import {savePassword} from '../../../services/actions/auth'
import {Link, Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {profSelectors} from "../../../services/selectors";

export const ResetPassword = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [valueFromInput, setValueFromInput] = useState({password: '', token: ''});
    // const token = localStorage.refreshToken;
    const location = useLocation()
    const isResetPassword = useSelector(profSelectors.authData);

    const goHome = () => navigate('/')


    const submitForm = (e) => {
        e.preventDefault();
        dispatch(savePassword(valueFromInput, goHome()));
    };

    const changeInput = (e) => {
        setValueFromInput({...valueFromInput, [e.target.name]: e.target.value});
    };

    return (
        <>
            {(!isResetPassword && false) ? (
                <Routes>
                    <Route path="/forgot-password" element={<Navigate to={location.state?.from || '/'} replace/>}/>
                </Routes>
            ) : (
                <section className={style.container}>
                    <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
                    <form className={style.form} onSubmit={submitForm}>
                        <PasswordInput
                            name='password'
                            value={valueFromInput.password || ''}
                            onChange={changeInput}
                            size={'default'}
                        />
                        <Input
                            placeholder='Введите код из письма'
                            type='text'
                            name='token'
                            value={valueFromInput.token || ''}
                            onChange={changeInput}
                            size={'default'}
                        />
                        <Link to={'/'}>
                            <Button type='primary' size='medium'>
                                Сохранить
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