import React from 'react';
import Head from 'next/head';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';

const NavBar = () => {
  return (
    <div className="flex justify-between p-11 pb-0">
      <img className="h-36 w-auto" src="/resources/images/lotus.png" alt="Lotus Technical logo" />
      <div className="flex gap-16 pt-10 text-xl text-[#92daf4]">
        {/* CAEBFC */}
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
    <footer className="absolute bottom-0 w-[100%] bg-gradient-to-r from-[#447669] to-[#78B994] mt-auto flex justify-between">
      <div className="flex flex-col gap-y-7 py-20 pl-28 text-xl">
        <a href="tel:7633076500">{phoneNumber}</a>
        <a href="mailto:brousslang@lotustechnical.com">{emailAddress}</a>
        <a
          href="https://maps.google.com/maps?q=7100 Northland Cirle N, Minneapolis, MN 55428"
          target="_blank"
        >
          <div>
            <p>{addressLine1}</p>
            <p>{addressLine2}</p>
            <p>{addressLine3}</p>
          </div>
        </a>
      </div>
      <div className="flex gap-16 mt-auto pb-20 pr-20">
        <a href="https://www.linkedin.com/company/lotus-technical/" target="_blank">
          <Linkedin fill="white" size={36} />
        </a>
        <a href="https://www.facebook.com/LotusTechnical" target="_blank">
          <Facebook fill="white" size={36} />
        </a>
        <a href="https://twitter.com/lotustechnical" target="_blank">
          <Twitter fill="white" size={36} />
        </a>
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
      <main className="pb-96">{children}</main>
      <Footer />
    </div>
  );
};
export default BasicLayout;
