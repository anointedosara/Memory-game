"use client";
import { GameContext } from "@/contexts/GameContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";

export default function Overview() {
  const { theme, setTheme, players, setPlayers, size, setSize, setupGame } = useContext(GameContext);
  const router = useRouter();

  const handleStart = () => {
    if (!theme || !players || !size) return;
    setupGame();
    router.push("/game");
  };

  return (
    <div className="max-w-140 w-full">
      <h1 className="text-center text-[30px] text-white font-bold mb-7 md:mb-15">memory</h1>
      <div className="bg-white p-5 md:p-8 rounded-xl">
        <p className="text-[14px] font-bold text-[#7191A5] mb-3">Select Theme</p>
        <div className="flex gap-2 md:gap-5 mb-6">
          {["Numbers", "Icons"].map(item => (
            <button key={item} onClick={() => setTheme(item)} className={`w-full py-2 rounded-full cursor-pointer font-bold text-white text-[20px] ${theme === item ? "bg-[#304859]" : "bg-[#BCCED9] hover:bg-[#6395B8]"}`}>{item}</button>
          ))}
        </div>
        <p className="text-[14px] font-bold text-[#7191A5] mb-3">Number of Players</p>
        <div className="flex gap-2 md:gap-5 mb-6">
          {["1", "2", "3", "4"].map(item => (
            <button key={item} onClick={() => setPlayers(item)} className={`w-full cursor-pointer py-2 rounded-full font-bold text-white text-[20px] ${players === item ? "bg-[#304859]" : "bg-[#BCCED9] hover:bg-[#6395B8]"}`}>{item}</button>
          ))}
        </div>
        <p className="text-[14px] font-bold text-[#7191A5] mb-3">Grid Size</p>
        <div className="flex gap-2 md:gap-5 mb-6">
          {["4x4", "6x6"].map(item => (
            <button key={item} onClick={() => setSize(item)} className={`w-full py-2 cursor-pointer rounded-full font-bold text-white text-[20px] ${size === item ? "bg-[#304859]" : "bg-[#BCCED9] hover:bg-[#6395B8]"}`}>{item}</button>
          ))}
        </div>
        <button onClick={handleStart} disabled={!theme || !players || !size} className="w-full cursor-pointer bg-[#FDA214] hover:bg-[#FFB84A] disabled:opacity-50 text-white font-bold text-[25px] py-3 rounded-full transition-all">Start Game</button>
      </div>
    </div>
  );
}