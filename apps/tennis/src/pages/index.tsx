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

            <Link href="/tournaments/latest">
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

        <div className="bg-white text-black h-96 w-full text-center pb-12 pt-24 font-thin">
          <h2 className="text-2xl">Proudly sponsored by</h2>
          <div className="flex flex-row justify-around items-center h-full">
            <div className="flex items-center">
              <Image
                src="/resources/images/sponsor-jj.webp"
                alt="Sponsor JJ"
                width={150}
                height={50}
                className="flex-none"
              />
            </div>
            <div className="flex items-center">
              <Image
                src="/resources/images/sponsor-trinite.png"
                alt="Sponsor Trinite"
                width={150}
                height={50}
                className="flex-none"
              />
            </div>
            <div className="flex items-center">
              <Image
                src="/resources/images/sponsors-lotus.png"
                alt="Sponsor Lotus"
                width={150}
                height={50}
                className="flex-none"
              />
            </div>
          </div>
        </div>
        <div className="bg-[#1f3427] text-white h-auto w-full text-center pb-12 pt-24 font-thin mb-55">
          <h2 className="text-2xl">Meet the organizers</h2>
          <div className="flex flex-col md:flex-row items-start justify-start">
            <div className="flex-none mx-auto mt-7">
              <div className="mb-5 mr-40 ml-20 max-w-sm">
                <Image
                  src="/resources/images/players-ryan-and-brian.jpeg"
                  alt="Ryan and Brian"
                  width={500} // Increase the width value
                  height={200} // Increase the height value
                />
              </div>
            </div>
            <div className="flex items-center mt-7">
              <div className="flex flex-col text-left">
                <p className="text-lg mb-.5">Brian Rousslang</p>
                <p className="text-lg mb-2">Ryan Kadelbach</p>
                <p className="text-sm">Two best friends with a passion for growing</p>
                <p className="text-sm mb-1">tennis communities</p>
                <p className="text-gray-500 text-xs mb-2">since 2014</p>
                <Link href="/contact-us">
                  <Button style={{ fontWeight: 'bold' }}>Contact Us &rarr;</Button>
                </Link>
              </div>
            </div>
            <div className="flex-grow"></div>
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export async function getStaticProps() {
  const tournament = await TournamentService.getLatestTournament();
  const contact = await ContactService.getContact();

  return {
    props: {
      contact,
      tournament: tournament || null,
    },
  };
}

export default HomePage;
