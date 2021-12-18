import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";

const UserListBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const UserBlock = styled.div`
    width: 500px;
    border: none;
    background-color: #eeeeee;
    padding: 1rem;
    border-radius: 3px 3px 0 0;
    margin: 1rem 0;
`;

const AuthButtons = ({ users, onDelete, onAdmin }) => {
    return (
        <UserListBlock>
            {users.map((user) => {
                <UserBlock>{user.email}</UserBlock>;
            })}
        </UserListBlock>
    );
};

export default AuthButtons;
