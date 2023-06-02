import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const DrawsPage = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <BasicLayout>
      <h1 className="text-xl" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '2rem', fontWeight: 800, whiteSpace: 'nowrap' }}>2023 Summer Tournaments</h1>
      <p className="">Route {router.pathname}</p>

    </BasicLayout>
  );
};

export default DrawsPage;