"use client";
import { useContext } from "react";
import { GameContext } from "@/contexts/GameContext";

export default function ResultsModal() {
  const { isGameOver, players, scores, formattedTime, moves, setupGame } = useContext(GameContext);
  if (!isGameOver) return null;

  const sorted = scores.map((s, i) => ({ name: `Player ${i+1}`, score: s })).sort((a,b) => b.score - a.score);
  const isTie = sorted.length > 1 && sorted[0].score === sorted[1].score;

  return (
    <div className="fixed bg-black/50 w-screen left-0 top-0 h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl p-5 md:p-8 text-center">
        <h2 className=" text-2xl md:text-4xl font-bold text-[#152938] mb-2">{players === "1" ? "You did it!" : isTie ? "It's a tie!" : `${sorted[0].name} Wins!`}</h2>
        <p className="text-[#7191A5] text-[12px] font-bold mb-8">Game over! Here’s how you got on...</p>
        <div className="flex flex-col gap-4 mb-8">
          {players === "1" ? (
            <>
              <div className="flex items-center text-xl md:text-2xl justify-between text-[#152938] bg-[#DFE7EC] p-4 rounded-lg font-bold"><span className="text-sm text-[#7191A5]">Time Elapsed</span>{formattedTime}</div>
              <div className="flex items-center text-xl md:text-2xl justify-between text-[#152938] bg-[#DFE7EC] p-4 rounded-lg font-bold"><span className="text-sm text-[#7191A5]">Moves Taken</span>{moves} Moves</div>
            </>
          ) : (
            sorted.map((p, idx) => (
              <div key={idx} className={`flex justify-between items-center p-4 rounded-lg font-bold ${idx === 0 ? "bg-[#152938] text-white" : "bg-[#DFE7EC] text-[#304859]"}`}>
                <span className="text-sm">{p.name} {idx === 0 && "(Winner!)"}</span><span className="text-xl md:text-2xl">{p.score} Pairs</span>
              </div>
            ))
          )}
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between items-center gap-3">
          <button onClick={setupGame} className="bg-[#FDA214] w-full text-white py-3 rounded-full font-bold text-xl">Restart</button>
          <button onClick={() => { sessionStorage.removeItem("memory_game_storage"); window.location.href = "/"; }} className="bg-[#DFE7EC] w-full text-[#304859] py-3 rounded-full font-bold text-xl">Setup New Game</button>
        </div>
      </div>
    </div>
  );
}