import React, { useState } from 'react';
import Head from 'next/head';
import { Menu, Twitter, X } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Linkedin } from 'lucide-react';
import { FooterModel } from 'src/lib/core/models/footer';
import { cn } from 'src/core/utils';
import Link from 'next/link';

const NavBar = ({ className }: { className: string }) => {
  const [navToggle, setNavToggle] = useState(false);
  return (
    <>
      <div
        className={cn(
          'z-50 justify-between p-11 text-[#00A7E4] hidden xl:flex text-2xl',
          className
        )}
      >
        <Link href="/">
          <img
            className="w-auto cursor-pointer h-36"
            src="/resources/images/lotus.png"
            alt="Lotus Technical logo"
          />
        </Link>
        <div className="flex gap-16 pt-10 font-mono font-semibold">
          <Link href="/clients">
            <p className="cursor-pointer hover:underline underline-offset-3">Clients</p>
          </Link>
          <Link className="hover:underline underline-offset-3" href="/job-seekers">
            <p className="cursor-pointer hover:underline underline-offset-3">Job Seekers</p>
          </Link>
          <Link className="hover:underline underline-offset-3" href="/employment-forms">
            <p className="cursor-pointer hover:underline underline-offset-3">Employment Forms</p>
          </Link>
          <Link className="hover:underline underline-offset-3" href="/current-openings">
            <p className="cursor-pointer hover:underline underline-offset-3">Current Openings</p>
          </Link>
          <Link className="hover:underline underline-offset-3" href="/contact-us">
            <p className="cursor-pointer hover:underline underline-offset-3">Contact Us</p>
          </Link>
        </div>
      </div>
      <div
        className={cn(
          'z-50 flex items-center justify-between w-full h-24 p-11 text-[#00A7E4] pb-10 xl:hidden',
          className
        )}
      >
        <Link href="/">
          <img
            className="w-auto h-24 cursor-pointer"
            src="/resources/images/lotus.png"
            alt="Lotus Technical logo"
          />
        </Link>
        <Menu
          className="cursor-pointer"
          size={50}
          color="#00A7E4"
          strokeWidth={2}
          onClick={() => {
            setNavToggle(!navToggle);
          }}
        />
      </div>
      <div className={navToggle ? 'h-full w-full left-0 top-0 z-50 bg-[#011F33] fixed' : 'hidden'}>
        <X
          className="absolute right-0 m-12 cursor-pointer"
          size={40}
          color="#00A7E4"
          strokeWidth={2}
          onClick={() => {
            setNavToggle(!navToggle);
          }}
        />
        <div className="flex flex-col gap-20 font-mono text-[#00A7E4] items-center h-full pt-48 text-xl">
          <Link className="hover:underline underline-offset-3" href="/">
            Home
          </Link>
          <Link className="hover:underline underline-offset-3" href="/clients">
            Clients
          </Link>
          <Link className="hover:underline underline-offset-3" href="/job-seekers">
            Job Seekers
          </Link>
          <Link className="hover:underline underline-offset-3" href="/employment-forms">
            Employment Forms
          </Link>
          <Link className="hover:underline underline-offset-3" href="/current-openings">
            Current Openings
          </Link>
          <Link className="hover:underline underline-offset-3" href="/contact-us">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
};

const Footer = ({ footer }: { footer: FooterModel | undefined }) => {
  return (
    <footer className="relative bottom-0 flex flex-col justify-around w-full py-16 bg-white text-md gap-28 md:py-28 md:flex-row md:px-28">
      <div className="flex flex-col mx-auto font-mono gap-y-7 lg:mx-0">
        <Link href={`tel:${footer?.phoneNumber.replaceAll('-', '')}`}>{footer?.phoneNumber}</Link>
        <Link href={`mailto:${footer?.emailAddress}`}>{footer?.emailAddress}</Link>
        <Link href={footer?.googleMapsLink || ''} target="_blank" rel="noreferrer">
          <div>
            <p>{footer?.addressLine1}</p>
            <p>{footer?.suiteNumber}</p>
            <p>{footer?.addressLine2}</p>
          </div>
        </Link>
      </div>
      <div className="w-0.5 bg-[#011F33] h-48 mt-auto mb-auto hidden md:block"></div>
      <div className="flex items-center justify-center gap-16 md:pb-0">
        <Link href={footer?.linkedInLink || ''} target="_blank" rel="noreferrer">
          <Linkedin fill="#011F33" size={36} className="cursor-pointer" />
        </Link>
        <Link href={footer?.facebookLink || ''} target="_blank" rel="noreferrer">
          <Facebook fill="#011F33" size={36} className="cursor-pointer" />
        </Link>
        <Link href={footer?.twitterLink || ''} target="_blank" rel="noreferrer">
          <Twitter fill="#011F33" size={36} className="cursor-pointer" />
        </Link>
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
    <div className="relative flex flex-col text-[#011F33]">
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
