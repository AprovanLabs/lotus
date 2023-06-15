import Link from 'next/link';
import BasicLayout from '../layouts/BasicLayout';

/**
 * Each folder under '/pages' matches up to a route on the website. The 'index.tsx' file within that folder is the code that runs for that page
 *
 * For example, this file is the code that runs for the home page (https://<tennis-site>.com/)
 */
const HomePage = () => {
  return (
    // We use 'layout' files to control how the page looks. This is a good place to put things like headers, footers, navigation, etc. This makes things appear consistent across the site
    <BasicLayout>
      <h1 className="text-xl" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '2rem', fontWeight: 800, whiteSpace: 'nowrap' }}>Highly Strung Tennis Tournament</h1>
      <Link href="/contact-us" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>Contact Us</Link>
      <Link href="/tournaments" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>Tournaments</Link>
      <Link href="/draws" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>Draws</Link>
      <Link href="/sponsors" style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '1rem', fontWeight: 500 }}>Sponsors</Link>
    </BasicLayout>
  );
};

export default HomePage;
