import { ProcessSteps } from './shared';
import { CareerFields } from './shared';

export type StatsModel = {
  value: string;
  label: string;
};

export type ClientsModel = {
  heading: string;
  line1: string;
  line2: string;
  stats: StatsModel[];
  processSteps: ProcessSteps;
  careerFields: CareerFields[];
};
