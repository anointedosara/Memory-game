"use client";
import { GameContext } from "@/contexts/GameContext";
import Image from "next/image";
import { useContext, useState } from "react";
import ResultsModal from "./ResultsModal"; 

export default function Game() {
  const { theme, players, size, cards, flippedCards, matchedCards, moves, formattedTime, handleCardClick, currentPlayer, scores, setupGame } = useContext(GameContext);
const [isMenuOpen, setIsMenuOpen] = useState(false);
  const startNewGame = () => {
    sessionStorage.removeItem("memory_game_storage");
    window.location.href = "/";
  };
  const handleRestart = () => {
    setupGame();
    setIsMenuOpen(false);
  };

  return (
    <div className="max-w-250 w-full relative transition-all">
      <ResultsModal />
      
      {isMenuOpen && (
        <div className="fixed top-0 left-0 md: w-screen h-screen bg-black/50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl w-full max-w-sm p-6 flex flex-col gap-4">
            <button 
              onClick={handleRestart}
              className="w-full cursor-pointer bg-[#FDA214] text-white font-bold py-4 rounded-full text-lg hover:bg-[#FFB84A]"
            >
              Restart
            </button>
            <button 
              onClick={startNewGame}
              className="w-full cursor-pointer bg-[#DFE7EC] text-[#304859] font-bold py-4 rounded-full text-lg hover:bg-[#6395B8] hover:text-white"
            >
              New Game
            </button>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="w-full cursor-pointer bg-[#DFE7EC] text-[#304859] font-bold py-4 rounded-full text-lg hover:bg-[#6395B8] hover:text-white"
            >
              Resume Game
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-15 md:mb-20">
        <h2 className="text-2xl font-bold">memory</h2>
        <div className="hidden md:flex gap-5">
          <button onClick={setupGame} className="bg-[#FDA214] cursor-pointer hover:bg-[#FFB84A] font-bold px-5 py-2 rounded-full text-white">Restart</button>
          <button onClick={startNewGame} className="bg-[#DFE7EC] cursor-pointer hover:bg-[#6395B8] hover:text-white font-bold px-5 py-2 rounded-full">New Game</button>
        </div>
        <button 
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden cursor-pointer bg-[#FDA214] hover:bg-[#FFB84A] text-white font-bold px-6 py-3 rounded-full"
        >
          Menu
        </button>
      </div>

      <div className={`grid gap-3 md:gap-5 max-w-150 m-auto ${size === "4x4" ? "grid-cols-4" : "grid-cols-6"}`}>
        {cards.map((val, i) => {
          const show = flippedCards.includes(i) || matchedCards.includes(i);
          return (
            <div  key={i} className="flex w-full items-center justify-center">
                <button onClick={() => handleCardClick(i)} disabled={matchedCards.includes(i)} className={`w-15 cursor-pointer md:w-20 h-15 md:h-20 rounded-full flex items-center justify-center transition-all ${show ? "bg-[#FDA214]" : "bg-[#152938] hover:bg-[#6395B8]"} disabled:bg-[#BCCED9]`}>
              {show && (theme === "Numbers" ? <span className="text-white text-[30px] font-bold">{val}</span> : <Image src={val} alt="" width={30} height={38} />)}
            </button>
            </div>
          );
        })}
      </div>

      <div className="flex items-stretch justify-center w-full mt-10 gap-3 md:gap-5">
        {players === "1" ? (
          <>
            <div className="w-full flex justify-between items-center flex-col md:flex-row px-5 py-2 bg-[#DFE7EC] rounded-lg text-[25px] text-[#304859] font-bold"><span className="text-[12px] text-[#7191A5]">Time</span>{formattedTime}</div>
            <div className="w-full flex justify-between items-center flex-col md:flex-row px-5 py-2 bg-[#DFE7EC] rounded-lg text-[25px] text-[#304859] font-bold"><span className="text-[12px] text-[#7191A5]">Moves</span>{moves}</div>
          </>
        ) : (
          scores.map((s, idx) => (
            <div key={idx} className="w-full">
                <div className={`w-full flex items-center justify-between flex-col md:flex-row px-2 md:px-5 py-2 md:py-3 rounded-lg font-bold text-center transition-all ${currentPlayer === idx ? "bg-[#FDA214] text-white" : "bg-[#DFE7EC] text-[#304859]"}`}>
              <span className="text-[10px] md:text-[12px]">Player {idx + 1}</span>
              <span className="text-[20px] md:text-[24px] ">{s}</span>
            </div>
            <span className={`text-[12px] font-bold text-[#152938] mt-3 hidden text-center ${currentPlayer === idx ? "md:block" : "md:hidden"}`}>CURRENT TURN</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}