"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import ShareMyDay from "./share-my-day";

const photoNumbers = [1, 2, 3, 4, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const photos = photoNumbers.map((number) => ({
  src: `/images/grace-${String(number).padStart(2, "0")}.jpeg`,
  number: String(number).padStart(2, "0"),
}));

const confettiPieces = Array.from({ length: 46 }, (_, index) => ({
  x: ((index * 37) % 260) - 130,
  rotate: (index * 73) % 600,
  duration: 2 + ((index * 17) % 140) / 100,
  delay: ((index * 13) % 45) / 100,
  left: `${(index * 29) % 100}%`,
  symbol: ["✦", "♥", "✿", "·"][index % 4],
}));
const littleThings = [
  { mark: "01", title: "The way you get me", copy: "That little “you get me wena” moment. Some conversations just feel easy, and ours have a way of turning an ordinary day around." },
  { mark: "02", title: "Your very own kind of chaos", copy: "The teasing, the blabbering, the random updates, the jokes that probably make sense to nobody else. I wouldn't trade it." },
  { mark: "03", title: "A heart that shows up", copy: "You make time, you check in, you listen and you care. Even in the small things, that kindness comes through." },
  { mark: "04", title: "Your faith", copy: "I appreciate the way you keep God close and share encouragement so naturally. May that light keep guiding you." },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const celebrate = () => {
    setShowConfetti(true);
    window.setTimeout(() => setShowConfetti(false), 2600);
  };

  return (
    <main>
      <div className="topline"><span>MADE WITH A LITTLE EXTRA LOVE</span><span>06 · 11 · 2026</span></div>

      <section className="hero" id="home">
        <div className="hero-grain" />
        <motion.div className="hero-orbit orbit-one" animate={{ rotate: 360 }} transition={{ duration: 48, repeat: Infinity, ease: "linear" }} />
        <motion.div className="hero-orbit orbit-two" animate={{ rotate: -360 }} transition={{ duration: 62, repeat: Infinity, ease: "linear" }} />
        <motion.div className="bee" animate={{ y: [0, -10, 0], x: [0, 5, 0], rotate: [-4, 4, -4] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}>🐝</motion.div>
        <div className="hero-content">
          <motion.p className="eyebrow" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>A LITTLE SOMETHING FOR SOMEONE SPECIAL</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35 }}>For my<br /><em>Bumblebee.</em></motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Some people make ordinary days<br className="desktop-break" /> feel a little more special.</motion.p>
          <motion.button className="open-gift" onClick={() => { setOpened(true); document.getElementById("birthday")?.scrollIntoView({ behavior: "smooth" }); }} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}>
            <span>OPEN YOUR LITTLE SURPRISE</span><b>↗</b>
          </motion.button>
        </div>
        <div className="hero-foot"><span>THE GIRAFFE & THE BUMBLEBEE</span><span>SCROLL A LITTLE ↓</span></div>
        <span className="side-note">A FRIENDSHIP IN FULL BLOOM</span>
      </section>

      <section className="birthday-section section-pad" id="birthday">
        <div className="section-kicker"><span>01 / THE BIG DAY</span><span>FOR GRACEY ♡</span></div>
        <div className="birthday-layout">
          <div className="birthday-copy">
            <p className="script-note">Well, look who&apos;s another year wonderful...</p>
            <h2>Happy birthday,<br /><em>Gracey!</em></h2>
            <p className="body-copy">Today is all about you. Your laugh, your heart, your beautiful spirit and all the little things that make you unmistakably you.</p>
            <p className="body-copy">I hope this new chapter brings you the kind of joy that stays, the kind of peace you can feel, and more reasons to smile than you can count.</p>
            <div className="signature">With love, your Giraffe <span>♡</span></div>
          </div>
          <motion.div className="birthday-art" initial={{ opacity: 0, scale: 0.92, rotate: 2 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="art-ring" />
            <div className="art-sun">✳</div>
            <div className="art-animals"><span>🦒</span><span>♡</span><span>🐝</span></div>
            <div className="art-caption"><small>A VERY IMPORTANT DAY</small><strong>06.11.26</strong><small>THE WORLD GOT LUCKIER</small></div>
            <span className="art-spark spark-a">✦</span><span className="art-spark spark-b">✧</span>
          </motion.div>
        </div>
      </section>

      <section className="quote-band">
        <span className="quote-mark">“</span>
        <p>“Wena, you get me.”</p>
        <span className="quote-caption">AND HONESTLY, THAT MEANS MORE THAN YOU KNOW.</span>
      </section>

      <section className="friendship-section section-pad">
        <div className="section-kicker"><span>02 / OUR LITTLE WORLD</span><span>THE GIRAFFE & THE BUMBLEBEE</span></div>
        <div className="friendship-heading">
          <p className="script-note">A friendship made of a thousand little moments</p>
          <h2>It&apos;s the little things<br />that make <em>us, us.</em></h2>
        </div>
        <div className="things-grid">
          {littleThings.map((item, index) => (
            <motion.article className="thing-card" key={item.mark} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 0.6 }}>
              <span className="thing-number">{item.mark}</span><span className="thing-flower">{["✿", "✳", "❋", "✧"][index]}</span>
              <h3>{item.title}</h3><p>{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="gallery-section section-pad" id="memories">
        <div className="section-kicker"><span>03 / LITTLE MOMENTS, BIG SMILES</span><span>A FEW FAVOURITES</span></div>
        <div className="gallery-heading"><div><p className="script-note">A little collection of you</p><h2>Moments worth<br /><em>keeping.</em></h2></div><p className="gallery-intro">A few snapshots to celebrate the person behind all the laughs, the kindness and the memories still waiting to happen.</p></div>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <motion.button className={`photo-card photo-${(index % 6) + 1}`} key={photo.number} onClick={() => setActivePhoto(photo)} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (index % 4) * 0.07 }}>
              <Image src={photo.src} alt={`Gracey, photograph ${photo.number}`} fill sizes="(max-width: 600px) 50vw, (max-width: 900px) 33vw, 25vw" priority={index < 4} />
              <span className="photo-overlay">♡</span>
            </motion.button>
          ))}
        </div>
        <p className="gallery-footnote">TAP ANY PHOTO TO TAKE A CLOSER LOOK · MORE MEMORIES TO COME</p>
      </section>

      <section className="blessing-section">
        <div className="blessing-inner">
          <span className="blessing-star">✧</span>
          <p className="section-label">A PRAYER FOR YOUR NEW YEAR</p>
          <h2>May your days be<br /><em>filled with grace.</em></h2>
          <p className="blessing-copy">May God continue to order your steps, strengthen your heart and surprise you with goodness in ways you never expected. May He give you wisdom for every new door, peace for every uncertain moment and joy that no circumstance can take away.</p>
          <p className="blessing-verse">“The Lord bless you and keep you.” <span>— Numbers 6:24</span></p>
          <span className="blessing-flower">✿</span>
        </div>
      </section>

      <section className="letter-section section-pad" id="letter">
        <div className="section-kicker"><span>04 / A NOTE FROM YOUR GIRAFFE</span><span>JUST FOR YOU</span></div>
        <div className="letter-wrap">
          <div className="letter-stamp">TO<br />MY<br />BUMBLEBEE <span>🐝</span></div>
          <div className="letter-paper">
            <p className="script-note">Dear Gracey,</p>
            <h2>A little reminder<br />of how <em>appreciated</em><br />you are.</h2>
            <p>I&apos;m not always the best at putting things into words, but I hope you know how much I appreciate having you in my corner.</p>
            <p>Thank you for the laughs, the random conversations, the check-ins, the encouragement and for being someone I can just be myself around. I love how we can go from serious conversations to complete nonsense in a matter of seconds. 😂</p>
            <p>You have such a lovely way of making people feel seen, and I hope today you feel every bit as celebrated as you deserve to be.</p>
            <p>Keep being your wonderfully unique self. Keep dreaming, growing, laughing loudly and being the Gracey we know. I&apos;m cheering you on, always.</p>
            <p>Here&apos;s to more stories, more inside jokes, more answered prayers and many more birthdays to celebrate.</p>
            <p className="letter-signoff">Happy birthday, chomz wam. ❤️<br /><span>Your Giraffe,</span><br /><strong>Sthembiso</strong></p>
          </div>
        </div>
      </section>

      <section className="finale">
        <div className="finale-decoration">✳</div>
        <p className="eyebrow">ONE LAST THING...</p>
        <h2>Keep shining,<br /><em>Bumblebee.</em></h2>
        <p>There&apos;s a whole lot of beautiful ahead of you.</p>
        <button className="celebrate-button" onClick={celebrate}>A LITTLE MORE BIRTHDAY MAGIC <span>✦</span></button>
        <div className="finale-bottom"><span>MADE ESPECIALLY FOR GRACEY</span><span>WITH LOVE · 06.11.2026</span></div>
      </section>

      <ShareMyDay />
      <footer className="footer"><span>THE GIRAFFE 🦒 & THE BUMBLEBEE 🐝</span><span>A LITTLE DIGITAL GIFT, MADE WITH LOVE.</span></footer>

      <AnimatePresence>
        {activePhoto && <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActivePhoto(null)}>
          <button className="lightbox-close" onClick={() => setActivePhoto(null)} aria-label="Close photo">×</button>
          <motion.div initial={{ scale: 0.92 }} animate={{ scale: 1 }} onClick={(event) => event.stopPropagation()}><Image src={activePhoto.src} alt="Gracey" width={1600} height={1200} sizes="90vw" /></motion.div>
          <span className="lightbox-caption">A LITTLE MOMENT TO KEEP ♡</span>
        </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {showConfetti && <div className="confetti-layer" aria-hidden="true">{confettiPieces.map((piece, i) => <motion.i key={i} initial={{ y: -30, x: 0, opacity: 1, rotate: 0 }} animate={{ y: "110vh", x: piece.x, opacity: [1, 1, 0], rotate: piece.rotate }} transition={{ duration: piece.duration, delay: piece.delay, ease: "easeIn" }} style={{ left: piece.left }}>{piece.symbol}</motion.i>)}</div>}
      </AnimatePresence>
    </main>
  );
}



