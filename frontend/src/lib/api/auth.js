import client from "./client";

export const sign = async ({ email, password }) => {
    const res = await client.post(`/auth/sign`, { email: email, password: password });
    if (res.data.message === "Existed User"){
        alert("이미 존재하는 사용자입니다.");
    } else if (res.data.message === "Sign OK"){
        alert("회원 가입 완료")
    }
    return;
};

export const login = async ({ email, password }) => {
    const res = await client.post(`/auth/login`, { email: email, password: password });
    if (res.data.message === "Login OK") {
        localStorage.setItem("accessToken", res.data.result);
        alert("로그인 완료")
    }
    return;
};
