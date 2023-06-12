import * as React from 'react';

import { cn } from 'src/lib/utils';

import NextLink, { LinkProps } from 'next/link';
import { HTMLProps, FC } from 'react';

const InlineLink: FC<LinkProps & HTMLProps<HTMLAnchorElement>> = ({
  as,
  children,
  href,
  replace,
  scroll,
  shallow,
  passHref,
  className,
  ...rest
}) => (
  <NextLink
    as={as}
    href={href}
    passHref={passHref}
    replace={replace}
    scroll={scroll}
    shallow={shallow}
  >
    <a
      className={cn(
        'font-bold transition-all ease-in-out border-b-[0.075rem] border-solid border-transparent text-white hover:border-white',
        className
      )}
      {...rest}
    >
      {children}
    </a>
  </NextLink>
);

export default InlineLink;
