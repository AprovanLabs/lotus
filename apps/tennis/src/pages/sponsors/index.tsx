import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import Image from 'next/image';
import ContactService from 'src/lib/server/contact/contactService';
import { ContactModel } from 'src/lib/core/models/contact';

const SponsorsPage = ({ contact }: { contact: ContactModel }) => {
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
        Sponsors
      </h1>
      <Image src="/resources/images/brian.png" width={150} height={150} alt="Lotus Tech. CEO" />
      <h1
        className="text-xs"
        style={{
          backgroundColor: '#a4c36c',
          color: 'white',
          marginBottom: '.5rem',
          fontWeight: 800,
          whiteSpace: 'nowrap',
        }}
      >
        Brian Rousslang
      </h1>
      <h1
        className="text-xs"
        style={{
          backgroundColor: '#a4c36c',
          color: 'white',
          marginBottom: '1rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        Lotus Technical CEO
      </h1>
      <Image src="/resources/images/sponsor-trinite.png" width={100} height={100} alt="trinite" />
      <br></br>
      <h1
        className="text-xs"
        style={{
          backgroundColor: '#a4c36c',
          color: 'white',
          marginBottom: '1rem',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        Trinite Corp.
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

export default SponsorsPage;
