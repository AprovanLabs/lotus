import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import { ContactModel } from 'src/lib/core/models/contact';
import Head from 'next/head';
import InlineLink from 'src/components/InlineLink';

const ADDRESS = '21095 147th Ave N, Rogers, MN 55374';

const formatPhoneNumber = (phoneNumber: number) => {
  const phoneNumberString = `${phoneNumber}`;
  const chunk1 = phoneNumberString.slice(0, 3);
  const chunk2 = phoneNumberString.slice(3, 6);
  const chunk3 = phoneNumberString.slice(6);
  return `${chunk1}-${chunk2}-${chunk3}`;
};

// Header component
const Header = () => (
  <header
    style={{
      backgroundColor: 'var(--court-blue-600)',
      position: 'relative',
      padding: '1rem 0.5rem',
      top: 0,
      width: '100%',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      borderBottom: '0.5rem solid white',
      boxShadow: 'var(--shadow-md)',
    }}
  >
    <Image
      src="/resources/images/icon-tennis-ball.png"
      width={25}
      height={25}
      alt="Highly Strung Tennis Tournament"
      style={{
        margin: '0 0.5rem',
      }}
    />
    <InlineLink href="/" className="font-normal">
      Home
    </InlineLink>
    <InlineLink href="/tournaments/latest" className="font-normal">
      Tournaments
    </InlineLink>
    <InlineLink href="/draws/latest" className="font-normal">
      Draws
    </InlineLink>
    <InlineLink href="/contact-us" className="font-normal">
      Contact
    </InlineLink>
    {/* <InlineLink href="/equipment" className="font-normal">
      Equipment
    </InlineLink>
    <InlineLink href="/other-opportunities" className="font-normal">
      Other
    </InlineLink> */}
  </header>
);

// Footer component
const Footer = ({ contact }: { contact: ContactModel }) => {
  const formattedPhoneNumber = formatPhoneNumber(contact.phoneNumber);

  return (
    <footer className="relative bottom-0 w-full bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row gap-12 justify-around">
        <div className="bg-white px-12 py-24 sm:py-12 flex-grow">
          <div className="flex flex-col">
            <div className="flex items-center mb-2 gap-2 justify-center sm:justify-start">
              <Image
                src="/resources/images/sponsor-trinite.png"
                alt="Trinite"
                width={75}
                height={400}
              />
              <Image
                src="/resources/images/sponsor-jj.webp"
                alt="Jimmy Johns"
                width={60}
                height={800}
              />
              <Image
                src="/resources/images/sponsors-lotus.png"
                alt="Lotus"
                width={75}
                height={100}
              />
            </div>
            <div className="flex flex-col gap-2">
              <a
                className="flex items-center opacity-100 transition-all ease-in-out hover:cursor-pointer hover:opacity-50"
                href={`tel:${formattedPhoneNumber}`}
              >
                <Phone className="mr-2" />
                <span>{formattedPhoneNumber}</span>
              </a>
              <a
                className="flex items-center opacity-100 transition-all ease-in-out hover:cursor-pointer hover:opacity-50"
                href={`https://www.google.com/maps/search/?api=1&query=${ADDRESS}`}
              >
                <MapPin className="mr-2" />
                <span>Rogers Tennis Club</span>
              </a>
              <a
                className="flex items-center opacity-100 transition-all ease-in-out hover:cursor-pointer hover:opacity-50"
                href={`mailto:${contact.email}`}
              >
                <Mail className="mr-2" />
                <span>{contact.email}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white relative flex-grow h-full my-auto px-12 py-8">
          <div className="absolute -right-2 top-[-25%] z-0">
            <Image
              src="/resources/images/decoration-racquet.png"
              width={600}
              height={600}
              alt="Tennis Racquet"
            />
          </div>

          <div className="flex flex-col gap-2 z-50 relative">
            <Link href="/contact-us" passHref>
              <a className="mb-1 font-normal text-xs uppercase hover:cursor-pointer">
                <p>Contact Us</p>
              </a>
            </Link>
            <Link href="/tournaments/latest" passHref>
              <a className="mb-1 font-normal text-xs uppercase hover:cursor-pointer">
                <p>Tournaments</p>
              </a>
            </Link>
            <Link href="/draws/latest" passHref>
              <a className="mb-1 font-normal text-xs uppercase hover:cursor-pointer">
                <p>Draws</p>
              </a>
            </Link>
            {/* <Link href="/equipment" passHref>
              <a className="mb-1 font-normal text-xs uppercase hover:cursor-pointer">
                <p>Equipment</p>
              </a>
            </Link> */}
            {/* <Link href="/other-opportunities" passHref>
              <a className="mb-1 font-normal text-xs uppercase hover:cursor-pointer">
                <p>Other</p>
              </a>
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

// BasicLayout component
const BasicLayout = ({
  contact,
  children,
}: {
  contact: ContactModel;
  children: React.ReactNode;
}) => (
  <>
    <Head>
      <title>Highly Strung Tennis Tournament</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="absolute w-full h-fit min-h-screen flex flex-col">
      <Header />
      <main
        style={{
          backgroundColor: 'white',
        }}
        className="relative  flex h-fit w-full flex-col items-center justify-start overflow-hidden bg-white p-0"
      >
        {children}
      </main>
      <Footer contact={contact} />
    </div>
  </>
);

export default BasicLayout;
