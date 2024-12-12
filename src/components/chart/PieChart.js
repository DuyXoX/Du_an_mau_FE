import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
    // Tỷ lệ đơn hàng theo trạng thái
    const sanPhamBanChay = data.reduce((acc, order) => {
        acc[order.TrangThai] = (acc[order.TrangThai] || 0) + 1;
        return acc;
    }, {});

    const statusType = {
        'dangxu ly': 'Đang sử lý',
        'chogiaohang': 'Chờ giao hàng',
        'danggiao': 'Đang giao',
        'hoantat': 'Hoàn tất',
        'huy': 'Đã hủy'
    }

    const labels = Object.keys(sanPhamBanChay).map(status => statusType[status]);// Chuyển đổi trạng thái thành tên hiển thị
    const values = Object.values(sanPhamBanChay);
    // console.log('check: ', labels);

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: [
                    '#94ff00',
                    '#58ffa8',
                    '#12e5e5',
                    '#ff5757',
                    '#ffeb91',
                ],
                borderColor: [
                    '#94ff00',
                    '#58ffa8',
                    '#12e5e5',
                    '#ff5757',
                    '#fffa91',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Tỷ lệ đơn hàng theo trạng thái' },
        },
    };

    return <Pie data={chartData} options={options} />;
};

export default PieChart;
