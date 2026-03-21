export type Slide = {
  key: string;
  src: string;
  clone?: 'head' | 'tail';
};

export const buildSlides = (images: string[], hasLoop: boolean): Slide[] => {
  const length = images.length;

  if (!length) return [];
  if (!hasLoop) return images.map((src, i) => ({ key: `img-${i}-${src}`, src }));

  return [
    {
      key: `clone-head-${images[length - 1]}`,
      src: images[length - 1],
      clone: 'head',
    },
    ...images.map((src, i) => ({ key: `img-${i}-${src}`, src })),
    { key: `clone-tail-${images[0]}`, src: images[0], clone: 'tail' },
  ];
};

export const clamp = (value: number, max: number) =>
  Math.max(-max, Math.min(max, value));

export const clampFiniteIndex = (value: number, length: number) =>
  length ? Math.max(0, Math.min(length - 1, value)) : 0;

export const getNormalizedLoopIndex = (value: number, length: number) => {
  if (!length) return 0;
  const dot = (((value - 1) % length) + length) % length;
  return dot + 1;
};
