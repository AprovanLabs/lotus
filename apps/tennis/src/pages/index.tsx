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
      <h1 className="text-xl" style={{ backgroundColor: "blue" }}>Highly Strung Tennis Tournament</h1>
      <Link href="/contact" style={{ backgroundColor: "green" }}>contact us</Link>
      <Link href="/tournaments" style={{ backgroundColor: "green" }}>tournaments</Link>
      <Link href="/draws" style={{ backgroundColor: "green" }}>draws</Link>
    </BasicLayout>
  );
};

export default HomePage;
