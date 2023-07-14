import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'src/components/Button';
import Spinner from 'src/components/Spinner';
import { useToast } from 'src/components/useToast';
import BasicLayout from 'src/layouts/BasicLayout';
import { ContactModel } from 'src/lib/core/models/contact';
import ContactService from 'src/lib/server/contact/contactService';

const submissionStatusMap = new Map([
  ['true', true],
  ['false', false],
]);

const ContactUsPage = ({ contact }: { contact: ContactModel }) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Handle submission response
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ title: string; description: string } | undefined>();

  useEffect(() => {
    const submissionSucceeded = submissionStatusMap.get(router.query.success as string);

    if (submissionSucceeded === undefined) return;

    setMessage({
      title: submissionSucceeded ? 'Success!' : 'Failure',
      description: submissionSucceeded
        ? 'Your message was sent successfully!'
        : 'Something went wrong',
    });

    setTimeout(() => {
      setMessage(undefined);
    }, 3000);
  }, [router.query.success]);

  return (
    <BasicLayout contact={contact}>
      <div className="max-w-2xl mx-auto px-8 py-4 min-h-[70vh] w-full">
        <h1 className="text-xl mb-16 mt-4 text-center">Contact Us</h1>

        <form method="POST" action="/api/submit-form" encType="multipart/form-data" ref={formRef}>
          <div className="flex mb-2 flex-col w-full gap-4">
            <div className="grid weight-500">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="border-2 text-black rounded-sm border-black max-w-[12rem]"
              />
            </div>

            <div className="grid weight-500">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-2 text-black rounded-sm border-black max-w-[12rem]"
              />
            </div>

            <div className="grid weight-500">
              <label htmlFor="phoneNumber" style={{ display: 'block', width: '100%' }}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="border-2 text-black rounded-sm border-black max-w-[12rem]"
              />
            </div>

            <div className="grid weight-500">
              <label htmlFor="phone" style={{ display: 'block', width: '100%' }}>
                Attachment
              </label>
              <input type="file" name="file" />
            </div>
          </div>

          <div className="grid weight-500 my-4">
            <label htmlFor="message" style={{ display: 'block' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              defaultValue="Attached is my completed sign-up form for the upcoming tournament"
              className="border-2 py-2 px-2 text-black rounded-sm border-black w-full max-w-sm"
            ></textarea>
          </div>

          <Button
            disabled={isLoading}
            className="mt-4"
            type="submit"
            onClick={() => {
              setIsLoading(true);
              formRef.current?.submit();
            }}
          >
            Submit&nbsp;&nbsp; {!isLoading ? <>&rarr;</> : <Spinner className="ml-2" />}
          </Button>

          {message && (
            <div className="mt-4">
              <p>{message?.description}</p>
            </div>
          )}
        </form>
      </div>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const contact = await ContactService.getContact();

  return {
    props: {
      contact,
    },
  };
}

export default ContactUsPage;
