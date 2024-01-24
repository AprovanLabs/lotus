import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { EmploymentFormsModel } from 'src/lib/core/models/employmentForms';
import { FooterModel } from 'src/lib/core/models/footer';
import EmploymentFormsService from 'src/lib/server/employmentForms/employmentFormsService';
import FooterService from 'src/lib/server/footer/footerService';

const EmploymentForms = ({
  employmentFormsPage,
  footer
}: {
  employmentFormsPage: EmploymentFormsModel | undefined;
  footer: FooterModel | undefined;
}) => {
  return (
    <div className="bg-[#011F33]">
      <div className="opacity-[0.1] absolute w-full h-full bg-cover bg-[url('/resources/images/skyline.jpg')]"></div>

      <BasicLayout footer={footer}>
        <div className=" text-white font-mono">
          <h1 className="text-center text-5xl pb-20">{employmentFormsPage?.pageTitle}</h1>
          {/* <div className=" flex justify-center	align-center"> */}
          <div className="grid grid-cols-3 gap-y-4 max-w-7xl mx-auto text-lg mb-96">
            {employmentFormsPage?.forms.map(form => {
              return (
                <a key={form?.title} href={form?.link} target="_blank" rel="noreferrer">
                  {form?.title}
                </a>
              );
            })}
          </div>
        </div>
        {/* </div> */}
      </BasicLayout>
    </div>
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
