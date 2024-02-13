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
      <div className="flex justify-center">
        <div className="relative flex flex-col gap-y-11 w-1/2 mx-auto">
          <h2 className="text-5xl uppercase text-center">{clientPage?.heading}</h2>
          <p className="text-2xl">{clientPage?.line1}</p>
          <p className="text-2xl">{clientPage?.line2}</p>
          <button className="mx-auto rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2">
            Contact Us
          </button>
        </div>
      </div>
      <StatsSection stats={clientPage?.stats} />
      <ProcessSection processSteps={clientPage?.processSteps} />
      <CareersSection careerFields={clientPage?.careerFields?.[0]} />
      <CareersSection careerFields={clientPage?.careerFields?.[1]} />
    </BasicLayout>
  );
};

const StatsSection = ({ stats }: { stats: StatsModel[] | undefined }) => {
  return (
    <div className="flex flex-row gap-24 justify-center pt-52 text-center">
      {stats?.map((stat, index) => {
        return (
          <>
            {index != 0 ? <div className="w-0.5 bg-[#011F33] h-36 mt-auto mb-auto"></div> : null}
            <div className="mt-auto mb-auto">
              <p className="text-3xl font-semibold">{stat.value}</p>
              <p>{stat.label}</p>
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
