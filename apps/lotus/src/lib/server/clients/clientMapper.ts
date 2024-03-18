import { CareerFieldsSlice, ClientDocumentData, ProcessStepsSlice } from 'prismicio-types';
import type { ClientsModel } from 'src/lib/core/models/clients';

export const mapPrismicClients = (data: ClientDocumentData) =>
  ({
    heading: data?.heading,
    line1: data?.line_1,
    line2: data?.line_2,
    stats: (data?.stats || []).map(stat => ({ value: stat.value, label: stat.label })),
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
      })),
  } as ClientsModel);
