import { JobModel } from 'src/lib/core/models/currentOpenings';
import { RichText } from 'prismic-reactjs';
import { css } from '@emotion/css';
import { cn } from 'src/core/utils';
import { SetStateAction, useState } from 'react';
import { Banknote, ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import Link from 'next/link';

const JobSection = ({ jobs }: { jobs: JobModel[] | undefined }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const toggle = (i: number | null) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };
  return (
    <div className="px-16 mx-auto max-w-[70rem] pb-44">
      {jobs?.map((job, index) => {
        return (
          <div key={index}>
            <div
              className={cn(
                css({
                  '* li::before': {
                    content: '"- "',
                    display: 'inline',
                    paddingLeft: '1rem',
                  },
                }),
                'py-20'
              )}
            >
              <div
                onClick={() => {
                  toggle(index);
                }}
              >
                <div className="flex justify-between cursor-pointer">
                  <h2 className="pb-4 text-3xl font-semibold">{job.title}</h2>
                  {selected === index ? <ChevronUp /> : <ChevronDown />}
                </div>
                <div className={job.pay ? 'flex gap-4 text-gray-500' : 'hidden'}>
                  <Banknote />
                  <p className="pb-2">{job.pay}</p>
                </div>
                <div className={job.location ? 'flex gap-4 text-gray-500' : 'hidden'}>
                  <MapPin />
                  <p className="pb-2">{job.location}</p>
                </div>
              </div>
              <div className={selected === index ? 'h-auto pt-16' : 'max-h-0 overflow-hidden'}>
                {job.description.length > 0 && <h2 className="font-semibold">Description: </h2>}
                <RichText render={job.description as any} />
                {job.responsibilities.length > 0 && (
                  <h2 className="pt-4 font-semibold">Responsibilities: </h2>
                )}
                <RichText render={job.responsibilities as any} />
                {job.qualifications.length > 0 && (
                  <h2 className="pt-4 font-semibold">Qualifications: </h2>
                )}
                <RichText render={job.qualifications as any} />
                <Link href="/contact-us">
                  <button className="hover:text-white rounded bg-gradient-to-r from-[#78B994] to-[#71B33D] w-52 p-2 mt-16">
                    Apply Now
                  </button>
                </Link>
              </div>
            </div>
            <div className="h-1 bg-gradient-to-r from-[#2E8C37] via-[#00A7E4] to-[#CAEBFC]"></div>
          </div>
        );
      })}
    </div>
  );
};

export default JobSection;
