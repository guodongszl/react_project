// context/GlobalContext.js
'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalState, setGlobalState] = useState(() => {
        if (typeof localStorage !== 'undefined') {
            // 从 localStorage 读取数据，如果没有则使用默认值
            const savedState = localStorage.getItem('globalState');
            console.log(savedState);
            return savedState ? JSON.parse(savedState) : {
                id: '',
                username: '',

            };
        }
    });

    useEffect(() => {
        // 每当 globalState 变化时，保存到 localStorage
        localStorage.setItem('globalState', JSON.stringify(globalState));
    }, [globalState]);

    const setGlobalVar = (key, value) => {
        setGlobalState(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    return (
        <GlobalContext.Provider value={{ globalState, setGlobalVar }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => useContext(GlobalContext);