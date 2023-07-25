import { TournamentModel } from "src/lib/core/models/tournament";
import { mapPrismicImage, mapPrismicRichTextFieldToString } from "../prismic/prismicMappers";
import { TournamentDocumentData } from "prismicio-types";

export const
  mapPrismicTournament = (data: TournamentDocumentData) => ({
    ...data,
    tShirtImage: data?.tShirtImage ? mapPrismicImage(data?.tShirtImage) : null,
    signUpFormUrl: (data.signUpForm as { url: string })?.url as string,
    faqs: (data?.faqs || []).map((faq) => ({
      ...faq,
      link: mapPrismicRichTextFieldToString(faq?.link) || null,
      text: mapPrismicRichTextFieldToString(faq?.text) || null,
    })),
    draws: (data?.draws || []).map((draw) => ({
      ...draw,
      image: draw?.image ? mapPrismicImage(draw?.image) : null,
      description: mapPrismicRichTextFieldToString(draw?.description) || null,
      link: mapPrismicRichTextFieldToString(draw?.link) || null,
      linkLabel: mapPrismicRichTextFieldToString(draw?.linkLabel) || null,
      iframe: mapPrismicRichTextFieldToString(draw?.iframe) || null,
    })),
  }) as TournamentModel;
