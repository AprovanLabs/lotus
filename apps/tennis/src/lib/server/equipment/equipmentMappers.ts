import { EquipmentModel } from 'src/lib/core/models/equipment';
import { mapPrismicImage, mapPrismicRichTextFieldToString } from '../prismic/prismicMappers';
import { EquipmentDocumentData } from "prismicio-types";
export const mapPrismicEquipment = (data: EquipmentDocumentData): EquipmentModel => {
  return {

    image: data?.image ? mapPrismicImage(data?.image) : null,
    description: mapPrismicRichTextFieldToString(data?.description) || "",
    title: mapPrismicRichTextFieldToString(data?.title) || "",
    price: data.price ?? 0,
    inStock: data.inStock,
  };
};
