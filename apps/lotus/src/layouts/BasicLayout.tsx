import React from 'react';
import Head from 'next/head';
import { Twitter } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { FooterModel } from 'src/lib/core/models/footer';
import { cn } from 'src/core/utils';

const NavBar = ({ className }: { className: string }) => {
  return (
    <div className={cn('z-50 flex justify-between p-11 pb-0 text-[#00A7E4]', className)}>
      <a href="/">
        <img className="w-auto h-36" src="/resources/images/lotus.png" alt="Lotus Technical logo" />
      </a>
      <div className="flex gap-16 pt-10 font-mono font-semibold">
        <a className="hover:underline underline-offset-3" href="/clients">
          Clients
        </a>
        <a className="hover:underline underline-offset-3" href="/job-seekers">
          Job Seekers
        </a>
        <a className="hover:underline underline-offset-3" href="/employment-forms">
          Employment Forms
        </a>
        <a className="hover:underline underline-offset-3" href="/current-openings">
          Current Openings
        </a>
        <a
          className="hover:underline underline-offset-3"
          href={`mailto:brousslang@lotustechnical.com`}
        >
          Contact Us
        </a>
      </div>
    </div>
  );
};

const Footer = ({ footer }: { footer: FooterModel | undefined }) => {
  return (
    <footer className="relative bottom-0 flex flex-col justify-around w-full py-16 bg-white gap-28 md:py-28 md:flex-row md:px-28">
      <div className="flex flex-col mx-auto font-mono gap-y-7 lg:mx-0">
        <a href={`tel:${footer?.phoneNumber.replaceAll('-', '')}`}>{footer?.phoneNumber}</a>
        <a href={`mailto:${footer?.emailAddress}`}>{footer?.emailAddress}</a>
        <a href={footer?.googleMapsLink} target="_blank" rel="noreferrer">
          <div>
            <p>{footer?.addressLine1}</p>
            <p>{footer?.suiteNumber}</p>
            <p>{footer?.addressLine2}</p>
          </div>
        </a>
      </div>
      <div className="w-0.5 bg-[#011F33] h-48 mt-auto mb-auto hidden md:block"></div>
      <div className="flex items-center justify-center gap-16 md:pb-0">
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

const BasicLayout = ({
  children,
  footer,
  navFolded,
}: {
  children: React.ReactNode;
  footer: FooterModel | undefined;
  navFolded?: boolean;
}) => {
  return (
    <div className="relative flex flex-col text-xl text-[#011F33]">
      <Head>
        <title>Lotus Technical</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar className={cn(navFolded && 'mb-[-12em]')} />
      <div className="min-h-screen">
        <main className="relative">{children}</main>
      </div>
      <Footer footer={footer} />
    </div>
  );
};

export default BasicLayout;
