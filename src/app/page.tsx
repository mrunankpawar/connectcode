"use client";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const wallpapers = [
  "/wp1.png",
  "/wp2.png",
  "/wp3.png",
  "/lnkdin1.png",
  "/lnkdin2.png",
  "/lnkdin3.png",
];

export default function Home() {
  const [url, setUrl] = useState("");
  const [selectedWallpaper, setSelectedWallpaper] = useState(wallpapers[0]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
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
      link.download = "connect-code-wallpaper.png";
      link.href = canvas.toDataURL();
      link.click();
    };
  };

  return (
    <div className="relative text-center p-10 flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-900 to-black text-white space-y-8 overflow-hidden">
      <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-b from-white to-indigo-400 text-transparent bg-clip-text mt-4 z-10">
        ConnectCode Wallpaper
      </h1>

      <p className="text-xl text-indigo-200 font-semibold mb-8 sm:max-w-[60%] z-10">
        Create a personalized wallpaper featuring a QR code that links directly
        to your Peerlist or LinkedIn profile.
      </p>

      <div className="flex flex-col items-center space-y-4 z-10">
        <h2 className="text-xl font-semibold text-indigo-200">🔗 + 📱 = ✨</h2>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter your profile URL"
          className="rounded-lg text-md font-normal border-2 px-4 py-2 w-80 bg-indigo-950 text-indigo-200 border-indigo-500/50"
        />

        <h2
          className="text-xl font-semibold text-indigo-200"
          style={{ marginTop: "30px" }}
        >
          Select a Wallpaper
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 z-10">
          {wallpapers.map((wallpaper, index) => (
            <div
              key={index}
              onClick={() => setSelectedWallpaper(wallpaper)}
              className={`cursor-pointer border-2 p-0.5 rounded-lg transition-transform transform ${
                selectedWallpaper === wallpaper
                  ? "border-indigo-400 scale-105"
                  : "border-transparent"
              }`}
            >
              <img
                src={wallpaper}
                alt={`Wallpaper ${index + 1}`}
                className="w-24 h-48 rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        id="qrCodeCanvas"
        className="flex justify-center items-center my-10 z-10"
      >
        <QRCodeCanvas
          value={url || "https://peerlist.io/mrunank"}
          size={150}
          className="shadow-lg p-4 border-2 border-white/50 rounded-md transition-opacity duration-500 ease-in-out"
        />{" "}
      </div>

      <button
        onClick={downloadImage}
        className="bg-[#2D2F36] no-underline group cursor-pointer relative shadow-2xl hover:from-[#38BDF8] hover:to-[#10B981] rounded-full p-px text-md font-semibold leading-6 text-white inline-block z-10"
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
        <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-indigo-400/0 via-indigo-400/90 to-indigo-400/0 transition-opacity duration-500 group-hover:opacity-40" />
      </button>

      <div className="absolute left-0 top-[20%] transform -translate-y-1/2 -rotate-12 transition-transform hover:rotate-0 hover:scale-105 duration-500 z-0 opacity-10 md:opacity-100">
        <img
          src="/GreenTexture.png"
          alt="Mobile Mockup 1"
          className="w-48 h-86 object-cover shadow-xl"
        />
      </div>
      <div className="absolute right-0 top-[20%] transform -translate-y-1/2 rotate-12 transition-transform hover:rotate-0 hover:scale-105 duration-500 z-0 opacity-0 md:opacity-100">
        <img
          src="/GreenGradient.png"
          alt="Mobile Mockup 2"
          className="w-40 h-76 object-cover shadow-xl"
        />
      </div>
      <div className="absolute left-0 top-[60%] transform -translate-y-1/2 -rotate-6 transition-transform hover:rotate-0 hover:scale-105 duration-500 z-0 opacity-0 md:opacity-100">
        <img
          src="/BlueGradient.png"
          alt="Mobile Mockup 3"
          className="w-40 h-76 object-cover shadow-xl"
        />
      </div>
      <div className="absolute right-0 top-[60%] transform -translate-y-1/2 rotate-6 transition-transform hover:rotate-0 hover:scale-105 duration-500 z-0 opacity-10 md:opacity-100">
        <img
          src="/BlueLight.png"
          alt="Mobile Mockup 4"
          className="w-48 h-86 object-cover shadow-xl"
        />
      </div>

      <footer className="text-white/[0.4] text-center pt-10 mt-10 z-10">
        <button
          onClick={() => {
            const tweetText = `Hey, I just tried out this project by @MrunankPawar! Check it out here: ${window.location.href}`;
            const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
              tweetText
            )}`;
            window.open(tweetUrl, "_blank");
          }}
          className="bg-indigo-800 text-white px-4 py-2 rounded-md mt-4 transition-all duration-300 hover:bg-indigo-900 mb-8 z-10"
        >
          Share on Twitter
        </button>
        <p className="text-lg">Developed with ❤️ by Mrunank</p>
      </footer>
    </div>
  );
}
