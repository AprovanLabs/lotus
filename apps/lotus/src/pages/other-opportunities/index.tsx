import { Button } from 'src/components/Button';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import Image from 'next/image';
import ContactService from 'src/lib/server/contact/contactService';
import { ContactModel } from 'src/lib/core/models/contact';
import { ChevronDown } from 'lucide-react';

const OtherPage = ({ contact }: { contact: ContactModel }) => {
  const router = useRouter();

  
  const [isDrillsOpen, setIsDrillsOpen] = useState(false);
  const [isRacquetStringingOpen, setIsRacquetStringingOpen] = useState(false);

  return (
    <BasicLayout contact={contact}>
      <div>
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
          Other Opportunities
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          
          <div
            style={{
              marginBottom: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setIsDrillsOpen(!isDrillsOpen)}
          >
            <h2 style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginRight: '0.5rem' }}>
              Drills
            </h2>
            <ChevronDown size={18} />
          </div>
          {isDrillsOpen && (
            <p>Description of the Drills opportunity</p>
          )}

          
          <div
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => setIsRacquetStringingOpen(!isRacquetStringingOpen)}
          >
            <h2 style={{ fontWeight: 'bold', borderBottom: '1px solid #ccc', marginRight: '0.5rem' }}>
              Racquet Stringing
            </h2>
            <ChevronDown size={18} />
          </div>
          {isRacquetStringingOpen && (
            <p>Description of the Racquet Stringing opportunity</p>
          )}
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

export default OtherPage;

