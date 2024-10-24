'use client';

import React, { createContext, useState, useCallback, useMemo } from 'react';

const HambergerContext = createContext();

const SidebarHamberger = ({ children }) => {
    const [hamberger, setHamberger] = useState(false);

    const toggleHamberger = useCallback(() => {
        setHamberger(prevHamberger => !prevHamberger);
    }, []);

    const value = useMemo(() => ({
        hamberger,
        toggleHamberger
    }), [hamberger, toggleHamberger]);

    // console.log('check re render');


    return (
        <HambergerContext.Provider value={value}>
            {children}
        </HambergerContext.Provider>
    );
};

export { HambergerContext, SidebarHamberger };
