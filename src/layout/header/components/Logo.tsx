import Image from "next/image";

type Props = {
  logo: string;
  title: string;
}

export function Logo({
  logo,
  title
}: Props) {
  return (
    <div className="flex items-center gap-8">
      {logo ? (
        <Image src={logo} alt="logo" width={50} height={50} />
      ) : (
        <></>
      )}
      {title ? <h1 className="text-white text-xl">{title}</h1> : <></>}
    </div>

  )
}