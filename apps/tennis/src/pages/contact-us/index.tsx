import { Button } from 'src/components/Button';
import BasicLayout from 'src/layouts/BasicLayout';
import { ContactModel } from 'src/lib/core/models/contact';
import ContactService from 'src/lib/server/contact/contactService';

const TO_EMAIL = 'jacobisamps+lotus@gmail.com';
const SUBJECT = 'Tennis Tournament Entry';

const ContactUsPage = ({ contact }: { contact: ContactModel }) => {
  function handleFormSubmit(event: any) {
    event.preventDefault();

    const elements = event?.target?.elements;

    if (elements == null) return;

    const name = elements.name.value;
    const email = elements.email.value;
    const phone = elements.phone.value;
    const message = elements.message.value;
    console.log(name, email, phone, message);

    const body = `
    Name: ${name}

    Email: ${email}

    Phone Number: ${phone}

    ${message}`;

    window.open(`mailto:${TO_EMAIL}?subject=${SUBJECT}&body=${body}`);
  }

  return (
    <BasicLayout contact={contact}>
      <div className="max-w-2xl mx-auto px-8 py-4 min-h-[70vh] w-full">
        <h1 className="text-xl mb-16 mt-4 text-center">Contact Us</h1>

        <form onSubmit={handleFormSubmit}>
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
          </div>

          <div className="grid weight-500 my-4">
            <label htmlFor="message" style={{ display: 'block' }}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={2}
              className="border-2 text-black rounded-sm border-black w-full max-w-sm"
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
