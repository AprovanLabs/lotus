import { OtherModel } from 'src/lib/core/models/other';
import { mapPrismicImage, mapPrismicRichTextFieldToString } from '../prismic/prismicMappers';
import { OtherDocumentData } from "prismicio-types";

export const mapPrismicOther = (data: OtherDocumentData): OtherModel => {
  return {
    description: mapPrismicRichTextFieldToString(data?.description) || "",
    title: mapPrismicRichTextFieldToString(data?.title) || "",
  } as OtherModel;
};
