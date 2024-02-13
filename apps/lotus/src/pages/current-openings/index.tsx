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
      <JobSection jobs={currentOpeningsPage?.jobs} />
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
