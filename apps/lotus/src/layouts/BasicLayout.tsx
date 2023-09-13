import React from 'react';
import Head from 'next/head';

const NavBar = () => {
  return (
    <div className="flex justify-between">
      <img
        className="h-20 w-auto"
        src="/resources/images/lotus.png"
        alt="Lotus Technical bird logo"
      />
      <div className="flex space-x-4">
        {/* <Image src="/resources/images/lotus.png" width={90} height={90} alt="Bird icon" /> */}
        <a href="/">Home</a>
        <a href="/clients">Clients</a>
        <a href="/job-seekers">Job Seekers</a>
        <a href="/employment-forms">Employment Forms</a>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer>
      <h2>THIS IS A FOOTER</h2>
    </footer>
  );
};

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Lotus Technical</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>

      <Footer />
    </>
  );
};
export default BasicLayout;
