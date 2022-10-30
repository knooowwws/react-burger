import React, { useEffect} from 'react';
import {Navigate, useLocation} from "react-router-dom";
import {useDispatch} from "react-redux";
import {getNewAccessToken} from "../../services/actions/auth";

export const ProtectedRoute = ({children, path}) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const refreshToken = Boolean(localStorage.refreshToken);

    useEffect(() => {
        if (refreshToken) {
            dispatch(getNewAccessToken())
        }
    }, [])

    if (!refreshToken) {
        return <Navigate to={`/${path}`} state={{from: location}} />
    }

    return (
        refreshToken && children

    )


}