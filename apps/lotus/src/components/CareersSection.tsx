import { CareerFields } from 'src/lib/core/models/shared';

const CareersSection = ({ careerFields }: { careerFields: CareerFields | undefined }) => {
  const colors = ['#5FC3F7', '#00A7E4', '#4DBDF6'];
  return (
    <div>
      <div className="flex justify-center p-6">
        <div className="text-[#011F33] font-mono uppercase text-5xl">{careerFields?.title}</div>
      </div>
      <div className="flex justify-center gap-4">
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Contact Us
        </button>
        <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 ">
          Openings
        </button>
      </div>
      <div className="grid gap-11 grid-cols-3 pt-16 w-fit mx-auto">
        {careerFields?.careers?.map(career => {
          return (
            <div
              className={`bg-[${
                colors[Math.floor(Math.random() * colors.length)]
              }] text-white uppercase w-60 h-60 flex justify-center items-center text-2xl`}
            >
              <div className="px-20">{career}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CareersSection;
