import { Heading } from "@components/common";
import { useAppSelector } from "@store/hook";

const Profile = () => {
  const profileInfo = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Heading name="Profile" />
      <ul>
        <li>First Name : {profileInfo?.firstName}</li>
        <li>Last Name : {profileInfo?.lastName}</li>
        <li>Email : {profileInfo?.email}</li>
      </ul>
    </>
  );
};

export default Profile;
