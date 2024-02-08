import { ProcessSteps } from 'src/lib/core/models/shared';

const ProcessSection = ({ processSteps }: { processSteps: ProcessSteps | undefined }) => {
  const colors = ['#B4D897', '#8DB66D', '#71B33D', '#5E9136'];
  return (
    <div className="w-fit mx-auto text-[#011F33] font-mono pt-48">
      <h2 className="text-5xl uppercase text-center">{processSteps?.title}</h2>
      <div className="flex justify-center pt-10">
        {/* moveDown icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#011F33"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-move-down"
        >
          <path d="M8 18L12 22L16 18" />
          <path d="M12 2V22" />
        </svg>
      </div>
      {processSteps?.steps.map((step, index) => {
        return (
          <div className="flex gap-9 pt-16">
            <div
              className={`bg-[${
                colors[index % 4]
              }] text-white font-bold w-60 h-60 flex justify-center items-center text-5xl`}
            >
              {step.number}
            </div>
            <p className="flex items-center w-96 text-2xl">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessSection;
