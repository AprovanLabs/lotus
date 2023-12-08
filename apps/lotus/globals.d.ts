import React from 'react';
import type { SwiperSlideProps, SwiperProps } from 'swiper/react';

declare module '*.svg' {
  const content: string;
  export default content;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperProps,
        HTMLElement
      >;
      'swiper-slide': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & SwiperSlideProps,
        HTMLElement
      >;
    }
  }
}
