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

export const getUsers = async () => {
    const res = await client.get(`/user/users`, {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    });

    if (res.data.message === "Get Users OK") {
        return res.data.result;
    }
    return false;
};
