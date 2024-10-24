// TableContext.js
import React, { createContext, useState, useCallback, useMemo, useEffect } from 'react';

const TableContext = createContext();

const TableData = ({ children, initialData, mutate }) => {
    const [datas, setDatas] = useState(initialData);
    const [selectedDatas, setSelectedDatas] = useState([]);

    // Hàm updateData sẽ gọi mutate và cập nhật state datas sau khi mutate hoàn thành
    const updateData = useCallback(async () => {
        const newData = await mutate(); // Cập nhật lại dữ liệu từ SWR
        setDatas(newData);
    }, [mutate]);
    // console.log('check mutate: ', updateData());

    // Tự động cập nhật `datas` mỗi khi `initialData` thay đổi
    useEffect(() => {
        setDatas(initialData);
    }, [initialData]);

    // Cập nhật lại giá trị của hàng khi đc chọn
    const toggleSelectedDatas = useCallback((selected) => {
        setSelectedDatas(selected);
    }, []);

    const value = {
        datas,
        updateData,
        selectedDatas,
        toggleSelectedDatas
    }
    // const value = useMemo(() => ({
    //     datas,
    //     setDatas: updateData,
    //     selectedDatas,
    //     toggleSelectedDatas
    // }), []);

    return (
        <TableContext.Provider value={value}>
            {children}
        </TableContext.Provider>
    );
};

export { TableContext, TableData };
