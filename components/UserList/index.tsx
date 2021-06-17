import styled from '@emotion/styled';

import UserCard from '../UserCard';

const UserListWarpper = styled.ul`
  display: grid;
  grid-auto-rows: 150px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  margin: 30px;
  @media (max-width: 1150px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 680px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const UserList = ({ userData }: any) => {
  return (
    <>
      <UserListWarpper className="user-list-wrapper">
        {userData && userData.map((user: any) => <UserCard userData={user} key={user.id} />)}
      </UserListWarpper>
    </>
  );
};

export default UserList;
