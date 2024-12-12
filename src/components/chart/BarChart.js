import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    // Tổng số hóa đơn theo trạng thái
    const hoaDonTheoSanPham = data.reduce((acc, order) => {
        order.SanPham.forEach(sp => {
            acc[sp.TenSanPham] = (acc[sp.TenSanPham] || 0) + 1;
        });
        return acc;
    }, {});

    const labels = Object.keys(hoaDonTheoSanPham);
    const values = Object.values(hoaDonTheoSanPham);

    // console.log('check: ', values);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Số lượng hóa đơn',
                data: values,
                backgroundColor: '#00d4ff7a',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Tổng số hóa đơn theo sản phẩm' },
        },
    };

    return <Bar className='' data={chartData} options={options} />;
};

export default BarChart;
