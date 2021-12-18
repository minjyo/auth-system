import React from "react";
import styled from "styled-components";
import palette from "../../lib/styles/palette";
import Button from "../common/Button";

const UserListBlock = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
`;

const Title = styled.div`
    font-size: 25px;
    margin: 2rem;
`;

const UserBox = styled.div`
    display: flex;
    flex-direction: row;
`;

const UserInfoBox = styled.div`
    display: flex;
    flex-direction: row;
    width: 500px;
    border: none;
    background-color: #eeeeee;
    padding: 1rem;
    border-radius: 3px 3px 0 0;
    margin: 1rem;
    justify-content: space-between;
`;

const UserInfo = styled.div`
    width: 100px;
    text-align: center;
`;

const UserActionButton = styled(Button)``;

const UserList = ({ users, onDelete, onAdmin }) => {
    return (
        <UserListBlock>
            <Title>유저 리스트</Title>
            {users &&
                users.map((user) => (
                    <UserBox>
                        <UserInfoBox>
                            <UserInfo>{user.email}</UserInfo>
                            <UserInfo>{user.role ? "관리자" : "일반 사용자"} </UserInfo>
                            <UserInfo>{user.intro}</UserInfo>
                        </UserInfoBox>
                        <UserActionButton onClick={onDelete} text={"삭제"}></UserActionButton>
                        <UserActionButton onClick={onAdmin} text={"관리자 권한"}></UserActionButton>
                    </UserBox>
                ))}
        </UserListBlock>
    );
};

export default UserList;
