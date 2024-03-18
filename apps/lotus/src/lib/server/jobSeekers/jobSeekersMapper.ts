import type { JobSeekersModel } from 'src/lib/core/models/jobSeekers';
import type { CareerFieldsSlice, JobSeekersDocumentData, ProcessStepsSlice } from 'prismicio-types';

export const mapPrismicJobSeekers = (data: JobSeekersDocumentData) =>
  ({
    whatToExpectSteps: (data?.what_to_expect_steps || []).map(step => step.step),
    processSteps: ((data?.slices || []) as ProcessStepsSlice[])
      .filter(slice => slice.slice_type === 'process_steps')
      .map(slice => ({
        title: slice?.primary?.title,
        steps: (slice?.items || []).map(item => ({
          number: item.step_number,
          description: item.step_description,
        })),
      }))?.[0],
    careerFields: ((data?.slices || []) as CareerFieldsSlice[])
      .filter(slice => slice.slice_type === 'career_fields')
      .map(slice => ({
        title: slice?.primary?.title,
        careers: (slice?.items || []).map(item => item.job),
      }))?.[0],
  } as JobSeekersModel);
