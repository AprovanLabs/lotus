import { RichTextField } from '@prismicio/client';

export type JobModel = {
  title: string;
  pay: string;
  location: string;
  description: RichTextField;
  responsibilities: RichTextField;
  qualifications: RichTextField;
};

export type CurrentOpeningsModel = {
  jobs: JobModel[];
};
