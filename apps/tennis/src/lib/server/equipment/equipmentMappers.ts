import { EquipmentModel } from "src/lib/core/models/equipment";
import { mapPrismicImage, mapPrismicRichTextFieldToString } from "../prismic/prismicMappers";
import { EquipmentDocumentData } from "prismicio-types";


export const
  mapPrismicEquipment = (data: EquipmentDocumentData) => ({
    ...data,
    title: mapPrismicRichTextFieldToString(data?.title) || null,
    description: mapPrismicRichTextFieldToString(data?.description) || null,
  }) as EquipmentModel;
