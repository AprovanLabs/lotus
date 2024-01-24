import React from 'react';
import Head from 'next/head';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { FooterModel } from 'src/lib/core/models/footer';
import  FooterService from 'src/lib/server/footer/footerService'

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

const Footer = ({footer} : {footer: FooterModel | undefined}) => {
  return (
    <footer className="relative bottom-0 w-[100%] bg-white flex justify-around">
      <div className="flex flex-col gap-y-7 py-20 pl-28 text-xl">
        <a href={`tel:${footer?.phoneNumber.replaceAll("-", "")}`}>{footer?.phoneNumber}</a>
        <a href={`mailto:${footer?.emailAddress}`}>{footer?.emailAddress}</a>
        <a
          href={footer?.googleMapsLink}
          target="_blank" rel="noreferrer"
        >
          <div>
            <p>{footer?.addressLine1}</p>
            <p>{footer?.suiteNumber}</p>
            <p>{footer?.addressLine2}</p>
          </div>
        </a>
      </div>
      <div className="w-0.5 bg-[#011F33] h-48 mt-auto mb-auto"></div>
      <div className="flex gap-16 mt-auto mb-auto">
        <a href={footer?.linkedInLink} target="_blank" rel="noreferrer">
          <Linkedin fill="#011F33" size={36} />
        </a>
        <a href={footer?.facebookLink} target="_blank" rel="noreferrer">
          <Facebook fill="#011F33" size={36} />
        </a>
        <a href={footer?.twitterLink} target="_blank" rel="noreferrer">
          <Twitter fill="#011F33" size={36} />
        </a>
      </div>
    </footer>
  );
};

const BasicLayout = ({ children, footer }: { children: React.ReactNode, footer: FooterModel | undefined }) => {
  return (
    <div className="relative flex flex-col min-h-[140vh]">
      <Head>
        <title>Lotus Technical</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="relative">{children}</main>
      <Footer footer={footer} />
    </div>
  );
};

export default BasicLayout;
