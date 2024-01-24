import BasicLayout from '../layouts/BasicLayout';
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { register } from 'swiper/element/bundle';
import HomeService from 'src/lib/server/home/homeService';
import FooterService from 'src/lib/server/footer/footerService';
import { FooterModel } from 'src/lib/core/models/footer';
import { HomeModel, infoBoxModel } from 'src/lib/core/models/home';

const HomePage = ({
  homePage,
  footer,
}: {
  homePage: HomeModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <div>
      {' '}
      <div className="bg-[#011F33] text-[#011F33] font-mono">
        <div className="opacity-[.3] w-full h-full top-0 absolute bg-no-repeat bg-[linear-gradient(to_top,#011F33_10%,transparent),url('/resources/images/lotus.png')] translate-y-[10%] translate-x-[-12.5%]"></div>

        <BasicLayout footer={footer}>
          <div className="flex flex-col gap-y-11 text-center pt-40 ">
            <h1
              className="text-9xl  font-bold uppercase"
              style={{ WebkitTextStroke: '3px rgba(255, 255, 255)' }}
            >
              {homePage?.title}
            </h1>
            <p className="text-4xl text-white">{homePage?.slogan}</p>
            <div className="flex gap-x-24 justify-center p-20">
              <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
                Contact Us
              </button>
              <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
                Current Openings
              </button>
            </div>
            <div className="flex justify-center pb-40">
              {/* moveDown icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-down"
              >
                <path d="M8 18L12 22L16 18" />
                <path d="M12 2V22" />
              </svg>
            </div>
          </div>
          <img
            src="/resources/images/cutLines2.png"
            className="absolute right-0 bottom-[25%] w-[40rem]"
          ></img>
          <div className="bg-white flex justify-center">
            <InfoBody info={homePage?.info[0]} />
          </div>
          <img
            src="/resources/images/cutLines.png"
            className="absolute left-0 bottom-0 w-[40rem]"
          ></img>
          <div className="bg-[#00A7E4] flex justify-center mx-auto">
            <InfoBody info={homePage?.info[1]} />
          </div>
        </BasicLayout>
      </div>
    </div>
  );
};

const InfoBody = ({ info }: { info: infoBoxModel | undefined }) => {
  return (
    <div className="relative flex flex-col gap-y-11 p-60 w-3/4">
      <h2 className="text-6xl uppercase">{info?.title}</h2>
      {info?.body.map(bodyText => {
        return (
          <p key={bodyText} className="text-2xl">
            {bodyText}
          </p>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  const [homePage, footer] = await Promise.all([HomeService.getHome(), FooterService.getFooter()]);

  return {
    props: {
      homePage,
      footer,
    },
  };
}

export default HomePage;
