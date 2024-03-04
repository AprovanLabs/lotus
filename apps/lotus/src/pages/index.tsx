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
    <div className="bg-[#011F33] relative">
      {/* bg-[top_left_90%] md:bg-[top_left_100%] lg:bg-[top_left_110%] xl:bg-[top_left_-60%] */}
      <div className="opacity-30 w-full h-full top-0 absolute bg-no-repeat bg-[linear-gradient(to_top,#011F33_70%,transparent),url('/resources/images/lotus.png')] bg-[90%_0rem] md:bg-[100%_0rem] lg:bg-[130%_0rem] xl:bg-[-50%_0rem]"></div>
      <BasicLayout footer={footer}>
        <div className="flex flex-col pt-40 text-center gap-y-11 ">
          <h1
            className="font-bold uppercase text-9xl"
            style={{ WebkitTextStroke: '3px rgba(255, 255, 255)' }}
          >
            {homePage?.title}
          </h1>
          <p className="text-4xl text-white">{homePage?.slogan}</p>
          <div className="flex justify-center p-20 gap-x-24">
            <a href={`mailto:brousslang@lotustechnical.com`}>
              <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
                Contact Us
              </button>
            </a>
            <a href="/current-openings">
              <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
                Current Openings
              </button>
            </a>
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
          className="absolute right-0 bottom-[45%] xl:bottom-1/4 w-[30rem] xl:w-[40rem]"
        ></img>
        <div className="flex justify-center bg-white">
          <InfoBody info={homePage?.info[0]} />
        </div>
        <img
          src="/resources/images/cutLines.png"
          className="absolute left-0 bottom-[15%] w-[30rem] xl:bottom-0 xl:w-[40rem]"
        ></img>
        <div className="bg-[#00A7E4] flex justify-center mx-auto">
          <InfoBody info={homePage?.info[1]} />
        </div>
      </BasicLayout>
    </div>
  );
};

const InfoBody = ({ info }: { info: infoBoxModel | undefined }) => {
  return (
    <div className="relative flex flex-col w-3/4 px-10 py-60 gap-y-11 xl:px-60">
      <h2 className="text-5xl uppercase">{info?.title.toUpperCase()}</h2>
      <p className="text-2xl">{info?.line1}</p>
      <p className="text-2xl">{info?.line2}</p>
      <p className="text-2xl">{info?.line3}</p>
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
