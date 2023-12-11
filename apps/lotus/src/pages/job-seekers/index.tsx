import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { Pencil } from 'lucide-react';
import { User } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { ArrowLeftRight } from 'lucide-react';
import { Search } from 'lucide-react';

const subHeading = 'Placement Options';
const subHeading2 = 'Our Process';
const subHeading3 = 'What to expect';
const step1 = 'Submit resume and employment preferences.';
const step2 = 'Interview and screening process.';
const step3 =
  'Pair with a knowledgeable recruiter to assist with resume, personal objectives and interview preparation.';
const step4 = 'Match to one of our many top-tier companies.';
const whatToExpect1 = 'Resume help';
const whatToExpect2 = 'A partner and advocate';
const whatToExpect3 = 'Pairing with top-notch companies';
const whatToExpect4 = 'Open communication';
const whatToExpect5 = 'Support in your job search';

const JobSeekers = () => {
  return (
    <BasicLayout>
      <div className="flex justify-center p-6">
        <div className="text-[#011F33] font-mono uppercase text-3xl">{subHeading}</div>
      </div>
      <div className="flex justify-center gap-4">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Contact Us
        </button>
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Openings
        </button>
      </div>
      <div className="grid gap-4 grid-cols-3 pt-16 w-fit mx-auto">
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          contract
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          Vendor Management system (VMS)
        </div>
        <div className="bg-[#4DBDF6] text-white uppercase w-40 h-40 flex justify-center items-center">
          contract to hire
        </div>
        <div className="bg-[#00A7E4] text-white uppercase w-40 h-40 flex justify-center items-center">
          direct placement
        </div>
        <div className="bg-[#5FC3F7] text-white uppercase w-40 h-40 flex justify-center items-center">
          recruiting managed services
        </div>
      </div>

      {/* what to expect */}
      <div className="flex justify-center p-6 pb-20">
        <div className="text-[#011F33] font-mono uppercase text-5xl pt-48">{subHeading3}</div>
      </div>
      <div className="text-2xl text-[#011F33] mx-auto w-fit">
        <div className="flex flex-row gap-6 pb-16">
          <Pencil size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{whatToExpect1}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <User size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{whatToExpect2}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <Building2 size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{whatToExpect3}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <ArrowLeftRight size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{whatToExpect4}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <Search size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{whatToExpect5}</p>
        </div>
      </div>

      {/* process */}
      <div className="w-fit mx-auto text-[#011F33] font-mono pt-48">
        <h2 className="text-3xl uppercase text-center">{subHeading2}</h2>
        <div className="flex justify-center pt-10">
          {/* moveDown icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#011F33"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-move-down"
          >
            <path d="M8 18L12 22L16 18" />
            <path d="M12 2V22" />
          </svg>
        </div>
        <div className="flex gap-9 pt-28">
          <div className="bg-[#B4D897] text-white font-bold w-40 h-40 flex justify-center items-center text-5xl">
            1
          </div>
          <p className="flex items-center">{step1}</p>
        </div>
        <div className="flex gap-9 pt-9">
          <div className="bg-[#8DB66D] text-white font-bold w-40 h-40 flex justify-center items-center text-5xl">
            2
          </div>
          <p className="flex items-center">{step2}</p>
        </div>
        <div className="flex gap-9 pt-9">
          <div className="bg-[#71B33D] text-white font-bold w-40 h-40 flex justify-center items-center text-5xl">
            3
          </div>
          <p className="flex items-center w-96">{step3}</p>
        </div>
        <div className="flex gap-9 pt-9">
          <div className="bg-[#5E9136] text-white font-bold w-40 h-40 flex justify-center items-center text-5xl">
            WIN
          </div>
          <p className="flex items-center">{step4}</p>
        </div>
      </div>

      <div className="w-fit mx-auto py-32">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Get Started
        </button>
      </div>
    </BasicLayout>
  );
};

export default JobSeekers;
