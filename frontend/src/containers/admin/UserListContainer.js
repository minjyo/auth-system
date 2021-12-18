import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import AuthButtons from "../../components/auth/AuthButtons";
import { login, sign } from "../../lib/api/auth";
import { useNavigate } from "react-router-dom";

const UserListContainer = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (field) => {
        if (field.key === "email") {
            setEmail(field.value);
        } else {
            setPassword(field.value);
        }
    };

    const navigate = useNavigate();

    return (
        <>
            <AuthForm email={email} password={password} onChange={onChange}></AuthForm>
            <AuthButtons
                onLogin={() => {
                    login({ email, password });
                    navigate("/");
                }}
                onSign={sign}
                email={email}
                password={password}
            ></AuthButtons>
        </>
    );
};

export default UserListContainer;
