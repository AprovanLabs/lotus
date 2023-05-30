import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const ContactPage = () => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);


  return (
    <BasicLayout>
      <h1>Contact Us</h1>
    
    </BasicLayout>
  );
};

export default ContactPage;