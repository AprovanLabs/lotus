import Link from 'next/link';
import { css } from '@emotion/css';
import { ScreenSizeBreakpoints } from 'src/lib/style';
import BasicLayout from '../layouts/BasicLayout';
import Image from 'next/image';

const HomePage = () => {
  return (
    <BasicLayout>
      <div
        className={css`
          background: #1F3427;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          padding-left: 2rem;
          color: white;
          margin-top: 5rem;
        `}
      >
        <div
          className={css`
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgb(31, 52, 39);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 0) 31%,
              rgba(31, 52, 39, 1) 66%
            ),
            url('/resources/images/rtc-inside.jpeg');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: left;
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
          </span>
        </h1>
      </div>
    </BasicLayout>
  );
};

export default HomePage;