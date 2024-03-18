import Link from 'next/link';
import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { EmploymentFormsModel } from 'src/lib/core/models/employmentForms';
import { FooterModel } from 'src/lib/core/models/footer';
import EmploymentFormsService from 'src/lib/server/employmentForms/employmentFormsService';
import FooterService from 'src/lib/server/footer/footerService';

const EmploymentForms = ({
  employmentFormsPage,
  footer,
}: {
  employmentFormsPage: EmploymentFormsModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <BasicLayout footer={footer} navFolded>
      <div className="bg-[#011F33] pt-24">
        <div className="select-none pointer-events-none opacity-10 absolute w-full h-full bg-cover bg-[url('/resources/images/skyline.jpg')] pt-[12rem]"></div>
        <div className="pt-56 pb-[75rem] md:pb-[40rem] text-white ">
          <h1 className="pb-20 text-5xl text-center">{employmentFormsPage?.pageTitle}</h1>
          <div className="grid grid-cols-1 mx-auto text-2xl md:grid-cols-3 gap-y-10 max-w-7xl w-fit">
            {employmentFormsPage?.forms.map(form => {
              return (
                <Link
                  className="self-center px-12 hover:underline underline-offset-3"
                  key={form?.title}
                  href={form?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {form?.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default EmploymentForms;

export async function getStaticProps() {
  const [employmentFormsPage, footer] = await Promise.all([
    EmploymentFormsService.getEmploymentForms(),
    FooterService.getFooter(),
  ]);

  return {
    props: {
      employmentFormsPage,
      footer,
    },
  };
}
