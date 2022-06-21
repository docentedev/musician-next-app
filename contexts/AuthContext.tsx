import { useRouter } from 'next/router'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import routes from '../config/routes'

export function parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    const model = JSON.parse(jsonPayload)
    model.initData = new Date(Number(model.iat + '000'))
    return model
}

const initialState: any = {
    data: {
        token: {
            jwt: ''
        },
        isLogin: null
    },
    setData: (_d: { key: string, value: any }) => { }
}

const AuthCtx = createContext(initialState)

const AuthProvider = ({ children }: any) => {
    const [data, setData] = useState(initialState.data)

    useEffect(() => {
        const lsData = localStorage.getItem('token')
        let newData = {
            token: {
                jwt: ''
            },
            isLogin: false
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
                        token: {
                            jwt: ''
                        }
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

export const useIsAuth = (roles: string[] = []) => {
    const [login, setLogin] = useState(false)
    const router = useRouter()
    const { data } = useContext(AuthCtx)
    const authCheck = useCallback(() => {
        if (data.isLogin === null) return false
        if (data.token.roles && roles.length > 0) {
            const found = data.token.roles.some((r: string) => roles.indexOf(r) >= 0)
            if (!found) {
                router.push(routes.home())
                return false
            } else {
                return true
            }
        } else {
            if (!data.isLogin) {
                router.push(routes.home())
                return false
            } else {
                return true
            }
        }
    }, [data.isLogin, data.token.roles, roles, router])

    useEffect(() => {
        setLogin(authCheck())
    }, [authCheck])
    return login
}

export const useAuth = () => {
    const authData = useContext(AuthCtx)
    return authData
}

export const useRolesValidation = () => {
    const valiation = (roles: string[], data: any) => {
        const token = data.token
        const isLogin = data.isLogin
        if (!isLogin) return false
        const found = token.roles.some((r: string) => roles.indexOf(r) >= 0)
        return found
    }
    return valiation
}

export default AuthProvider
