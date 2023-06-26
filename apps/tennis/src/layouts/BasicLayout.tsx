import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { Phone } from 'lucide-react';
import InlineLink from 'src/components/InlineLink';

const ADDRESS = '21095 147th Ave N, Rogers, MN 55374';

const Header: React.FC = () => (
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
  </header>
);

const Footer: React.FC = () => (
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
            <Image src="/resources/images/sponsors-lotus.png" alt="Lotus" width={75} height={100} />
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="flex items-center opacity-100 transition-all ease-in-out hover:cursor-pointer hover:opacity-50"
              href="tel:612-481-9955"
            >
              <Phone className="mr-2" />
              <span>612 481 9955</span>
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
              href="email:brousslang@lotustechnical.com"
            >
              <Mail className="mr-2" />
              <span>brousslang@lotustechnical.com</span>
            </a>
          </div>
        </div>
      </div>
      <div className=" bg-white relative flex-grow h-full my-auto px-12 py-8">
        <div className="absolute -right-2 top-[-25%] z-0">
          <Image
            src={'/resources/images/decoration-racquet.png'}
            width={600}
            height={600}
            alt="Tennis Racquet"
          />
        </div>

        <div className="flex flex-col gap-2 z-50 relative">
          <Link href="/contact-us" className="bg-black mb-1 font-normal text-sm">
            <p className="uppercase hover:cursor-pointer">Contact Us</p>
          </Link>
          <Link href="/tournaments/latest" className="bg-black mb-1 font-normal text-xs">
            <p className="uppercase hover:cursor-pointer">Tournaments</p>
          </Link>
          <Link href="/draws" className="bg-black mb-1 font-normal text-xs">
            <p className="uppercase hover:cursor-pointer">Draws</p>
          </Link>
          <Link href="/sponsors" className="bg-black mb-1 font-normal text-xs">
            <p className="uppercase hover:cursor-pointer">Sponsors</p>
          </Link>
        </div>
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
          backgroundColor: 'white',
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
