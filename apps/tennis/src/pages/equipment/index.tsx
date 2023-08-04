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
      <div
        style={{
          backgroundColor: 'white',
          color: 'black',
          marginBottom: '2rem',
          fontWeight: 800,
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '4rem',
          width: '100%',
        }}
      >
        <h1 className="text-3xl">Featured Items</h1>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          minHeight: '100vh',
          width: '100vw',
          padding: '0 2rem 6rem 2rem',
        }}
      >

        {/* Box 1 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 1</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 2 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 2</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 3 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 3</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 4 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 4</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 5 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 5</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 6 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 6</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 7 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 7</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>

        {/* Box 8 */}
        <div
          style={{
            border: '2px solid black',
            padding: '1rem',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2 style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>Equipment 8</h2>
          <Image src="/resources/images/tshirt.png" width={120} height={120} alt="Tennis Ball Icon" />
          <p>Description of equipment</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>$00.00</p>
          <p style={{ fontSize: '0.7rem', color: 'gray' }}>out of stock</p>
        </div>
      </div>
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

