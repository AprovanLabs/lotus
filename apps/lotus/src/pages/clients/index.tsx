import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const heading = 'We Partner With You';
const bodyChunk1 =
  'By gaining a deeper understanding of your business and culture we help you build a team that lasts.';
const bodyChunk2 =
  'We work closely with you to match requirements, qualifications, experiences, team dynamics, and personalities to meet the needs of your organization.';

const Clients = () => {
  return (
    <BasicLayout>
      <div className="flex justify-center text-[#011F33] font-mono">
        <div className="relative flex flex-col gap-y-11 w-1/2 mx-auto">
          <h2 className="text-6xl uppercase">{heading}</h2>
          <p className="text-2xl">{bodyChunk1}</p>
          <p className="text-2xl">{bodyChunk2}</p>
          <button className="mx-auto rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
            Contact Us
          </button>
        </div>
      </div>
      <div className="flex justify-center p-6 pt-96">
        <div className="text-[#011F33] font-mono uppercase text-3xl">Information Technology</div>
      </div>
      <div className="flex justify-center">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Get Started
        </button>
      </div>
      <div className="grid gap-4 grid-cols-3 pt-16 w-fit mx-auto">
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          developers
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          ui/ux
        </div>
        <div className="bg-[#4DBDF6] text-white uppercase w-40 h-40 flex justify-center items-center">
          network/system engineers
        </div>
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          security
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          business analysts
        </div>
        <div className="bg-[#4DBDF6] text-white uppercase w-40 h-40 flex justify-center items-center">
          project/program managers
        </div>
      </div>

      <div className="flex justify-center pt-32">
        <div className="text-[#011F33] font-mono uppercase text-3xl">Engineering</div>
      </div>
      <div className="flex justify-center">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Get Started
        </button>
      </div>
      <div className="grid gap-4 grid-cols-3 pt-16 w-fit mx-auto">
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          electrical
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          cnc & welding
        </div>
        <div className="bg-[#4DBDF6] text-white uppercase w-40 h-40 flex justify-center items-center">
          mechanical
        </div>
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          quality
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          SUPPORT ROLES AR/AP/MARKETING/SALES
        </div>
        <div className="bg-[#4DBDF6] text-white uppercase w-40 h-40 flex justify-center items-center">
          drafters/designers
        </div>
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          technicians
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          Manufacturing
        </div>
      </div>
    </BasicLayout>
  );
};

export default Clients;
