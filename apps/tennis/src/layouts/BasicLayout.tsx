import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="relative top-0 w-full flex h-16 bg-slate-300 gap-2 items-center pl-2">
    <Image src="/vercel.svg" width={40} height={40} alt="Highly Strung Tennis Tournament" />
    <Link href="/">
      <button className="text-slate-800 transition-all ease-out hover:text-slate-400">Home</button>
    </Link>
    <Link href="/tournaments">
      <button className="text-slate-800 transition-all ease-out hover:text-slate-400">
        Tournaments
      </button>
    </Link>
    <Link href="/contact-us">
      <button className="text-slate-800 transition-all ease-out hover:text-slate-400">
        Contact
      </button>
    </Link>
    <Link href="/draws">
      <button className="text-slate-800 transition-all ease-out hover:text-slate-400">Draws</button>
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
    <div className="absolute w-full h-full flex flex-col">
      <Header />
      <main className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-white p-0">
        {children}
      </main>
      <Footer />
    </div>
  </>
);

export default BasicLayout;
