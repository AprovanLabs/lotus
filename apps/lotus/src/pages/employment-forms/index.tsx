import { Download } from 'lucide-react';
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
      <div className="bg-[#011F33]">
        <div className="select-none pointer-events-none opacity-10 absolute w-full h-full bg-cover bg-[url('/resources/images/skyline.jpg')] pt-[12rem]"></div>
        <div className=" text-white pt-56 pb-96">
          <h1 className="text-center text-5xl pb-20">{employmentFormsPage?.pageTitle}</h1>
          <div className="grid grid-cols-3 gap-y-10 max-w-7xl mx-auto text-2xl">
            {employmentFormsPage?.forms.map(form => {
              return (
                <a
                  className="self-center px-12 hover:underline underline-offset-3"
                  key={form?.title}
                  href={form?.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {form?.title}
                </a>
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
