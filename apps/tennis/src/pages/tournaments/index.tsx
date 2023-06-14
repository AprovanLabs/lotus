import { useRouter } from 'next/router';
import BasicLayout from 'src/layouts/BasicLayout';
import Image from 'next/image';
import InlineLink from 'src/components/InlineLink';
import { Button } from 'src/components/Button';
import { DownloadIcon, InfoIcon, MapPinIcon } from 'lucide-react';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';

type Content = { type: string; text: string } & { type: string; text: string } & {
  type: string;
  text: string;
  address: string;
};

const tournament = {
  title: 'Highly Strung Tennis Tournament',
  registrationDeadlineDate: 'July 15th, 2023',
  fromDate: 'July 23rd',
  toDate: 'July 26th',
  email: 'brousslang@lotustechnical.com',
  signUpFormUrl: '/resources/2023 TENNIS TOURNAMENT REGISTRATRION FORM.pdf',
  faqs: [
    {
      title: 'When is the tournament?',
      content: [
        {
          type: 'text',
          text: `
    Adult Men's and Women's Doubles Tournaments on Sunday, July 23rd (8:30am)
    Adult Mixed Doubles Tournament on Sunday, July 23rd (10:00am)
    Varsity Girls Singles on Monday, July 24th (8:00am)
    Varsity Boys Doubles on Monday, July 24th (10:30am)
    Varsity Boys Singles on Tuesday, July 25th (8:00am)
    Varsity Girls Doubles on Tuesday, July 25th (10:30am)
    Junior Varsity Boys Doubles on Tuesday July 25th (8:00am)
    Junior Varsity Girls Doubles on Tuesday, July 25th (9:30am)
    Junior Varsity Girls Singles on Wednesday, July 26th (1:00pm)
    Junior Varsity Boys Singles on Wednesday, July 26th (1:30pm)
        `,
        },
        { type: 'warning', text: 'Registration Deadline: Saturday, July 15th, 2023' },
      ] as Content[],
    },
    {
      title: 'Where is the tournament?',
      content: [
        {
          type: 'location',
          text: 'Rogers Tennis Club',
          address: '21095 147th Ave N, Rogers, MN 55374',
        },
      ] as Content[],
    },
    {
      title: 'What time do I need to show up?',
      content: [
        {
          type: 'text',
          text: `
      Check in 45 minutes before schedule match time

      Check in for 8:30 am matches is at 7:45.
      Check in for 11:00 am matches Is at 10:15
      Check in for 2:00 pm matches is at 1:15        `,
        },
      ] as Content[],
    },
    {
      title: 'When are draws released?',
      content: [
        {
          type: 'text',
          text: `2 days prior to the start. They will be posted here: (link to draws page`,
        },
      ] as Content[],
    },
    {
      title: 'How are matches scored?',
      content: [
        {
          type: 'text',
          text: `8 game pros with a 10 point tie-breaker. No ad`,
        },
      ] as Content[],
    },
    {
      title: 'How many matches will I play?',
      content: [
        {
          type: 'text',
          text: `You are guaranteed 2 matches`,
        },
      ] as Content[],
    },
    {
      title: 'Can I purchase additional t-shirts?',
      content: [
        {
          type: 'text',
          text: `Yes! Purchase additional t-shirts for $20`,
        },
      ] as Content[],
    },
  ],
};

const FAQ: React.FC<React.PropsWithChildren & { title: string; content: Content[] }> = ({
  title,
  content,
  children,
  ...props
}) => (
  <div {...props}>
    <h1
      style={{
        position: 'relative',
        color: 'white',
        marginTop: '4rem',
        whiteSpace: 'nowrap',
        fontSize: '1rem',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'var(--court-blue-600)',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        paddingLeft: '1.5rem',
        paddingRight: '2rem',
        fontWeight: 700,
        fontStyle: 'italic',
        // Only take up as much space as needed
        width: 'fit-content',
        // Center the text
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          fontSize: '1.5rem',
          left: '0.5rem',
          opacity: 0.85,
          color: 'var(--court-blue-200)',
        }}
      >
        &quot;
      </div>
      <div>{title}</div>
    </h1>
    <div
      style={{
        borderLeft: '0.25rem solid var(--court-blue-800)',
        fontSize: '0.75rem',
        padding: '1.5rem 0 1rem 2rem',
      }}
    >
      {content.map((item, index) => {
        if (item.type === 'text') {
          return item.text.split('\n').map((text, index) => (
            <p
              key={index}
              style={{
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              {text}
            </p>
          ));
        }

        if (item.type === 'warning') {
          return (
            <div
              key={index}
              style={{
                color: '#DC493A',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 800,
              }}
            >
              <InfoIcon fontSize="0.75rem" size={12} style={{ marginRight: '0.5rem' }} />
              {item.text}
            </div>
          );
        }

        if (item.type === 'location') {
          return (
            <div
              key={index}
              style={{
                fontSize: '0.75rem',
              }}
            >
              <a href={`https://www.google.com/maps/search/?api=1&query=${item.address}`}>
                <Button>
                  <MapPinIcon fontSize="0.75rem" size={12} style={{ marginRight: '0.5rem' }} />
                  {item.text}
                </Button>
              </a>
              <p
                style={{
                  marginTop: '1rem',
                }}
              >
                {item.address}
              </p>
            </div>
          );
        }
      })}
      {children}
    </div>
  </div>
);

const TournamentsPage = () => {
  const router = useRouter();

  return (
    <BasicLayout>
      <section
        style={{
          // Make the section take up the full width of the screen
          width: '100%',
          // Padding/margin are in the order 'top right bottom left'
          // Short-hand with two becomes 'left/right top/bottom'
          padding: '10rem 2rem',
          // Set the background color to a custom property
          backgroundColor: 'var(--court-green-600)',
          color: 'white',
          // Add a couple drop shadows
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div
          style={{
            // Keeps the items in the center from getting too large
            maxWidth: '35rem',
            // Centers the element horizontally by making the left/right margin fill the remaining space
            margin: 'auto',
          }}
        >
          <h1
            style={{
              fontSize: '2rem',
            }}
          >
            {tournament.title}
          </h1>
          <h2
            style={{
              fontSize: '1.5rem',
              // Transparent text center with outline
              // 'WebKit' typically refers to the rendering engine used by Safari. For this property, it is used by all engines (Firefox, Chrome, etc.)
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255, 255, 255, 0.8)',
            }}
          >
            {tournament.fromDate} - {tournament.toDate}
          </h2>
          <div
            className={css({
              width: '100%',
              display: 'flex',
              marginTop: '2rem',
              flexDirection: 'column',
              // Allign things in the center with extra space on sides of all the elements together
              justifyContent: 'space-around',

              // Once the screen is above the 'sm' size, change to horizontal layout
              [ScreenSizeBreakpoints.sm]: {
                flexDirection: 'row',
              },
            })}
          >
            <Image
              src="/resources/images/tshirt.png"
              width={400}
              height={600}
              alt="Tournament T-shirt"
            ></Image>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'start',
                // Make item take up 50% of the width
                flex: '0 0 50%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'left',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                {/* 'href' is a link pointing to a new URL/file. It can also point to elements with an 'id' property */}
                <InlineLink href="#faq">FAQ</InlineLink>
                <InlineLink href="/opportunities">More Opportunities</InlineLink>
              </div>
              <Button
                onClick={() => router.push(tournament.signUpFormUrl)}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyItems: 'center',
                  gap: '1rem',
                  marginBottom: '0.5rem',
                  width: 'fit-content',
                }}
              >
                <DownloadIcon />
                Sign Up Form
              </Button>
              <p
                style={{
                  fontSize: '0.75rem',
                }}
              >
                Send to{' '}
                <InlineLink
                  href={`email:${tournament.email}`}
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {tournament.email}
                </InlineLink>
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  display: 'flex',
                  opacity: 0.5,
                  // Align things along horizontal axis
                  alignItems: 'center',
                  // Can also set font 'weight' to a number
                  // e.g. 'fontWeight: 800'
                  fontStyle: 'bold',
                }}
              >
                <InfoIcon fontSize="0.75rem" size={12} style={{ marginRight: '0.5rem' }} /> Register
                by {tournament.registrationDeadlineDate}
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ID property referenced by 'href' above */}
      <section
        id="faq"
        className={css({
          margin: 'auto',
          marginBottom: '10rem',
          width: '100%',

          // Once the screen is above the 'md' size, set the width manually
          [ScreenSizeBreakpoints.md]: {
            width: '60rem',
          },
        })}
      >
        <h1
          style={{
            color: 'black',
            marginTop: '4rem',
            marginBottom: '4rem',
            fontWeight: 300,
            whiteSpace: 'nowrap',
            fontSize: '1.5rem',
            width: '100%',
            // Center the text
            textAlign: 'center',
          }}
        >
          FAQ
        </h1>

        <div
          style={{
            width: '100%',
            maxWidth: '35rem',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        >
          {tournament.faqs.map(faq => (
            <FAQ title={faq.title} key={faq.title} content={faq.content} />
          ))}
        </div>
      </section>
    </BasicLayout>
  );
};

export default TournamentsPage;
