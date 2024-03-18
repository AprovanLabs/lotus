import type { EmployeesSectionModel } from 'src/lib/core/models/employees';
import { mapPrismicEmployees } from './employeesMapper';
import client from '../prismic/prismicClient';

class EmployeesService {
  static async getEmployees(): Promise<EmployeesSectionModel | null> {
    const page = await client.getSingle('employees');

    if (!page) return null;

    return mapPrismicEmployees(page.data);
  }
}

export default EmployeesService;
