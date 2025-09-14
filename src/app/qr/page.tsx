import QRcode from "~/components/QRcode";

export default function ShowQR() {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <QRcode data={"https://flavorflow-ai.vercel.app"} />
    </div>
  )
}
