import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { Pencil } from 'lucide-react';
import { User } from 'lucide-react';
import { Building2 } from 'lucide-react';
import { ArrowLeftRight } from 'lucide-react';
import { Search } from 'lucide-react';
import { JobSeekersModel } from 'src/lib/core/models/jobSeekers';
import { FooterModel } from 'src/lib/core/models/footer';
import JobSeekersService from 'src/lib/server/jobSeekers/jobSeekersService';
import FooterService from 'src/lib/server/footer/footerService';
import ProcessSection from 'src/components/ProcessSection';
import CareersSection from 'src/components/CareersSection';

const JobSeekers = ({
  jobSeekersPage,
  footer,
}: {
  jobSeekersPage: JobSeekersModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <BasicLayout footer={footer}>
      <CareersSection careerFields={jobSeekersPage?.careerFields} />
      {/* what to expect */}
      <div className="flex justify-center p-6 pb-20">
        <div className="uppercase text-5xl pt-48">What to expect</div>
      </div>
      <div className="text-2xl mx-auto w-fit">
        <div className="flex flex-row gap-6 pb-16">
          <Pencil size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{jobSeekersPage?.whatToExpectSteps[0]}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <User size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{jobSeekersPage?.whatToExpectSteps[1]}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <Building2 size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{jobSeekersPage?.whatToExpectSteps[2]}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <ArrowLeftRight size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{jobSeekersPage?.whatToExpectSteps[3]}</p>
        </div>
        <div className="flex flex-row gap-6 pb-16">
          <Search size={50} color="#011F33" strokeWidth={1} />
          <p className="flex items-center">{jobSeekersPage?.whatToExpectSteps[4]}</p>
        </div>
      </div>

      <ProcessSection processSteps={jobSeekersPage?.processSteps} />

      <div className="w-fit mx-auto py-32">
        <a href={`mailto:brousslang@lotustechnical.com`}>
          <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
            Contact Us
          </button>
        </a>
      </div>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const [jobSeekersPage, footer] = await Promise.all([
    JobSeekersService.getJobSeekers(),
    FooterService.getFooter(),
  ]);

  return {
    props: {
      jobSeekersPage,
      footer,
    },
  };
}

export default JobSeekers;
