"use client";

import { useState } from "react";

const SITE_URL = "https://grace-virid-six.vercel.app";
const PHOTO_URL = "/images/grace-01.jpeg";
const DEFAULT_CAPTION = "My Giraffe really went all out for my birthday. 🦒🐝 Such a thoughtful surprise. Have a look!";

async function createStatusImage() {
  const width = 1080;
  const height = 1920;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Your browser could not create the status image.");

  const photo = new Image();
  photo.crossOrigin = "anonymous";
  photo.src = PHOTO_URL;
  await new Promise((resolve, reject) => {
    photo.onload = resolve;
    photo.onerror = () => reject(new Error("The birthday photo could not be loaded."));
  });

  const scale = Math.max(width / photo.width, height / photo.height);
  const photoWidth = photo.width * scale;
  const photoHeight = photo.height * scale;
  context.drawImage(photo, (width - photoWidth) / 2, (height - photoHeight) / 2, photoWidth, photoHeight);

  const overlay = context.createLinearGradient(0, 0, 0, height);
  overlay.addColorStop(0, "rgba(24, 22, 25, .22)");
  overlay.addColorStop(.34, "rgba(24, 22, 25, .12)");
  overlay.addColorStop(.57, "rgba(24, 22, 25, .54)");
  overlay.addColorStop(1, "rgba(24, 22, 25, .94)");
  context.fillStyle = overlay;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(540, 1220, 20, 540, 1220, 700);
  glow.addColorStop(0, "rgba(197, 126, 147, .34)");
  glow.addColorStop(1, "rgba(197, 126, 147, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255, 241, 231, .7)";
  context.lineWidth = 2;
  context.strokeRect(42, 42, width - 84, height - 84);

  context.textAlign = "center";
  context.fillStyle = "#f6e7df";
  context.font = "600 24px Arial, sans-serif";
  context.letterSpacing = "8px";
  context.fillText("A LITTLE BIRTHDAY SURPRISE", width / 2, 190);

  context.font = "400 100px Georgia, serif";
  context.fillStyle = "#fff8f2";
  context.fillText("For my", width / 2, 1110);
  context.font = "italic 118px Georgia, serif";
  context.fillStyle = "#f0c5cf";
  context.fillText("Bumblebee.", width / 2, 1245);

  context.font = "400 38px Arial, sans-serif";
  context.fillStyle = "#fff8f2";
  context.fillText("A day to celebrate Gracey 🐝", width / 2, 1340);

  context.font = "400 31px Arial, sans-serif";
  context.fillStyle = "rgba(255, 248, 242, .88)";
  context.fillText("From your Giraffe 🦒, with love.", width / 2, 1420);

  context.fillStyle = "#f0c5cf";
  context.font = "400 48px Georgia, serif";
  context.fillText("✦   ♡   ✦", width / 2, 1555);

  context.fillStyle = "rgba(255, 248, 242, .82)";
  context.font = "500 22px Arial, sans-serif";
  context.letterSpacing = "3px";
  context.fillText("A LITTLE DIGITAL GIFT, MADE JUST FOR YOU", width / 2, 1685);

  context.font = "400 23px Arial, sans-serif";
  context.letterSpacing = "0px";
  context.fillStyle = "#fff8f2";
  context.fillText("grace-virid-six.vercel.app", width / 2, 1750);

  return await new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The status image could not be saved.")), "image/png");
  });
}

export default function ShareMyDay() {
  const [caption, setCaption] = useState(DEFAULT_CAPTION);
  const [message, setMessage] = useState("");

  async function copyText(value, successMessage) {
    try {
      await navigator.clipboard.writeText(value);
      setMessage(successMessage);
    } catch {
      setMessage("Copying isn't available in this browser. You can select the caption manually.");
    }
  }

  async function downloadImage() {
    try {
      setMessage("Creating your status image…");
      const blob = await createStatusImage();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "gracey-birthday-status.png";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(objectUrl);
      setMessage("Your birthday status image is ready.");
      return blob;
    } catch (error) {
      setMessage(error.message || "Something went wrong creating the image.");
      return null;
    }
  }

  async function shareDay() {
    try {
      setMessage("Preparing your birthday surprise…");
      const blob = await createStatusImage();
      const file = new File([blob], "gracey-birthday-status.png", { type: "image/png" });
      const shareText = caption.trim() || DEFAULT_CAPTION;

      if (navigator.share && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "A birthday surprise for Gracey", text: shareText, url: SITE_URL });
        setMessage("Your share menu is ready.");
        return;
      }

      if (navigator.share) {
        await navigator.share({ title: "A birthday surprise for Gracey", text: shareText + "\n" + SITE_URL, url: SITE_URL });
        const objectUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = objectUrl;
        link.download = "gracey-birthday-status.png";
        link.click();
        URL.revokeObjectURL(objectUrl);
        setMessage("The link and caption were shared. The image has been downloaded too.");
        return;
      }

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = "gracey-birthday-status.png";
      link.click();
      URL.revokeObjectURL(objectUrl);
      await navigator.clipboard.writeText(shareText + "\n" + SITE_URL);
      setMessage("Image downloaded and caption with link copied.");
    } catch (error) {
      if (error.name !== "AbortError") setMessage(error.message || "Sharing isn't available right now.");
    }
  }

  return (
    <section className="share-section" id="share-my-day">
      <div className="share-section-inner">
        <div className="share-kicker"><span>05 / PASS THE SMILE ON</span><span>MADE FOR SHARING ♡</span></div>
        <div className="share-heading">
          <div>
            <p className="share-script">A little keepsake for your day</p>
            <h2>Share your<br /><em>little moment.</em></h2>
          </div>
          <p className="share-intro">A birthday surprise deserves to be remembered. Save your little status card or share this page with the people who make your days special.</p>
        </div>

        <div className="share-layout">
          <div className="status-preview" aria-label="Preview of your birthday status card">
            <div className="status-preview-photo" />
            <div className="status-preview-shade" />
            <div className="status-preview-frame" />
            <div className="status-preview-top">A LITTLE BIRTHDAY SURPRISE</div>
            <div className="status-preview-copy">
              <span>For my</span>
              <strong>Bumblebee.</strong>
              <p>A day to celebrate Gracey 🐝</p>
              <small>From your Giraffe 🦒, with love.</small>
            </div>
            <div className="status-preview-bottom"><span>✦　♡　✦</span><small>grace-virid-six.vercel.app</small></div>
          </div>

          <div className="share-controls">
            <p className="share-control-title">YOUR BIRTHDAY CAPTION</p>
            <label className="share-caption-label" htmlFor="share-caption">Make it yours before sharing</label>
            <textarea id="share-caption" value={caption} onChange={(event) => setCaption(event.target.value)} rows={4} />
            <button className="share-primary" onClick={shareDay}><span>Share my day</span><b>↗</b></button>
            <div className="share-secondary-actions">
              <button onClick={downloadImage}>↓ <span>Download image</span></button>
              <button onClick={() => copyText(SITE_URL, "Website link copied.")}>↗ <span>Copy website link</span></button>
              <button onClick={() => copyText(caption.trim() || DEFAULT_CAPTION, "Caption copied.")}>♡ <span>Copy caption</span></button>
            </div>
            <p className="share-feedback" aria-live="polite">{message || "On supported phones, Share my day opens your phone's sharing menu."}</p>
          </div>
        </div>
        <p className="share-note">YOUR DAY, YOUR WAY · SHARE ONLY IF YOU FEEL LIKE IT</p>
      </div>
    </section>
  );
}
