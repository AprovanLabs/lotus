import React from 'react';
import BasicLayout from 'src/layouts/BasicLayout';

const EmploymentForms = () => {
  return (
    <div className="bg-[#011F33] text-white font-mono">
      <div className="opacity-[0.1] absolute w-full h-full bg-cover bg-[url('/resources/images/skyline.jpg')]"></div>

      <BasicLayout>
        <h1 className="text-center text-5xl pb-20">Employment Forms</h1>
        {/* <div className=" flex justify-center	align-center"> */}
        <div className="grid grid-cols-3 gap-y-4 max-w-7xl mx-auto text-lg">
          <a href="/">Memorandum</a>
          <a href="/">I-9</a>
          <a href="/">Employment Eligibility Verification</a>

          <a href="/">Nondisclosure Agreement</a>
          <a href="/">W-4</a>
          <a href="/">Enrollment Form</a>

          <a href="/">2022 Payroll Schedule</a>
          <a href="/">Background Check</a>
          <a href="/">Insurance Form</a>

          <a href="/">Hour Tracking</a>
          <a href="/">Direct Deposit</a>
          <a href="/">Access to Personal Files and Records</a>
          <a href="/">Emergency Contact</a>
        </div>
        {/* </div> */}
      </BasicLayout>
    </div>
  );
};

export default EmploymentForms;
