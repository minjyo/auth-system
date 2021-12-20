import client from "./client";

export const getInfo = async () => {
    const res = await client.get(`/user/info`, {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    });

    if (res.data.message === "Get User Info OK") {
        return res.data.result;
    }
    return false;
};

export const postIntro = async (intro) => {
    const res = await client.post(
        `/user/intro`,
        { intro: intro },
        {
            headedrs: {
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
        }
    );
    return false;
};

export const isAdmin = async () => {
    const res = await client.get(`/user/admin`, {
        headers: {
            Authorization: `${localStorage.getItem("accessToken")}`,
        },
    });

    return res.data.result;
};
