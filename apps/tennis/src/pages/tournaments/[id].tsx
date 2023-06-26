import { useRouter } from 'next/router';
import BasicLayout from 'src/layouts/BasicLayout';
import Image from 'next/image';
import InlineLink from 'src/components/InlineLink';
import { Button } from 'src/components/Button';
import { DownloadIcon, InfoIcon, MapPinIcon } from 'lucide-react';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';
import TournamentService from 'src/lib/server/tournaments/tournamentService';
import ContactService from 'src/lib/server/contact/contactService';
import { FaqModel, TournamentModel } from 'src/lib/core/models/tournament';
import { ContactModel } from 'src/lib/core/models/contact';
import { formatDate } from 'src/lib/core/utils/date';

const Faq: React.FC<React.PropsWithChildren & FaqModel> = ({
  title,
  text,
  link,
  linkLabel,
  warning,
  children,
  ...props
}) => {
  // Show a location icon if a Google Maps link
  const isLocationLink = link && link.indexOf('https://www.google.com/maps') > 0;

  return (
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
        <div className="mx-2">{title}</div>
      </h1>
      <div
        style={{
          borderLeft: '0.25rem solid var(--court-blue-800)',
          fontSize: '0.75rem',
          padding: '1.5rem 0 1rem 2rem',
        }}
      >
        {children}

        {text &&
          text.split('\n').map((line, index) => (
            <p
              key={index}
              style={{
                fontSize: '0.75rem',
                marginBottom: '0.5rem',
              }}
            >
              {line}
            </p>
          ))}

        {warning && (
          <div
            style={{
              color: '#DC493A',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 800,
              marginTop: '1rem',
            }}
          >
            <InfoIcon fontSize="0.75rem" size={12} style={{ marginRight: '0.5rem' }} />
            {warning}
          </div>
        )}

        {/* Links */}
        {link && !isLocationLink && (
          <div
            style={{
              fontSize: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <a href={link}>
              <Button>{linkLabel} &rarr;</Button>
            </a>
          </div>
        )}
        {link && isLocationLink && (
          <div
            style={{
              fontSize: '0.75rem',
              marginTop: '1rem',
            }}
          >
            <a href={`https://www.google.com/maps/search/?api=1&query=${link}`}>
              <Button>
                <MapPinIcon fontSize="0.75rem" size={12} style={{ marginRight: '0.5rem' }} />
                {linkLabel}
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

const TournamentsPage = ({
  tournament,
  contact,
}: {
  tournament: TournamentModel | undefined;
  contact: ContactModel | undefined;
}) => {
  const router = useRouter();

  console.log('tournament', tournament);
  console.log('contact', contact);

  if (!tournament || !contact) return <></>;

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
            {formatDate(tournament.fromDate)} - {formatDate(tournament.toDate)}
          </h2>
          <div
            className={css({
              width: '100%',
              display: 'flex',
              marginTop: '2rem',
              flexDirection: 'column',
              // Allign things in the center with extra space on sides of all the elements together
              justifyContent: 'space-around',
              gap: '1rem',

              // Once the screen is above the 'sm' size, change to horizontal layout
              [ScreenSizeBreakpoints.sm]: {
                flexDirection: 'row',
              },
            })}
          >
            <Image
              src={tournament.tShirtImage.url}
              width={tournament.tShirtImage.width}
              height={tournament.tShirtImage.width}
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
                  href={`email:${contact.email}`}
                  style={{
                    fontWeight: 300,
                  }}
                >
                  {contact.email}
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
                by {formatDate(tournament.registrationDeadlineDate)}
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
            width: 'calc(100% - 2rem)',
            maxWidth: '35rem',
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        >
          {tournament.faqs.map(faq => (
            <Faq {...faq} key={faq.title} />
          ))}
        </div>
      </section>
    </BasicLayout>
  );
};

export async function getServerSideProps({ params }: { params: { id: string } }) {
  const tournament = await TournamentService.getTournamentById(params.id);
  const contact = await ContactService.getContact();

  return {
    props: {
      contact,
      tournament,
    },
  };
}

export default TournamentsPage;
