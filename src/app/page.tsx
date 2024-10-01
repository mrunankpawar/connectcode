"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const wallpapers = ["/wp1.png", "/wp2.png", "/wp3.png"];

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpapers[0]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleWallpaperChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedWallpaper(e.target.value);
  };

  const downloadImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const wallpaperImage = new Image();
    wallpaperImage.src = selectedWallpaper;
    wallpaperImage.crossOrigin = "Anonymous";

    wallpaperImage.onload = () => {
      canvas.width = wallpaperImage.width;
      canvas.height = wallpaperImage.height;

      context?.drawImage(wallpaperImage, 0, 0);

      const qrCodeCanvas = document.querySelector(
        "#qrCodeCanvas canvas"
      ) as HTMLCanvasElement;
      if (qrCodeCanvas) {
        context?.drawImage(
          qrCodeCanvas,
          canvas.width - 285,
          canvas.height - 300,
          180,
          180
        );
      }

      const link = document.createElement("a");
      link.download = "peerlist-wallpaper.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <div className="text-center m-10 flex flex-col items-center justify-center min-h-screen bg-[url('/magicgrid2.png')] bg-cover bg-fixed bg-center">
    {/* <div className="relative text-center m-10 flex flex-col items-center justify-center min-h-screen bg-[url('/magicgrid.png')] bg-cover bg-fixed bg-center after:absolute after:inset-0 after:bg-black after:bg-opacity-50"> */}
      <h1 className="text-4xl font-bold text-emerald-300 m-4">
        ConnectCode Wallpaper
      </h1>

      <p className="text-lg text-gray-300 mb-8">
        Create your personalized wallpaper with a QR code linking to your
        Peerlist or LinkedIn profile.
      </p>

      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Peerlist URL"
          className="bg-slate-950 no-underline group cursor-pointer relative shadow-2xl rounded-lg text-md font-normal text-white border-2 border-emerald-400/50 px-4 py-2 w-80"
        />

        <select
          value={selectedWallpaper}
          onChange={handleWallpaperChange}
          className="bg-slate-950 cursor-pointer relative rounded-lg text-md font-normal text-white border-2 border-emerald-400/50 px-4 py-2 w-80 appearance-none focus:outline-none"
        >
          {wallpapers.map((wallpaper, index) => (
            <option key={index} value={wallpaper}>
              Wallpaper {index + 1}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 m-10">
        {wallpapers.map((wallpaper, index) => (
          <div
            key={index}
            onClick={() => setSelectedWallpaper(wallpaper)}
            className={`cursor-pointer p-2 border-2 rounded-lg transition-transform transform ${
              selectedWallpaper === wallpaper ? "border-emerald-400/50 scale-105" : "border-transparent"
            }`}
          >
            <img src={wallpaper} alt={`Wallpaper ${index + 1}`} className="w-24 h-48 rounded-lg" />
          </div>
        ))}
      </div>
      </div>

      <div id="qrCodeCanvas" className="flex justify-center items-center my-10">
        <QRCodeCanvas value={url || "https://peerlist.io"} size={150} />{" "}
      </div>

      <button
        onClick={downloadImage}
        className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-md font-semibold leading-6  text-white inline-block"
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </span>
        <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 px-4 py-2 ring-1 ring-white/10 ">
          <span>Download Wallpaper</span>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 24 24"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.75 8.75L14.25 12L10.75 15.25"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>
    </div>
  );
}