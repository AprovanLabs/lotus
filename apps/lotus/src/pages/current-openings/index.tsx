import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { FooterModel } from 'src/lib/core/models/footer';
import FooterService from 'src/lib/server/footer/footerService';
import { CurrentOpeningsModel } from 'src/lib/core/models/currentOpenings';
import CurrentOpeningsService from 'src/lib/server/currentOpenings/currentOpeningsService';
import JobSection from 'src/components/JobsSection';

const CurrentOpenings = ({
  currentOpeningsPage,
  footer,
}: {
  currentOpeningsPage: CurrentOpeningsModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <BasicLayout footer={footer}>
      <div className="flex flex-col pt-24 text-2xl">
        <h1 className="pb-20 text-5xl text-center">{currentOpeningsPage?.pageTitle}</h1>
        <JobSection jobs={currentOpeningsPage?.jobs} />
      </div>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const [currentOpeningsPage, footer] = await Promise.all([
    CurrentOpeningsService.getCurrentOpenings(),
    FooterService.getFooter(),
  ]);

  return {
    props: {
      currentOpeningsPage,
      footer,
    },
  };
}

export default CurrentOpenings;
