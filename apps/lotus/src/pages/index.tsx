import BasicLayout from '../layouts/BasicLayout';

const HomePage = () => {
  const heading = 'Work is hectic';
  const tagline = `Getting help doesn't have to be`;
  const subHeading = 'Who we are';
  const bodyChunk1 = `Lotus Technical has filled positions in organizations of all sizes ranging from the small family-owned business to large Fortune 500 companies`;
  const bodyChunk2 = `Our staffing expertise and recruiting resources have helped us successfully place candidates in various roles from assembly to C-level executives`;
  const bodyChunk3 = `Whether you are looking to fill an entry-level position or an executive position, Lotus Technical will help you find your most important business resource - your people`;
  const subHeading2 = 'What we do';
  const body2Chunk1 =
    'Lotus Technical closes the gap between job seekers and organizations looking to fill positions in the Engineering, IT and Manufacturing industries';
  const body2Chunk2 =
    'With historically low unemployment rates, organizations spend unnecessary time and cost recruiting, screening, and hiring the right person for the job. Additionally, many organizations lack the internal resources to find, attract, and retain the right talent';
  const body2Chunk3 =
    'Since 2010, our job has been to connect organizations to top talent and simplify their hiring process.';
  //bg-[left_top_-90rem] bg-cover bg-no-repeat

  return (
    <div className="bg-[#011F33]">
      <div className="bg-[url('/resources/images/transparent-logo.png')]  text-white font-mono">
        <BasicLayout>
          <div className="flex flex-col gap-y-11 text-center pt-40">
            <h1 className="text-9xl uppercase">{heading}</h1>
            <p className="text-4xl">{tagline}</p>
            <div className="flex gap-x-24 justify-center p-20">
              <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 text-[#011e32]">
                Contact Us
              </button>
              <button className="rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 text-[#011e32]">
                Current Openings
              </button>
            </div>
            <div className="flex justify-center pb-40">
              {/* moveDown icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-move-down"
              >
                <path d="M8 18L12 22L16 18" />
                <path d="M12 2V22" />
              </svg>
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col gap-y-11 pt-40 p-60 w-3/4">
              <h2 className="text-6xl uppercase">{subHeading}</h2>
              <p className="text-2xl">{bodyChunk1}</p>
              <p className="text-2xl">{bodyChunk2}</p>
              <p className="text-2xl">{bodyChunk3}</p>
            </div>
            <img src="/resources/images/cutLines2.png" className="w-[40rem]"></img>
          </div>
          <div className="flex justify-end">
            <img src="/resources/images/cutLines.png" className="w-[40rem]"></img>
            <div className="flex flex-col	gap-y-11 pt-20 p-60 w-3/4">
              <h2 className="text-6xl uppercase">{subHeading2}</h2>
              <p className="text-2xl">{body2Chunk1}</p>
              <p className="text-2xl">{body2Chunk2}</p>
              <p className="text-2xl">{body2Chunk3}</p>
            </div>
          </div>
        </BasicLayout>
      </div>
    </div>
  );
};

export default HomePage;
