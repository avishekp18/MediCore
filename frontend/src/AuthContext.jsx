import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Restore session on mount
    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:4000/api/v1/user/patient/me",
                    { withCredentials: true }
                );
                setUser(res.data.user);
                setIsAuthenticated(true);
            } catch (err) {
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        setIsAuthenticated(true);
    };

    // Logout function
    const logout = async () => {
        try {
            await axios.get("http://localhost:4000/api/v1/user/patient/logout", {
                withCredentials: true,
            });
        } catch (err) {
            console.error("Logout failed", err);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
