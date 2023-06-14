import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';

const Header: React.FC = () => (
  <header
    style={{
      backgroundColor: 'var(--court-blue-600)',
      position: 'relative',
      padding: '1rem 0.5rem',
      top: 0,
      width: '100%',
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      borderBottom: '0.5rem solid white',
      boxShadow: 'var(--shadow-md)',
    }}
  >
    <Image
      src="/resources/images/icon-tennis-ball.png"
      width={40}
      height={40}
      alt="Highly Strung Tennis Tournament"
      style={{
        margin: '0 0.5rem',
      }}
    />
    <Link href="/">
      <button style={{ color: 'white' }} className="transition-all ease-out hover:text-slate-800">
        Home
      </button>
    </Link>
    <Link href="/tournaments">
      <button style={{ color: 'white' }} className="transition-all ease-out hover:text-slate-800">
        Tournaments
      </button>
    </Link>
    <Link href="/contact-us">
      <button style={{ color: 'white' }} className="transition-all ease-out hover:text-slate-800">
        Contact
      </button>
    </Link>
  </header>
);

const Footer: React.FC = () => (
  <footer className="relative bottom-0 w-full bg-white">
    <div className="flex justify-between">
      <div className="bg-white p-4">
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Phone />
            </div>
            <span>612 481 9955</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <MapPin />
            </div>
            <span>Rogers Tennis Club</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <Mail />
            </div>
            <span>brousslang@lotustechnical.com</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-4">
        <div className="flex flex-col">
          <Link
            href="/contact-us"
            style={{ color: 'black', marginBottom: '0.5rem', fontWeight: 400, fontSize: '0.8rem' }}
          >
            Contact Us
          </Link>
          <Link
            href="/tournaments"
            style={{ color: 'black', marginBottom: '0.5rem', fontWeight: 400, fontSize: '0.8rem' }}
          >
            Tournaments
          </Link>
          <Link
            href="/draws"
            style={{ color: 'black', marginBottom: '0.5rem', fontWeight: 400, fontSize: '0.8rem' }}
          >
            Draws
          </Link>
          <Link
            href="/sponsors"
            style={{ color: 'black', marginBottom: '0.5rem', fontWeight: 400, fontSize: '0.8rem' }}
          >
            Sponsors
          </Link>
        </div>
        <Image
          src={'/resources/images/decoration-racquet.png'}
          width={300}
          height={300}
          alt="Tennis Racquet"
          style={{
            position: 'absolute',
            right: '-2rem',
            top: '0rem',
          }}
        />
      </div>
    </div>
  </footer>
);

const BasicLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Head>
      <title>Highly Strung Tennis Tournament</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="absolute w-full h-fit flex flex-col">
      <Header />
      <main
        style={{
          backgroundColor: 'red',
        }}
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white p-0"
      >
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default BasicLayout;
