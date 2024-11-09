import React, { memo, useContext, useState } from 'react';
import { Button } from 'react-bootstrap';
import { IoMdAdd } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import { FaFileUpload, FaRegTrashAlt } from "react-icons/fa";
import AddModal from '../modals/cruds/AddModal';
import DeletesModal from '../modals/cruds/DeletesModal';
import { TableContext } from '@/containers/context/getdata/TableData';
import { TableInfoContext } from '@/containers/context/getdata/TableInfo';


const TableHeader = () => {
    const { updateData, selectedDatas, toggleSelectedDatas } = useContext(TableContext);//Lấy data đã có trong context
    const { formTable, endpoint } = useContext(TableInfoContext);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleShowAddModal = (e) => {
        setShowAddModal(e);
    };

    const toggleShowDeleteModal = (e) => {
        setShowDeleteModal(e);
    };

    // console.log('check re render');
    // console.log('check: ', formTable);


    return (
        <div className='p-3'>
            <div className=' rounded d-flex justify-content-between'>
                <div className='d-flex'>
                    <Button style={{ width: '100px' }} variant='success'
                        onClick={() => { toggleShowAddModal(true) }}
                        className='me-1 d-flex justify-content-center align-items-center'>
                        <IoMdAdd className='fs-5' /> Thêm
                    </Button>
                    <Button style={{ width: '100px' }} variant='danger'
                        onClick={() => { toggleShowDeleteModal(true) }}
                        disabled={!selectedDatas || !selectedDatas.length}
                        className='d-flex justify-content-center align-items-center'>
                        <FaRegTrashAlt className='pe-1' /> Xóa
                    </Button>
                </div>
                <div className='d-none d-sm-block d-sm-flex'>
                    <Button variant='outline-info'
                        style={{ width: '100px', '--bs-btn-hover-color': 'white', '--bs-btn-active-color': 'light' }}
                        onClick={async () => { await updateData() }}
                        className='me-1 d-flex justify-content-center align-items-center'>
                        <IoReload className='pe-1 fs-5' /> Tải lại
                    </Button>
                    {/* <Button style={{
                        width: '100px',
                        '--bs-btn-bg': '#be44ff',
                        '--bs-btn-border-color': '#be44ff',
                        '--bs-btn-hover-bg': '#cd6eff',
                        '--bs-btn-hover-border-color': '#cd6eff',
                        '--bs-btn-active-bg': '#be44ff',
                        '--bs-btn-active-border-color': '#be44ff',
                    }}
                        // onClick={exportCSV}
                        className='d-flex justify-content-center align-items-center'>
                        <FaFileUpload />
                        Upfile
                    </Button> */}
                </div>
            </div>
            <AddModal
                formTable={formTable}
                endpoint={endpoint}
                updateData={updateData}
                showAddModal={showAddModal}
                toggleShowAddModal={toggleShowAddModal}
            />
            <DeletesModal
                formTable={formTable}
                endpoint={endpoint}
                updateData={updateData}
                selectedDatas={selectedDatas}
                toggleSelectedDatas={toggleSelectedDatas}
                showDeleteModal={showDeleteModal}
                toggleShowDeleteModal={toggleShowDeleteModal}
            />
        </div>
    );
};

export default memo(TableHeader);