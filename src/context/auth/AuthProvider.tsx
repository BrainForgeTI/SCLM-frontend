import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { AuthContext } from "./AuthContext";
import { UserType } from "../../types/user/UserType";

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const api = useApi();

    useEffect(() => {
        const validateToken = async () => {
            const storageData = localStorage.getItem('authToken');
            if (storageData) {
                //data precisa receber o user
                const data = await api.validateToken('', '');
                // if (data.user) {
                //     setUser(data.user);
                // }
            }
        }
        validateToken();
    }, [api]);

    const signin = async (email: string, password: string) => {
        // data precisa receber o usuário
        // const data = await api.signIn(email, password);
        // if (data.user && data.token) {
        //     setUser(data.user);
        //     setToken(data.token);
        //     return true;
        // }
        // return false;
    }

    const signout = async () => {
        setUser(null);
        setToken('');
        // se tiver algo sendo guardado sobre o cabra no banco, limpar aqui
        // await api.logout();
    }

    const setToken = (token: string) => {
        localStorage.setItem('authToken', token);
    }

    return (
        <AuthContext.Provider value={{ user, signin, signout }}>
            {children}
        </AuthContext.Provider>
    );
}