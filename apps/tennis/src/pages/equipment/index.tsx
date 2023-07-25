import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import Image from 'next/image';
import ContactService from 'src/lib/server/contact/contactService';
import { ContactModel } from 'src/lib/core/models/contact';

const EquipmentPage = ({ contact }: { contact: ContactModel }) => {
  const router = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  return (
    <BasicLayout contact={contact}>
      <h1
        className="text-xl"
        style={{
          backgroundColor: '#236494',
          color: 'white',
          marginBottom: '2rem',
          fontWeight: 800,
          whiteSpace: 'nowrap',
        }}
      >
        Equipment
      </h1>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const contact = await ContactService.getContact();

  return {
    props: {
      contact,
    },
  };
}

export default EquipmentPage;
