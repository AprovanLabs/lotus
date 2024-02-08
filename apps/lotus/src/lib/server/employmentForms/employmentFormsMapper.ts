import { FilledLinkToMediaField } from '@prismicio/client';
import { EmploymentFormsModel } from '../../core/models/employmentForms';
import { EmploymentFormsDocumentData } from 'prismicio-types';

export const mapPrismicEmploymentForms = (data: EmploymentFormsDocumentData) =>
  ({
    pageTitle: data?.title || null,
    forms: (data?.forms || []).map(form => ({
      ...form,
      title: form?.form_name,
      link: (form?.form_link as FilledLinkToMediaField).url,
    })),
  } as EmploymentFormsModel);
