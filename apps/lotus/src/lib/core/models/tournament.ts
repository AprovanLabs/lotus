export type FaqModel = {
  title: string;
  text?: string;
  link?: string;
  linkLabel?: string;
  warning?: string;
}

export type DrawModel = {
  title: string;
  description?: string;
  link?: string;
  linkLabel?: string;
  iframe?: string;
  image: {
    width: number,
    height: number,
    url: string,
  }
}

export type TournamentModel = {
  title: string;
  registrationDeadlineDate: string;
  fromDate: string;
  toDate: string;
  signUpFormUrl: string;
  faqs: FaqModel[];
  draws: DrawModel[];
  tShirtImage: {
    width: number,
    height: number,
    url: string,
  }
};
