import React, {useEffect} from 'react';
import { useAuth } from './AuthContext';

const MainComp = () => {
    const { userData, login } = useAuth();

    useEffect(() => {
      // Check if user data exists in localStorage on component mount
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const decodedUserData = JSON.parse(storedUserData);
        login(decodedUserData);
      }
    }, [login]);

  return (
    <div>
      {userData && (
        <div>
          <h1>Welcome, {userData.name}</h1>
          {/* Add additional user data as needed */}
        </div>
      )}
    </div>
  );
};

export default MainComp;
