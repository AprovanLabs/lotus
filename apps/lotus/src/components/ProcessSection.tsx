import { ProcessSteps } from 'src/lib/core/models/shared';

const ProcessSection = ({ processSteps }: { processSteps: ProcessSteps | undefined }) => {
  const colors = ['#B4D897', '#8DB66D', '#71B33D', '#5E9136'];
  return (
    <div className="px-10 pt-48 mx-auto w-fit">
      <h2 className="text-5xl text-center uppercase">{processSteps?.title}</h2>
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
          <div key={step.number} className="flex pt-16 gap-9">
            <div
              style={{
                backgroundColor: colors[index % 4],
              }}
              className="flex items-center justify-center text-5xl font-bold text-white w-60 h-60"
            >
              {step.number}
            </div>
            <p className="flex items-center text-2xl w-96">{step.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProcessSection;
