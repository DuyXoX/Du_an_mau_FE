import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
    const donHangHoanThanh = data.filter(order => order.TrangThai === 'hoantat');

    // Doanh thu theo ngày
    const doanhThuTheoNgay = donHangHoanThanh.reduce((acc, order) => {
        const ngay = new Date(order.ThoiGianTao).toLocaleDateString('vi-VN');
        acc[ngay] = (acc[ngay] || 0) + parseFloat(order.TongTien);
        return acc;
    }, {});

    const labels = Object.keys(doanhThuTheoNgay);
    const values = Object.values(doanhThuTheoNgay);

    // console.log('check: ', doanhThuTheoNgay);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Doanh thu',
                data: values,
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                tension: 0.4, // Làm đường cong mềm mại
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Doanh thu theo ngày' },
        },
        animations: {
            tension: {
                duration: 3000,
                easing: 'linear',
                from: 1,
                to: 0,
                loop: true
            }
        },
    };

    return <Line data={chartData} options={options} />;
};

export default LineChart;
