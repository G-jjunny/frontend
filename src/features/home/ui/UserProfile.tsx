import { User } from 'lucide-react';

// interface UserProfileProps {
//   icon?: React.ReactNode;
//   name: string;
// }

const UserProfile = () => {
  return (
    <div className=" flex gap-3 items-center">
      <div className=" rounded-full w-10 aspect-square bg-mega p-2">
        <User className=" text-white w-full h-full" />
      </div>
      <h2 className=" text-lg">정경준</h2>
    </div>
  );
};

export default UserProfile;
