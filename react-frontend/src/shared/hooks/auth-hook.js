import { useCallback, useEffect, useState } from 'react'

let logoutTimer;

export const useAuth = () => {

    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(false)
    const [tokenExpirationTime, setTokenExpirationTime] = useState()

    const login = useCallback((uid, token, expirationDate) => {
        setToken(token)
        setUserId(uid)
        const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60)
        setTokenExpirationTime(tokenExpirationDate)
        localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token, expiration: tokenExpirationDate }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        localStorage.removeItem('userData')
    }, [])

    useEffect(() => {
        if (token && tokenExpirationTime) {
            const remainingTime = tokenExpirationTime.getTime() - new Date().getTime()
            logoutTimer = setTimeout(logout, remainingTime)
        } else {
            clearTimeout(logoutTimer)
        }
    }, [logout, token, tokenExpirationTime])

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('userData'))
        if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration))
        }
    }, [login])

    return {token, login, logout, userId}

}