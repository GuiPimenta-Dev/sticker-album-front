import "./StickerAlbum.css";

import React, { useEffect, useRef, useState } from "react";

import Shield from "./Shield";
import Sticker from "./Sticker";
import album from "./champions_album.json";
import arrowRightImg from "./right-arrow.png";

function StickerAlbum() {
  const [stickers, setStickers] = useState([]);
  const [shield, setShield] = useState(null);
  const stickerContainerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  useEffect(() => {
    setStickers(album[currentIndex].players);
    setShield(album[currentIndex].shield);
  }, [currentIndex]);

  function handleStickerClick(id) {
    console.log(`Sticker ${id} clicked!`);
  }

  const getNumStickersPerRow = () => {
    if (!stickerContainerRef.current) return 1;
    const containerWidth = stickerContainerRef.current.clientWidth;
    if (containerWidth >= 800) return 5;
    if (containerWidth >= 600) return 4;
    if (containerWidth >= 400) return 3;
    return 2;
  };

  const numStickersPerRow = getNumStickersPerRow();

  const rows = [];
  for (let i = 0; i < stickers.length; i += numStickersPerRow) {
    const rowStickers = stickers.slice(i, i + numStickersPerRow);
    rows.push(
      <div className="sticker-row" key={`row-${i}`}>
        {rowStickers.map((sticker) => (
          <Sticker key={sticker.id} pic={sticker.pic} onClick={() => handleStickerClick(sticker.id)} />
        ))}
      </div>
    );
  }

  const handleNextButtonClick = () => {
    if (currentIndex === album.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevButtonClick = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };

  const handleInventoryButtonClick = () => {
    setIsInventoryOpen(!isInventoryOpen);
  };

  return (
    <div className="sticker-album">
      <div className="shield-container">
        <Shield pic={shield} />
      </div>
      <div className="album-header">
        <h1 className="album-title">{album[currentIndex].name}</h1>
        <button className="inventory-button" onClick={handleInventoryButtonClick}>
          {isInventoryOpen ? "Close Modal" : "Open Modal"}
        </button>
        {isInventoryOpen && <div className="modal">This is the modal content!</div>}
      </div>
      <div className="sticker-container" ref={stickerContainerRef}>
        {rows}
      </div>

      {currentIndex !== 0 && (
        <button className="prev-button" onClick={handlePrevButtonClick}>
          <img className="prev-button-icon" src={arrowRightImg} alt="Prev" />
        </button>
      )}
      {currentIndex < album.length - 1 && (
        <button className="next-button" onClick={handleNextButtonClick}>
          <img className="next-button-icon" src={arrowRightImg} alt="Next" />
        </button>
      )}
    </div>
  );
}

export default StickerAlbum;
