import { Button } from 'src/components/Button';
import BasicLayout from 'src/layouts/BasicLayout';
import { ContactModel } from 'src/lib/core/models/contact';
import ContactService from 'src/lib/server/contact/contactService';

const ContactUsPage = ({ contact }: { contact: ContactModel }) => {
  return (
    <BasicLayout contact={contact}>
      <div className="max-w-2xl mx-auto px-8 py-4 min-h-[70vh] w-full">
        <h1 className="text-xl mb-16 mt-4 text-center">Contact Us</h1>

        <form method="POST" action="/api/submit-form" encType="multipart/form-data">
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
              <label htmlFor="phone" style={{ display: 'block', width: '100%' }}>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
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
              className="border-2 py-1 px-1 text-black rounded-sm border-black w-full max-w-sm"
            ></textarea>
          </div>

          <Button className="mt-4" type="submit">
            Submit&nbsp;&nbsp;&rarr;
          </Button>
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
