import Link from 'next/link';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';
import BasicLayout from '../layouts/BasicLayout';
import Image from 'next/image';
import { Button } from 'src/components/Button';
import TournamentService from 'src/lib/server/tournaments/tournamentService';
import ContactService from 'src/lib/server/contact/contactService';
import { TournamentModel } from 'src/lib/core/models/tournament';
import { ContactModel } from 'src/lib/core/models/contact';

const HomePage = ({
  tournament,
  contact,
}: {
  tournament: TournamentModel;
  contact: ContactModel;
}) => {
  return (
    <BasicLayout>
      <div className="relative h-full w-full flex flex-col align-center justify-center text-white mt-0 z-0">
        <div
          className={css(`
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-bottom: 36rem;
            padding-top: 8rem;
        `)}
        >
          <div
            className={css(`
              position: absolute;
              width: calc(100% + 2rem);
              height: 100%;
              filter: blur(10px);
              background:
                linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(31, 52, 39, 1) 60%),
                url('/resources/images/rtc-inside.jpeg');
              background-size: 100% 100%;
              background-repeat: no-repeat;
              background-position: 0 0;
              background-size: cover;
          `)}
          ></div>
          <div className="relative mt-48 translate-x-12">
            <Image
              src="/resources/images/decoration-tennis-ball.png"
              alt="Tennis Ball Decoration"
              width={250}
              height={250}
              className="absolute -top-4 w-20 left-0 -translate-x-3/4 sm:w-56"
            />
            <h1 className="relative z-1 bg-transparent mb-0 text-4xl bold whitespace-nowrap">
              Highly Strung
              <br />
              Tennis Tournament
            </h1>

            <h2
              className={css`
                display: block;
                font-size: 1.75rem;
                font-weight: 400;
                margin-top: 0.5rem;
                -webkit-text-fill-color: transparent;
                -webkit-text-stroke-width: 1px;
                -webkit-text-stroke-color: white;
              `}
            >
              July 23rd - July 26th
            </h2>

            <p className="block text-xl font-normal mt-2 mb-4 opacity-50 pr-16">
              Join us for a weekend of good tennis and good fun!
            </p>

            <Link href="/tournaments/hstt-2023">
              <Button>Sign-up and Information &rarr;</Button>
            </Link>
          </div>
        </div>
        <div className="relative flex flex-col md:flex-row gap-8 align-baseline w-[calc(100%-4rem)] md:w-full max-w-2xl mx-8 md:mx-auto -translate-y-96 -mb-96">
          <div
            className={css`
              display: flex;
              flex-grow: 1;
              flex-direction: column;
              align-items: flex-start;
              gap: 2rem;
              width: 100%;
            `}
          >
            <Image
              src="/resources/images/players-5.jpg"
              alt="Tennis Players 5"
              width={200}
              height={200}
              className="w-full rounded-md shadow-md"
            />
            <Image
              src="/resources/images/players-4.jpg"
              alt="Tennis Players 4"
              width={200}
              height={200}
              className="w-full rounded-md shadow-md"
            />
          </div>
          <Image
            src="/resources/images/players-2.jpg"
            alt="Tennis Players 2"
            width={400}
            height={800}
            className="flex-grow w-full rounded-md shadow-md"
          />
        </div>

        <div className="bg-white text-black h-48 w-full text-center pb-12 pt-24 font-thin">
          <h2 className="text-2xl">Proudly sponsored by</h2>
          <div className="flex flex-row justify-around"></div>
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getServerSideProps() {
  const tournaments = await TournamentService.getAllTournaments();
  const contact = await ContactService.getContact();

  return {
    props: {
      contact,
      tournament: tournaments ? tournaments[0] : null,
    },
  };
}

export default HomePage;
