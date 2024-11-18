import { jwtDecode } from 'jwt-decode';

const key = process.env.NEXT_PUBLIC_KEY_TOKEN;

export const jwtVerify = (token) => {
    return jwtDecode(token, key);
}