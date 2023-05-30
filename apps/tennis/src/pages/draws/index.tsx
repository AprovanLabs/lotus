import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const DrawsPage = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <BasicLayout>
      <h1 className="text-xl">Draws Page</h1>
      <p className="">Route {router.pathname}</p>

    </BasicLayout>
  );
};

export default DrawsPage;