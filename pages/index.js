import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userType = process.env.NEXT_PUBLIC_USER_TYPE;
    
    if (userType === 'admin') {
      router.push('/admin');
    } else if (userType === 'user') {
      router.push('/user');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Grant Management System</h1>
      <p className="text-red-500">Invalid user type. Please contact support.</p>
    </div>
  );
}