import React, {useState} from 'react';
import {
    Input,
    PasswordInput,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import {useDispatch, useSelector} from "react-redux";
import {profSelectors} from '../../../services/selectors'
import {registerAction} from '../../../services/actions/auth'
import {Link, Navigate, Route, Routes, useLocation} from "react-router-dom";

export const Register = () => {
    const dispatch = useDispatch()
    const [valueFromInput, setValueFromInput] = useState({name: '', email: '', password: ''});
    const logoutRequest = useSelector(profSelectors.authData);
    const token = localStorage.refreshToken;
    const location = useLocation()

    const submitForm = (e) => {
        e.preventDefault();
        dispatch(registerAction(valueFromInput));
    };

    const changeInput = (e) => {
        setValueFromInput({...valueFromInput, [e.target.name]: e.target.value});
    };

    return (
        <>
            {(token && (logoutRequest !== undefined)) ? (
                <Routes>
                    <Route path="/" element={<Navigate to={location.state?.from || '/'} replace/>}
                    />
                </Routes>
            ) : (
                <section className={style.container}>
                    <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
                    <form className={style.form} onSubmit={submitForm}>
                        <Input
                            placeholder='Имя'
                            type='text'
                            name='name'
                            value={valueFromInput.name || ''}
                            onChange={changeInput}
                        />
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
                            Зарегистрироваться
                        </Button>
                    </form>
                    <div className={style.text}>
                        <span className='text text_type_main-default text_color_inactive'>
                            Уже зарегистрированы?{' '}
                            <Link to='/login' className={style.link}>Войти</Link>
                        </span>
                    </div>
                </section>
            )
            }
        </>
    )
}