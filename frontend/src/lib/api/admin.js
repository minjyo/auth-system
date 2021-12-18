import client from "./client";

export const getUsers = async () => {
    const res = await client.get(`/admin/users`, {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    });

    if (res.data.message === "Get Users OK") {
        return res.data.result;
    }
    return false;
};

export const deleteUser = async (email) => {
    const res = await client.post(
        `/admin/user`,
        { email: email },
        {
            headers: {
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
        }
    );

    return false;
};

export const setAdmin = async (email) => {
    const res = await client.post(
        `/admin/setAdmin`,
        { email: email },
        {
            headers: {
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
        }
    );

    return false;
};
