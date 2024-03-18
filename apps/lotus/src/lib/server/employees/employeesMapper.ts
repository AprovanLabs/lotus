import { EmployeesDocumentData } from 'prismicio-types';
import type { EmployeesSectionModel } from 'src/lib/core/models/employees';

export const mapPrismicEmployees = (data: EmployeesDocumentData) =>
  ({
    title: data?.title,
    employees: (data?.employees || []).map(employee => ({
      name: employee?.name,
      title: employee?.job_title,
      email: employee?.email,
      cellNumber: employee?.cell_number,
      officeNumber: employee?.office_phone_number,
      linkedInLink: employee?.linkedin_link,
      imageUrl: employee?.image?.url,
    })),
  } as EmployeesSectionModel);
