import { useUser } from '../contexts/UserContext';

export default function UserAvatar() {
  const { user, logout } = useUser();

  if (!user) return null;

  return (
    <div className="flex items-center">
      {user.avatar ? (
        <img
          src={user.avatar}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
      )}
      <button
        onClick={logout}
        className="ml-2 text-sm text-gray-600 hover:text-gray-900"
      >
        Logout
      </button>
    </div>
  );
}