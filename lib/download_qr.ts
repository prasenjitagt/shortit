import QRCode from "qrcode";

export async function downloadQRCode(link: string) {
    if (!link) return;

    try {
        const dataUrl = await QRCode.toDataURL(link, {
            margin: 2,
            scale: 10,
            color: {
                dark: "#1e40af", // blue
                light: "#f1f5f9", // light gray
            },
        });

        const a = document.createElement("a");
        a.href = dataUrl;
        a.download = "fancy-qr.png";
        a.click();
    } catch (error) {
        console.error("Error generating QR code", error);
    }
}
