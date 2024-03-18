import Link from 'next/link';
import React from 'react';
import CareersSection from 'src/components/CareersSection';
import ProcessSection from 'src/components/ProcessSection';
import BasicLayout from 'src/layouts/BasicLayout';
import { ClientsModel, StatsModel } from 'src/lib/core/models/clients';
import { FooterModel } from 'src/lib/core/models/footer';
import ClientService from 'src/lib/server/clients/clientService';
import FooterService from 'src/lib/server/footer/footerService';

const Clients = ({
  clientPage,
  footer,
}: {
  clientPage: ClientsModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <BasicLayout footer={footer}>
      <div className="flex justify-center pt-24">
        <div className="relative flex flex-col w-3/4 mx-auto lg:w-1/2 gap-y-11">
          <h2 className="text-5xl text-center uppercase">{clientPage?.heading}</h2>
          <p className="text-2xl">{clientPage?.line1}</p>
          <p className="text-2xl">{clientPage?.line2}</p>
          <Link href="/contact-us">
            <button className="mx-auto hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 mt-8">
              Contact Us
            </button>
          </Link>
        </div>
      </div>
      <StatsSection stats={clientPage?.stats} />
      <div className="pb-56">
        <ProcessSection processSteps={clientPage?.processSteps} />
      </div>
      {clientPage?.careerFields?.map((section, i) => {
        return (
          <div key={i} className="pb-56">
            <CareersSection careerFields={section} />
          </div>
        );
      })}
    </BasicLayout>
  );
};

const StatsSection = ({ stats }: { stats: StatsModel[] | undefined }) => {
  return (
    <div className="flex flex-row justify-center gap-12 px-10 pt-48 text-center md:gap-24">
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
