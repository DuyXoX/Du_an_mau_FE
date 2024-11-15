import React, { useEffect, useRef, useState } from 'react';
import InputGroup from '../InputGroup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './InputForm.scss';
import '../InputGroup.scss';
import { Form } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Image from 'next/image';
import { useGetData } from '@/service/apiServive';

const InputFormSanPham = ({ formData, errors, handleChange }) => {
    const quillRef = useRef(null);
    const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

    const { data: DonViTinh, error: errDVT } = useGetData('/dvt');
    const { data: LoaiSanPham, error: errLSP } = useGetData('/loaisp');

    useEffect(() => {
        return () => {
            imagePreviewUrls && URL.revokeObjectURL(imagePreviewUrls.preview);
        }
    }, [imagePreviewUrls])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files); // Chuyển đổi FileList thành mảng
        const newImagePreviewUrls = files.map(file => {
            file.preview = URL.createObjectURL(file);
            return file;
        });
        // console.log('check: ', files);

        setImagePreviewUrls(newImagePreviewUrls)
        handleChange({ target: { name: 'HinhAnh', value: files } });
    };

    if (errDVT) {
        return console.log('Error: ', errDVT);
    }
    if (errLSP) {
        return console.log('Error: ', errLSP);
    }

    // console.log('check: ', formData?.ChiTietSanPhamId);
    // console.log('check Error: ', errors);

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
            <div className='inputGroup'>
                <Form.Select
                    required
                    name="DonViTinhID"
                    value={formData.DonViTinhID}
                    onChange={handleChange}
                    aria-label="Chọn đơn vị tính"
                >
                    <option value="">Đơn Vị Tính</option>
                    {DonViTinh?.map((donVi, idx) => (
                        <option key={idx} value={donVi.DonViTinhID}>
                            {donVi.TenDonVi}
                        </option>
                    ))}
                </Form.Select>
                {errors.DonViTinhID &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.DonViTinhID}
                    </span>
                }
            </div>
            <div className='inputGroup'>
                <Form.Select
                    required
                    name="LoaiSanPhamId"
                    value={formData.LoaiSanPhamId || ''}
                    onChange={handleChange}
                    aria-label="Chọn loại sản phẩm"
                >
                    <option value="">Loại Sản Phẩm</option>
                    {LoaiSanPham?.map((loaiSP, idx) => (
                        <option key={idx} value={loaiSP.LoaiSanPhamId}>
                            {loaiSP.TenLoai}
                        </option>
                    ))}
                </Form.Select>
                {errors.LoaiSanPhamId &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.LoaiSanPhamId}
                    </span>
                }
            </div>
            <div className="inputGroup d-none">
                <input type="text" name='ChiTietSanPhamId' required
                    value={formData.ChiTietSanPhamId || (formData.PhanLoai && formData.PhanLoai[0]?.ChiTietSanPhamId) || ' '}
                    onChange={(e) => handleChange({ target: { name: 'ChiTietSanPhamId', value: e.target.value, PhanLoai: [{ ...formData.PhanLoai[0], ChiTietSanPhamId: e.target.value }] } })}
                />
            </div>
            <div className="inputGroup">
                <input type="text" name='LoaiChiTiet' required
                    value={formData.LoaiChiTiet || (formData.PhanLoai && formData.PhanLoai[0]?.LoaiChiTiet) || ''}
                    onChange={(e) => handleChange({ target: { name: 'LoaiChiTiet', value: e.target.value, PhanLoai: [{ ...formData.PhanLoai[0], LoaiChiTiet: e.target.value }] } })}
                />
                <label>Loại Chi Tiết</label>
                {errors.LoaiChiTiet &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.LoaiChiTiet}
                    </span>
                }
            </div>
            <div className="inputGroup">
                <input type="number" name='Gia' required
                    value={formData.Gia || (formData.PhanLoai && formData.PhanLoai[0]?.Gia) || ''}
                    onChange={(e) => handleChange({ target: { name: 'Gia', value: e.target.value, PhanLoai: [{ ...formData.PhanLoai, Gia: e.target.value }] } })}
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
                <input type="number" name='SoLuong' required
                    value={formData.SoLuong || formData.PhanLoai[0]?.SoLuong}
                    onChange={(e) => handleChange({ target: { name: 'SoLuong', value: e.target.value, PhanLoai: [{ ...formData.PhanLoai[0], SoLuong: e.target.value }] } })}
                />
                <label>Số Lượng Kho</label>
                {errors.SoLuong &&
                    <span
                        style={{ fontSize: '.75rem' }}
                        className='text-orange'>
                        {errors.SoLuong}
                    </span>
                }
            </div>
            <div className="inputGroup">
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
                            // ['image', 'video', 'code-block'], // Thêm nút video
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
                    multiple
                    onChange={handleImageUpload}
                />
                <div className='mt-3 d-flex flex-wrap'>
                    {imagePreviewUrls?.map((file, idx) => (
                        <div key={idx}>
                            <Image src={file?.preview} alt='Ảnh sản phẩm' className='me-2' width={80} height={80} />
                        </div>
                    ))}
                    {errors.HinhAnh &&
                        <span
                            style={{ fontSize: '.75rem' }}
                            className='text-orange'>
                            {errors.HinhAnh}
                        </span>
                    }
                </div>
            </div>
        </InputGroup>
    );
};

export default InputFormSanPham;