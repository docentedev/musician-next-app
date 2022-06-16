import { createContext, useContext, useEffect, useState } from 'react'

function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const model = JSON.parse(jsonPayload)
    model.initData = new Date(Number(model.iat + '000'))
    return model
}

const initialState = {
    data: {
        token: {},
        isLogin: false,
    },
    setData: (_d: { key: string, value: any }) => { }
}

const AuthCtx = createContext(initialState)

const AuthProvider = ({ children }: any) => {
    const [data, setData] = useState({
        token: {},
        isLogin: false,
    })

    useEffect(() => {
        const lsData = localStorage.getItem('token')
        let newData = {
            token: {},
            isLogin: false,
        }
        if (lsData) {
            newData.token = JSON.parse(lsData)
            newData.isLogin = true
        }
        setData(newData)
    }, [])

    return (
        <AuthCtx.Provider value={{
            data,
            setData: (newData: { key: string, value: string }) => {
                if (newData.key === 'token') {
                    const token = parseJwt(newData.value)
                    token.jwt = newData.value
                    localStorage.setItem('token', JSON.stringify(token))
                    setData({
                        ...data,
                        isLogin: true,
                        [newData.key]: token,
                    })
                } else if (newData.key === 'logout') {
                    localStorage.removeItem('token')
                    setData({
                        ...data,
                        isLogin: false,
                        token: {}
                    })
                } else {
                    setData({
                        ...data,
                        [newData.key]: newData.value
                    })
                }
            }
        }}>
            {children}
        </AuthCtx.Provider>)
}

export const useAuth = () => {
    const authData = useContext(AuthCtx)
    return authData
}

export default AuthProvider
