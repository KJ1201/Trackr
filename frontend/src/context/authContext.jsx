import { createContext, useContext, useState, useEffect } from "react";
import {login as loginService, register as registerService, getMe} from '../services/authService'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem(ACCESS_TOKEN)
            if (token) {
                try {
                    const res = await getMe();
                    setUser(res.data)
                } catch {
                    localStorage.removeItem(ACCESS_TOKEN);
                    localStorage.removeItem(REFRESH_TOKEN);
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);

    const login = async (credentials) => {
        const res = await loginService(credentials);
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        const me = await getMe();
        setUser(me.data)
    }

    const register = async (credentials) => {
        await registerService(credentials);
        await login({
          username: credentials.username,
          password: credentials.password,
        });
    }

    const logout = () => {
        localStorage.removeItem(ACCESS_TOKEN)
        localStorage.removeItem(REFRESH_TOKEN)
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, register, logout, loading }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => useContext(AuthContext);