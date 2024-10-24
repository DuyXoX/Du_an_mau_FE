import React, { createContext, useCallback, useMemo, useState } from 'react';

const TableInfoContext = createContext();

const TableInfo = ({ formTable, typeData, validate, endpoint, children }) => {
    // console.log('check: ', formTable, typeData, validate, endpoint, children);

    const value = useMemo(() => ({
        formTable,
        typeData,
        validate,
        endpoint
    }), [formTable, typeData, validate, endpoint]);

    return (
        <TableInfoContext.Provider value={value}>
            {children}
        </TableInfoContext.Provider>
    );
};

export { TableInfoContext, TableInfo };