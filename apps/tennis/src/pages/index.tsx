import Link from 'next/link';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';
import BasicLayout from '../layouts/BasicLayout';
import Image from 'next/image';

/**
 * Each folder under '/pages' matches up to a route on the website. The 'index.tsx' file within that folder is the code that runs for that page
 *
 * For example, this file is the code that runs for the home page (https://<tennis-site>.com/)
 */
const HomePage = () => {
  return (
    // We use 'layout' files to control how the page looks. This is a good place to put things like headers, footers, navigation, etc. This makes things appear consistent across the site
    <BasicLayout>
      <div
        className={css`
          background: #1F3427;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding-left: 2rem;
          color: white;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgb(31,52,39);
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(31,52,39,1) 60%), url('/resources/images/rtc-inside.jpeg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: left;
          `}
        />
        <h1 className="text-xl" style={{ backgroundColor: '#236494', marginBottom: '2rem', fontWeight: 800, whiteSpace: 'nowrap' }}>
          Highly Strung Tennis Tournament
        </h1>
        <Link href="/contact-us" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>
          Contact Us
        </Link>
        <Link href="/tournaments" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>
          Tournaments
        </Link>
        <Link href="/draws" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>
          Draws
        </Link>
        <Link href="/sponsors" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>
          Sponsors
        </Link>
      </div>
    </BasicLayout>
  );
};

export default HomePage;