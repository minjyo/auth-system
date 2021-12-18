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
    const res = await client.get(
        `/user/intro`,
        { intro: intro },
        {
            headers: {
                Authorization: `${localStorage.getItem("accessToken")}`,
            },
        }
    );
    return false;
};
