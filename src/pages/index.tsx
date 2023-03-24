import NextImage, { ImageProps as NextImageProps } from "next/image";
import calendar from "@/../public/calendar.png";
import clsx from "clsx";

export default function Home() {
  return (
    <div className="min-h-screen min-w-screen p-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-16">Hello World</h1>
      <Image
        src={calendar}
        alt="Calendar with interview books across the week"
        placeholder="blur"
        width={1078}
        height={522}
        sizes={{
          xs: 328,
          sm: 608,
          md: 736,
          lg: 992,
          xl: 1078,
        }}
        quality={100}
        priority
      />
    </div>
  );
}

type SizeOptions = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type ImageProps = Omit<
  NextImageProps,
  "src" | "width" | "height" | "sizes"
> &
  ({ src: NextImageProps["src"] } | { hash: string; ext: string }) & {
    width: number;
    height: number;
    sizes?: SizeOptions;
  };

export const Image = (props: ImageProps) => {
  const { src, hash, ext, width, height, sizes, ...rest } = props as any;
  const imageSizes = sizes && getSizes(sizes, width);
  return (
    <NextImage
      {...rest}
      src={src}
      sizes={imageSizes}
      height={height}
      width={width}
    />
  );
};

const getSizes = (opts: SizeOptions, width: number): string => {
  return clsx(
    `(min-width: 1536px) ${width}px, `,
    `(min-width: 1280px) ${opts.xl}px,`,
    `(min-width: 1024px) ${opts.lg}px,`,
    `(min-width: 768px) ${opts.md}px,`,
    `(min-width: 640px) ${opts.sm}px,`,
    `${opts.xs}px` // 360px
  );
};
