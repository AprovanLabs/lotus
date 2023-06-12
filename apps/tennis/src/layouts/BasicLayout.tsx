import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

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
  <footer className="relative bottom-0 w-full h-12 bg-slate-400">
    <div className="flex flex-row justify-center items-center h-full">
      <p className="text-white">2023 Highly Strung Tennis Tournament</p>
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
      <main className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white p-0">
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default BasicLayout;
