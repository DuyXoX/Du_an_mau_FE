import React, { useRef, useState } from 'react';
import InputGroup from '../InputGroup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './InputForm.scss';
import '../InputGroup.scss';
import { Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const InputFormSanPham = ({ formData, errors, handleChange }) => {
    const quillRef = useRef(null);

    const insertImage = (url) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, 'image', url);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            insertImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const insertVideo = (url) => {
        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        const videoEmbed = `<iframe width="560" height="315" src="${url}" frameborder="0" allowfullscreen></iframe>`;
        quill.clipboard.dangerouslyPasteHTML(range.index, videoEmbed);
    };

    const handleVideoInsert = () => {
        const videoUrl = prompt("Nhập URL video:");
        if (videoUrl) {
            insertVideo(videoUrl);
        }
    };

    return (
        <InputGroup>
            <div className="inputGroup">
                <input type="text" name='TenSanPham' required
                    value={formData.TenSanPham}
                    onChange={handleChange}
                />
                <label>Tên Sản Phẩm</label>
                {errors.TenSanPham &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.TenSanPham}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="text" name='Gia' required
                    value={formData.Gia}
                    onChange={handleChange}
                />
                <label>Giá</label>
                {errors.Gia &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.Gia}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='SoLuongKho' required
                    value={formData.SoLuongKho}
                    onChange={handleChange}
                />
                <label>Số Lượng Kho</label>
                {errors.SoLuongKho &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.SoLuongKho}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='LoaiSanPhamId' required
                    value={formData.LoaiSanPhamId}
                    onChange={handleChange}
                />
                <label>Loại Sản Phẩm</label>
                {errors.LoaiSanPhamId &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.LoaiSanPhamId}
                    </span>
                }
            </div>
            <div className="inputGroup">
                {/* <textarea type="text" name='MoTa' required
                    value={formData.MoTa}
                    onChange={handleChange}
                /> */}
                <label>Mô Tả</label>
                <ReactQuill
                    ref={quillRef}
                    value={formData.MoTa}
                    onChange={(value) => handleChange({ target: { name: 'MoTa', value } })}
                    placeholder="Nhập mô tả sản phẩm của bạn..."
                    modules={{
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['image', 'video', 'code-block'], // Thêm nút video
                        ],
                    }}
                />
                {errors.MoTa &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.MoTa}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input
                    type="file"
                    name='HinhAnh'
                    required
                    accept="image/*"
                    multiple // Thêm thuộc tính này để cho phép chọn nhiều file
                    onChange={handleChange}
                />
                {/* <label>Hình Ảnh</label> */}
                {errors.HinhAnh &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.HinhAnh}
                    </span>
                }
            </div>

            {/* <div className='inputGroup'>
                <Form.Select
                    required
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    aria-label="Chọn vai trò"
                >
                    <option value="">Chọn vai trò</option>
                    <option value="user">Người dùng</option>
                    <option value="quanly">Quản lý</option>
                    <option value="admin">Admin</option>
                </Form.Select>
                {errors.role &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.role}
                    </span>
                }
            </div> */}

        </InputGroup>
    );
};

export default InputFormSanPham;