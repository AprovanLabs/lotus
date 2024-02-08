export type Step = {
  number: string,
  description: string,
}

export type ProcessSteps = {
  title: string,
  steps: Step[],
};

export type CareerFields = {
  title: string,
  careers: string[]
};
