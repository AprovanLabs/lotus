type ScreenSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const _ScreenSizeBreakpoints: [ScreenSize, string][] = [
  ['sm', '640px'],
  // => @media (min-width: 640px) { ... }

  ['md', '768px'],
  // => @media (min-width: 768px) { ... }

  ['lg', '1024px'],
  // => @media (min-width: 1024px) { ... }

  ['xl', '1280px'],
  // => @media (min-width: 1280px) { ... }

  ['2xl', '1536px'],
  // => @media (min-width: 1536px) { ... }
];

export const ScreenSizeBreakpoints = Object.fromEntries(
  _ScreenSizeBreakpoints.map(([k, v]) => [k, `@media (min-width: ${v})`]) as [ScreenSize, string][]
) as Record<ScreenSize, string>;
