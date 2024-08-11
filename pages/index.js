import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

export default function Home() {
  const [userType, setUserType] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // In a real application, this would be determined by authentication
    setUserType(process.env.NEXT_PUBLIC_USER_TYPE);
  }, []);

  if (!userType) {
    return <div>Loading...</div>;
  }

  if (userType === 'admin') {
    return <AdminDashboard />;
  } else if (userType === 'user') {
    return <UserDashboard />;
  } else {
    // Handle invalid user type
    return <div>Invalid user type</div>;
  }
}