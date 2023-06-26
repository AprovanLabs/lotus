import { RichTextField } from "@prismicio/client";

export type _RichTextField = {
  text: string;
};

export const mapPrismicRichTextFieldToString = (prismicNode?: RichTextField): string | undefined => {
  if (!prismicNode?.length) return undefined;

  return (prismicNode as unknown as _RichTextField[]).map((n) => n.text.replace(/^\s+|\s+$/g, '')).join('\n');
}

export const mapPrismicImage = (prismicImage: any) => {
  if (!prismicImage) return null;
  if (!prismicImage?.dimensions) return null;

  return {
    width: prismicImage?.dimensions?.width,
    height: prismicImage?.dimensions?.height,
    url: prismicImage.url,
  }
}
