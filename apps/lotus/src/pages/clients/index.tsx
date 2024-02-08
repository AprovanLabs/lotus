import React from 'react';
import CareersSection from 'src/components/CareersSection';
import ProcessSection from 'src/components/ProcessSection';
import BasicLayout from 'src/layouts/BasicLayout';
import { ClientsModel, StatsModel } from 'src/lib/core/models/clients';
import { FooterModel } from 'src/lib/core/models/footer';
import ClientService from 'src/lib/server/clients/clientService';
import FooterService from 'src/lib/server/footer/footerService';

const subHeading = 'We Partner With You';
const bodyChunk1 =
  'By gaining a deeper understanding of your business and culture we help you build a team that lasts.';
const bodyChunk2 =
  'We work closely with you to match requirements, qualifications, experiences, team dynamics, and personalities to meet the needs of your organization.';
const step1 = 'Meeting to get to know you, your team, and business objectives.';
const step2 = 'Consultation and facilities tour.';
const step3 = 'Screening and interviewing potential candidates';
const step4 = 'Match company requirements to qualified, dynamic emplotees.';
const subHeading2 = 'Our Process';

const Clients = ({
  clientPage,
  footer,
}: {
  clientPage: ClientsModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <BasicLayout footer={footer}>
      <div className="flex justify-center text-[#011F33] font-mono">
        <div className="relative flex flex-col gap-y-11 w-1/2 mx-auto">
          <h2 className="text-6xl uppercase">{clientPage?.heading}</h2>
          <p className="text-2xl">{clientPage?.line1}</p>
          <p className="text-2xl">{clientPage?.line2}</p>
          <button className="mx-auto rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
            Contact Us
          </button>
        </div>
      </div>

      <StatsSection stats={clientPage?.stats} />

      <ProcessSection processSteps={clientPage?.processSteps} />

      {/* stats */}
      {/* <div className="text-[#011F33] flex flex-row gap-24 justify-center pt-52 text-center">
        <div className="mt-auto mb-auto">
          <p className="text-3xl font-semibold">50</p>
          <p className="text-xl">unique roles</p>
        </div>
        <div className="w-0.5 bg-[#011F33] h-36 mt-auto mb-auto"></div>
        <div className="mt-auto mb-auto">
          <p className="text-3xl font-semibold">50+ years</p>
          <p className="text-xl">of industry experience</p>
        </div>
        <div className="w-0.5 bg-[#011F33] h-36 mt-auto mb-auto"></div>
        <div className="mt-auto mb-auto">
          <p className="text-3xl font-semibold">50+</p>
          <p className="text-xl">satisfied clients</p>
        </div>
      </div> */}

      {/* process */}
      {/* <div className="w-fit mx-auto text-center text-[#011F33] font-mono pt-48">
        <h2 className="text-3xl uppercase">{subHeading2}</h2>
        <div className="flex justify-center pt-10">
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
          <p className="flex items-center">{step3}</p>
        </div>
        <div className="flex gap-9 pt-9">
          <div className="bg-[#5E9136] text-white font-bold w-40 h-40 flex justify-center items-center text-5xl">
            4
          </div>
          <p className="flex items-center">{step4}</p>
        </div> */}

      {/* Grid of positions */}
      {/* <div className="flex justify-center p-6 pt-96">
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
        </div> */}
      {/* </div> */}

      <CareersSection careerFields={clientPage?.careerFields?.[0]} />
      <CareersSection careerFields={clientPage?.careerFields?.[1]} />

      {/* <div className="flex justify-center pt-36">
        <div className="text-[#011F33] font-mono uppercase text-3xl">Engineering</div>
      </div>
      <div className="flex justify-center">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Get Started
        </button>
      </div>
      <div className="grid gap-4 grid-cols-3 pt-16 pb-32 w-fit mx-auto">
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
      </div> */}
    </BasicLayout>
  );
};

const StatsSection = ({ stats }: { stats: StatsModel[] | undefined }) => {
  return (
    <div className="text-[#011F33] flex flex-row gap-24 justify-center pt-52 text-center">
      {stats?.map((stat, index) => {
        return (
          <>
            {index != 0 ? <div className="w-0.5 bg-[#011F33] h-36 mt-auto mb-auto"></div> : null}
            <div className="mt-auto mb-auto">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p className="text-xl">{stat.label}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export async function getStaticProps() {
  const [clientPage, footer] = await Promise.all([
    ClientService.getClients(),
    FooterService.getFooter(),
  ]);

  return {
    props: {
      clientPage,
      footer,
    },
  };
}

export default Clients;
