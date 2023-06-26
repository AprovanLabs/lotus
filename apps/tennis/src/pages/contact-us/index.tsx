import BasicLayout from 'src/layouts/BasicLayout';

const TO_EMAIL = 'jacobisamps+lotus@gmail.com';
const SUBJECT = 'Tennis Tournament Entry';

const ContactUsPage = () => {
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
    Message: ${message}
    `;

    window.open(`mailto:${TO_EMAIL}?subject=${SUBJECT}&body=${body}`);
  }

  return (
    <BasicLayout>
      <h1 className="text-xl" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '2rem', fontWeight: 800 }}>Contact Us</h1>

      <form onSubmit={handleFormSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'transparent', color: 'black', width: '48%', fontWeight: 500 }}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} />
          </div>

          <div style={{ backgroundColor: 'transparent', color: 'black', width: '48%', fontWeight: 500 }}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'transparent', color: 'black', width: '48%', fontWeight: 500 }}>
            <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number:</label>
            <input type="tel" id="phone" name="phone" style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }} />
          </div>

          <div style={{ backgroundColor: 'transparent', color: 'black', width: '48%', fontWeight: 500 }}>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message:</label>
            <textarea id="message" name="message" rows={2} style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black' }}></textarea>
          </div>
        </div>

        <button style={{ backgroundColor: 'white', color: 'black', marginBottom: '2rem', fontWeight: 500, border: '1px solid black', display: 'flex', alignItems: 'center' }} type="submit">
          Submit&nbsp;&nbsp;&rarr;
        </button>
      </form>
    </BasicLayout>
  );
};

export default ContactUsPage;
