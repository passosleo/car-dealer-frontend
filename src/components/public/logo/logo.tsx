import Image from "next/image";
import Link from "next/link";
import React from "react";

export type LogoProps = {
  logoImageUrl: string;
  logoUrl?: string;
  title: string;
};

const Logo = React.forwardRef<HTMLAnchorElement, LogoProps>(
  ({ logoImageUrl, logoUrl = "/", title }, ref) => {
    return (
      <Link href={logoUrl} ref={ref} className="flex items-center gap-8">
        {logoImageUrl ? (
          <Image src={logoImageUrl} alt="logo" width={50} height={50} />
        ) : (
          <></>
        )}
        {title ? (
          <h1 className="text-white text-xl text-nowrap">{title}</h1>
        ) : (
          <></>
        )}
      </Link>
    );
  }
);

Logo.displayName = "Logo";

export { Logo };
