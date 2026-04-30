import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "img1.jpg",
    "img2.jpg",
    "img3.jpg",
    "img4.jpg",
    "img5.jpg"
  ];

  useEffect(() => {
    const sliderTimer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(sliderTimer);
  }, [images.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      style={{
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000'
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 2s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0
          }}
        />
      ))}

      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', padding: '20px', color: 'white', textAlign: 'center' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '1rem', fontWeight: '900' }}
        >
          Welcome to <span style={{ color: '#eb8d1d' }}>Ecclesia</span> Faith Assembly
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
          style={{ fontSize: 'clamp(1rem, 3vw, 1.3rem)', marginBottom: '2.5rem', fontWeight: '300' }}
        >
          Touching lives, transforming communities, and spreading the light of faith across the world.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8, ease: "easeOut" }}
          style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <button className="primary-btn">Watch Live</button>
          <button className="secondary-btn">Join Us</button>
        </motion.div>
      </div>

      <style>{`
        .primary-btn { background: #eb8d1d; color: white; padding: 16px 40px; border: none; border-radius: 50px; font-weight: bold; cursor: pointer; transition: 0.3s; }
        .secondary-btn { background: rgba(255,255,255,0.1); color: white; padding: 16px 40px; border: 2px solid white; border-radius: 50px; font-weight: bold; cursor: pointer; backdrop-filter: blur(5px); transition: 0.3s; }
      `}</style>
    </motion.div>
  );
};

export default Home;
