/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Tắt chế độ gọi lại chỉ hiện 1 log
    swcMinify: true, // Sử dụng SWC để giảm thiểu mã nguồn
    headers: async () => [ // Tăng cường bảo mật chống tấn công ...
        {
            // source: '/(.*)',
            source: "/api/(.*)",
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: "default-src 'self'; img-src 'self' data:; script-src 'self'; style-src 'self' 'unsafe-inline';",
                },
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                },
                {
                    key: 'X-Content-Type-Options',
                    value: 'nosniff',
                },
                {
                    key: 'Referrer-Policy',
                    value: 'no-referrer',
                },
            ],
        },
    ],
    async rewrites() {
        return [
            {
                source: '/auth/google',
                destination: 'http://localhost:8000/auth/google',
            },
            {
                source: '/auth/google/callback',
                destination: 'http://localhost:8000/auth/google/callback',
            },
            {
                source: '/auth/facebook',
                destination: 'http://localhost:8000/auth/facebook',
            },
            {
                source: '/auth/facebook/callback',
                destination: 'http://localhost:8000/auth/facebook/callback',
            },
        ];
    },
    images: {
        domains: ['localhost'], // Thêm dòng này để cho phép ảnh từ localhost
    },
};

export default nextConfig;
