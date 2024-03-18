export type EmployeeModel = {
  name: string;
  title: string;
  email: string;
  linkedInLink: string;
  cellNumber: string;
  officeNumber: string;
  imageUrl: string;
};

export type EmployeesSectionModel = {
  title: string;
  employees: EmployeeModel[];
};
