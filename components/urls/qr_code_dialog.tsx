"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { LuQrCode } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import { HexColorPicker } from "react-colorful";

interface QRCodeDialogProps {
  shortLink: string;
}

export default function QRCodeDialog({ shortLink }: QRCodeDialogProps) {
  const [qrColor, setQrColor] = useState("#000000");
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const imgRef = useRef<SVGSVGElement | null>(null);

  const handleDownloadAsSVG = () => {
    const svg = imgRef.current;
    if (!svg) return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "qr-code.svg";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadAsPNG = () => {
    const svgElement = imgRef.current;
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      const scaleFactor = 4; // 4x resolution for better quality
      const canvas = document.createElement("canvas");
      canvas.width = svgElement.clientWidth * scaleFactor;
      canvas.height = svgElement.clientHeight * scaleFactor;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Draw the image on the canvas
        ctx.scale(scaleFactor, scaleFactor);
        ctx.drawImage(img, 0, 0);

        // Draw the embedded logo
        const logo = new Image();
        logo.onload = () => {
          // Adjust the position where the logo should appear
          ctx.drawImage(logo, svgElement.clientWidth / 2 - 20, svgElement.clientHeight / 2 - 20, 40, 40);
          const pngUrl = canvas.toDataURL("image/png");

          const a = document.createElement("a");
          a.href = pngUrl;
          a.download = "qr-code.png";
          a.click();

          URL.revokeObjectURL(pngUrl);
        };
        logo.src = "/logo.svg"; // URL of the logo
      }
      URL.revokeObjectURL(url);
    };

    // Important: set higher image resolution too
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  };




  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex w-full items-center space-x-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
        >
          <LuQrCode className="mr-2 h-4 w-4" />
          <span>QR Code</span>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-sm text-center">
        <DialogHeader>
          <DialogTitle>QR Code for Short URL</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            You can scan, customize, or save this QR code.
          </DialogDescription>
        </DialogHeader>

        <section className="relative rounded-xl overflow-hidden p-6 bg-white dark:bg-black">
          <div
            className="absolute inset-0 bg-[radial-gradient(#00000033_2px,transparent_2px)] dark:bg-[radial-gradient(#ffffff33_2px,transparent_2px)] [background-size:14px_14px] pointer-events-none"
          />
          <div className="relative z-10 flex justify-center">
            <QRCodeSVG
              ref={imgRef}
              className="rounded-md border dark:border-white"
              value={shortLink}
              size={180}
              fgColor={qrColor}
              bgColor="#ffffff"
              level="H"
              imageSettings={{
                src: "/logo.svg",
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
        </section>



        <p className="text-sm mt-2 mb-4 break-all">{shortLink}</p>


        <Dialog open={isColorDialogOpen} onOpenChange={setIsColorDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              Pick QR color
            </Button>
          </DialogTrigger>

          {/* Color Picker Dialog */}
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Pick QR color</DialogTitle>
              <DialogDescription>
                Pick the suitable color for the QR code.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <HexColorPicker
                color={qrColor}
                onChange={setQrColor}
                className="rounded-md border border-gray-300"
              />
            </div>
            <DialogFooter>
              {/* Close color picker dialog on Done */}
              <Button
                onClick={() => setIsColorDialogOpen(false)} // Close the color picker dialog
              >
                Done
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>




        <section className="flex justify-center items-center space-x-4 ">
          <Button className="font-semibold" onClick={handleDownloadAsSVG}>
            Download as SVG
          </Button>
          <Button className="font-semibold" onClick={handleDownloadAsPNG}>
            Download as PNG
          </Button>
        </section>
      </DialogContent>
    </Dialog>
  );
}
