import { CurrentOpeningsModel, JobModel } from 'src/lib/core/models/currentOpenings';
import { RichText } from 'prismic-reactjs';
import { css } from '@emotion/css';
import { cn } from 'src/core/utils';

const JobSection = ({ jobs }: { jobs: JobModel[] | undefined }) => {
  return (
    <div className="w-fit mx-auto">
      {jobs?.map(job => {
        return (
          <div
            className={cn(
              css({
                '* li::before': {
                  content: '"- "',
                  display: 'inline',
                  paddingLeft: '1rem',
                },
              }),
              'pb-16'
            )}
          >
            <h2 className="text-3xl pb-4">{job.title}</h2>
            <p className="pb-2">{job.pay}</p>
            <p className="pb-2">{job.location}</p>
            <h2 className="font-semibold">Description: </h2>
            <RichText render={job.description as any} />
            {/* <h2 className="font-semibold pt-4">Responsibilities: </h2>
            <RichText render={job.responsibilities as any} />
            <h2 className="font-semibold">Qualifications: </h2>
            <RichText render={job.qualifications as any} /> */}
          </div>
        );
      })}
    </div>
  );
};

export default JobSection;
