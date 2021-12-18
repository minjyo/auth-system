import client from "./client";

export const getInfo = async () => {
    const res = await client.get(`/user/info`, {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    });

    if (res.data.message === "Get User Info OK") {
        return res.data.result.role;
    }
    return false;
};

export const login = async ({ email, password }) => {
    const res = await client.post(`/auth/login`, { email: email, password: password });
    if (res.data.message === "Login OK") {
        localStorage.setItem("accessToken", res.data.result);
    }
    return;
};
