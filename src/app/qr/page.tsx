import QRcode from "~/components/QRcode";

export default function ShowQR() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <QRcode data={"https://flavorflow-ai.vercel.app"} />
    </div>
  );
}
