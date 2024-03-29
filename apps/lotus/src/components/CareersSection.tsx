import Link from 'next/link';
import { CareerFields } from 'src/lib/core/models/shared';

//Megan notes -
//fill space of parent
//flex automatically fills to children

//as a parent I can use flex to center my children using align and justify
//as a child I can center myself within my parent using mx-auto and my-auto

const CareersSection = ({ careerFields }: { careerFields: CareerFields | undefined }) => {
  const colors = ['#5FC3F7', '#00A7E4', '#4DBDF6'];
  return (
    <div className="w-full">
      <div className="text-5xl text-center uppercase">{careerFields?.title}</div>
      <div className="flex flex-col items-center justify-center gap-8 py-12 md:gap-24 md:flex-row">
        <Link href="/contact-us">
          <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2">
            Contact Us
          </button>
        </Link>
        <Link href="/current-openings">
          <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2">
            Openings
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap justify-center max-w-screen-lg px-16 pt-16 mx-auto gap-11">
        {careerFields?.careers?.map(career => {
          return (
            <div
              key={career}
              style={{
                backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              }}
              className="flex items-center justify-center p-10 text-2xl text-white uppercase w-60 h-60"
            >
              {career}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareersSection;
