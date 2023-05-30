import BasicLayout from 'src/layouts/BasicLayout';

const TO_EMAIL = 'jacobisamps+lotus@gmail.com';
const SUBJECT = 'Tennis Tournament Entry';

const ContactUsPage = () => {
  function funcionName(event: any) {
    event.preventDefault();

    const elements = event?.target?.elements;

    if (elements == null) return;

    const name = elements.name.value;
    console.log(name);

    const body = `
    Name: ${name}
    `;

    window.open(`mailto:${TO_EMAIL}?subject=${SUBJECT}&body=${body}`);
  }

  return (
    <BasicLayout>
      <h1 className="text-xl">Contact Us</h1>

      <form onSubmit={funcionName}>
        <div style={{ backgroundColor: '#6C935C', marginBottom: '2rem', fontWeight: 800 }}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name"></input>
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>

        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input type="tel" id="phone" name="email" />
        </div>

        <div>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows={6}></textarea>
        </div>

        <input type="submit" value="Submit" />
      </form>
    </BasicLayout>
  );
};

export default ContactUsPage;
