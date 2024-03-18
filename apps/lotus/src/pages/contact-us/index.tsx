import { useRef, useState } from 'react';
import BasicLayout from 'src/layouts/BasicLayout';
import { FooterModel } from 'src/lib/core/models/footer';
import FooterService from 'src/lib/server/footer/footerService';

const ContactUs = ({ footer }: { footer: FooterModel | undefined }) => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <BasicLayout footer={footer}>
      <h1 className="pb-20 text-5xl text-center text-[#011F33] mt-24">Contact Us</h1>
      <div className="mx-auto">
        <div className="max-w-2xl mx-auto w-full text-[#011F33] flex justify-center items-center">
          <form method="POST" action="/api/submit-form" encType="multipart/form-data" ref={formRef}>
            <div className="flex flex-col w-full gap-5 mb-2">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                className="border-2 rounded-sm max-w-sm min-h-[3rem]"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="border-2 rounded-sm max-w-sm min-h-[3rem]"
              />
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Phone Number"
                className="border-2 rounded-sm max-w-sm min-h-[3rem]"
              />
              <textarea
                id="message"
                name="message"
                placeholder="Message"
                rows={2}
                className="max-w-3xl min-h-[10rem] border-2 rounded-sm"
              />
              <div className="grid weight-500">
                <label htmlFor="file" style={{ display: 'block', width: '100%' }}>
                  Resume
                </label>
                <input type="file" name="file" />
              </div>
            </div>
          </form>
        </div>
        <div className="py-10 mx-auto w-fit">
          <button
            className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 "
            onClick={() => {
              setIsLoading(true);
              formRef.current?.submit();
            }}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const [footer] = await Promise.all([FooterService.getFooter()]);

  return {
    props: {
      footer,
    },
  };
}

export default ContactUs;
