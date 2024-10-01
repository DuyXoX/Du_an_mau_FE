import { jwtDecode } from 'jwt-decode';

const key = process.env.NEXT_PUBLIC_KEY_TOKEN;
const KEY_AUTHEN = process.env.NEXT_PUBLIC_KEY_TOKEN_AUTHEN;

export const jwtVerify = async (token) => {
    return jwtDecode(token, key);
}

export const jwtVerifyAuthen = async (token) => {
    return jwtDecode(token, KEY_AUTHEN);
}