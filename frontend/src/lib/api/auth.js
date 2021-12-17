import client from "./client";

export const sign = async ({ email, password }) => {
    const res = await client.post(`/auth/sign`, { email: email, password: password });
    return;
};

export const login = async ({ email, password }) => {
    const res = await client.post(`/auth/login`, { email: email, password: password });
    localStorage.setItem("accessToken", res.data.result);
    return;
};
