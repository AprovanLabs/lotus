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
      <div className="flex justify-center gap-4">
        <a href={`mailto:brousslang@lotustechnical.com`}>
          <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 my-8">
            Contact Us
          </button>
        </a>
        <a href="/current-openings">
          <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 my-8">
            Openings
          </button>
        </a>
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
