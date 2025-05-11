// components/UserInfo.tsx
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store'; // Asegúrate de que esta ruta sea correcta

const UserInfo: React.FC = () => {
  const { uid, email, loading, error } = useSelector((state: RootState) => state.auth);

  return (
    <div className='mb-[62px]'>
      <h1>User Info</h1>
      <p><strong>UID:</strong> {uid}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
      <p><strong>Error:</strong> {error}</p>
    </div>
  );
};

export default UserInfo;
