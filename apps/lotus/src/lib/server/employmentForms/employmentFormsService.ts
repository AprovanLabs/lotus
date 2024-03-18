import type { EmploymentFormsModel } from 'src/lib/core/models/employmentForms';
import client from 'src/lib/server/prismic/prismicClient';
import { mapPrismicEmploymentForms } from './employmentFormsMapper';

class EmploymentFormsService {
  static async getEmploymentForms(): Promise<EmploymentFormsModel | null> {
    const page = await client.getByUID("employment_forms", "employment-forms");

    if (!page) return null;

    return mapPrismicEmploymentForms(page.data);
  }
}

export default EmploymentFormsService;
