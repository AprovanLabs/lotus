import { RichTextField } from "@prismicio/client";

export type _RichTextField = {
  text: string;
};

export const mapPrismicRichTextFieldToString = (prismicNode?: RichTextField): string | undefined => {
  if (!prismicNode?.length) return undefined;

  return (prismicNode as unknown as _RichTextField[]).map((n) => n.text.replace(/^\s+|\s+$/g, '')).join('\n');
}

export const mapPrismicImage = (prismicImage: any): {
  width: number;
  height: number;
  url: string;
} | undefined => {
  if (!prismicImage) return undefined;
  if (!prismicImage?.dimensions) return undefined;

  return {
    width: prismicImage?.dimensions?.width,
    height: prismicImage?.dimensions?.height,
    url: prismicImage.url,
  }
}
