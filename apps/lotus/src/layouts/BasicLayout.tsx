import React from 'react';
import Head from 'next/head';

const NavBar = () => {
  return (
    <div className="flex justify-between p-11">
      <img className="h-20 w-auto" src="/resources/images/lotus.png" alt="Lotus Technical logo" />
      <div className="flex gap-16 text-lg text-[#92daf4]">
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
  const phoneNumber = '763-307-6500';
  const emailAddress = 'brousslang@lotustechnical.com';
  const addressLine1 = '7100 Northland Cir N';
  const addressLine2 = 'Suite 105';
  const addressLine3 = 'Minneapolis, MN 55428';
  const twitterLink = 'https://twitter.com/lotustechnical';
  const facebookLink = 'https://www.facebook.com/LotusTechnical';
  const linkedInLink = 'https://www.linkedin.com/company/lotus-technical';
  return (
    <footer className="bg-gradient-to-r from-[#447669] to-[#78B994] mt-auto">
      <div className="flex flex-col gap-y-7 py-20 pl-28 text-xl">
        <p>{phoneNumber}</p>
        <p>{emailAddress}</p>
        <div>
          <p>{addressLine1}</p>
          <p>{addressLine2}</p>
          <p>{addressLine3}</p>
        </div>
      </div>
    </footer>
  );
};

const BasicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex flex-col min-h-[140vh]">
      <Head>
        <title>Lotus Technical</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>{children}</main>

      <Footer />
    </div>
  );
};
export default BasicLayout;
