import Image from "next/image"

export default function Qr() {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://flavorflow-ai.vercel.app`

  return (
    <div>
      <Image src={url} alt="qr code" width={150} height={150}/>
    </div>
  )
}
