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
      <h1 className="text-xl" style={{ backgroundColor: '#236494', color: 'white', marginBottom: '2rem', fontWeight: 800 }}>Contact Us</h1>

      <form onSubmit={funcionName}>
        <div style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '2rem', fontWeight: 500 }}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid white', color: 'transparent' }} />
        </div>

        <div style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '2rem', fontWeight: 500 }}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid white', color: 'transparent' }} />
        </div>

        <div style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '2rem', fontWeight: 500 }}>
          <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number:</label>
          <input type="tel" id="phone" name="email" style={{ backgroundColor: 'transparent', border: 'none', borderBottom: '1px solid white', color: 'transparent' }} />
        </div>

        <div style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '2rem', fontWeight: 500 }}>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
          <textarea id="message" name="message" rows={6} style={{ color: 'transparent', backgroundColor: '#a4c36c' }}></textarea>
        </div>

        <input style={{ backgroundColor: '#a4c36c', color: 'white', marginBottom: '2rem', fontWeight: 500 }} type="submit" value="Submit" />
      </form>
    </BasicLayout>
  );
};

export default ContactUsPage;
