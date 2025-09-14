"use client";

import { useQRCode } from "next-qrcode";

export default function QRCode({
  data,
  width = 200,
}: {
  data: string;
  width?: number;
}) {
  const { SVG } = useQRCode();

  return (
    <SVG
      text={data}
      options={{
        errorCorrectionLevel: "M",
        margin: 3,
        scale: 4,
        width: width,
        color: {
          dark: "#000",
          light: "#FFFFFF",
        },
      }}
    />
  );
}
