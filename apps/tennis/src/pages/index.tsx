import Link from 'next/link';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';
import BasicLayout from '../layouts/BasicLayout';
import Image from 'next/image';
import { ChevronLast } from 'lucide-react';

const HomePage = () => {
  return (
    <BasicLayout>
      <div
        className={css`
          position: relative;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding-left: 55rem;
          color: white;
          margin-top: 0rem;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 31%,
            rgba(31, 52, 39, 1) 66%
          ), url('/resources/images/rtc-inside.jpeg');
          background-size: 100% 100%;
          background-repeat: no-repeat;
          background-position: center;
          z-index: 0;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 0;
          `}
        />
        <Image
          src="/resources/images/decoration-tennis-ball.png"
          alt="Tennis Ball Decoration"
          width={250}
          height={250}
          className={css`
            position: absolute;
            top: 27%;
            left: -2rem; 
            transform: translateY(-50%);
            z-index: 1;
          `}
        />
        <h1
          className={css`
            position: relative;
            z-index: 1;
            background-color: transparent;
            margin-bottom: 0;
            font-size: 4.3rem;
            font-weight: 200;
            white-space: nowrap;
          `}
        >
          Highly Strung
        </h1>
        <h1
          className={css`
            position: relative;
            z-index: 1;
            background-color: transparent;
            margin-top: 0.5rem;
            font-size: 3.0rem;
            font-weight: 200;
            white-space: nowrap;
          `}
        >
          Tennis Tournament
          <span
            className={css`
              display: block;
              font-size: 2.5rem;
              font-weight: 400;
              -webkit-text-fill-color: transparent;
              -webkit-text-stroke-width: 1px;
              -webkit-text-stroke-color: white;
            `}
          >
            July 23rd - July 26th
            <span
              className={css`
                display: block;
                font-size: 1.5rem;
                font-weight: 200;
                -webkit-text-fill-color: white;
                -webkit-text-stroke-color:  #A9A9A9;
                margin-top: 0.5rem;
              `}
            >
              Join us for a weekend of good tennis and good fun!
            </span>
          </span>
        </h1>
        <Link href="/contact-us">
          <a
            className={css`
              position: relative;
              display: inline-flex;
              align-items: center;
              background-color: white;
              color: black;
              font-size: 1.5rem;
              font-weight: 400;
              padding: 0.75rem 1.5rem;
              margin-top: 1rem;
              text-decoration: none;
              border-radius: 4px;
              transition: background-color 0.3s ease;
              z-index: 2;
            `}
          >
            Sign-up and Information
            <ChevronLast
              size={18}
              className={css`
                margin-left: 0.5rem;
              `}
            />
          </a>
        </Link>
        <div
          className={css`
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            width: 100%;
            margin-top: 2rem;
            z-index: 1;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            `}
          >
            <Image
              src="/resources/images/players-5.jpg"
              alt="Tennis Players 5"
              width={200}
              height={200}
              className={css`
                margin-bottom: 1rem;
              `}
            />
            <Image
              src="/resources/images/players-4.jpg"
              alt="Tennis Players 4"
              width={200}
              height={200}
            />
          </div>
          <div>
            <Image
              src="/resources/images/players-2.jpg"
              alt="Tennis Players 2"
              width={400}
              height={800}
              className={css`
                margin-left: 2rem;
              `}
            />
          </div>
        </div>
      </div>
    </BasicLayout>
  );
};

export default HomePage;