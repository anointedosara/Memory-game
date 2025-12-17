"use client";
import { createContext, useEffect, useState, useRef } from "react";

export const GameContext = createContext({});

export function GameProvider({ children }) {
  const [theme, setTheme] = useState("");
  const [players, setPlayers] = useState("");
  const [size, setSize] = useState("");
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  const isInitialMount = useRef(true);

  const icons = [
    "/anchor.png",
    "/bug.png",
    "/car.png",
    "/flask.png",
    "/futbol.png",
    "/hand-spock.png",
    "/lira-sign.png",
    "/moon.png",
    "/snowflake.png",
    "/sun.png",
    "/bell.svg",
    "/bolt.svg",
    "/cloud.svg",
    "/fish.svg",
    "/leaf.svg",
    "/star.svg",
    "/heart.svg",
    "/gem.svg",
  ];

  useEffect(() => {
    const saved = sessionStorage.getItem("memory_game_storage");
    if (saved) {
      const data = JSON.parse(saved);
      setTheme(data.theme || "");
      setPlayers(data.players || "");
      setSize(data.size || "");
      setCards(data.cards || []);
      setFlippedCards(data.flippedCards || []);
      setMatchedCards(data.matchedCards || []);
      setMoves(data.moves || 0);
      setTime(data.time || 0);
      setIsRunning(data.isRunning || false);
      setCurrentPlayer(data.currentPlayer || 0);
      setScores(data.scores || []);
      setIsGameOver(data.isGameOver || false);
    }
    isInitialMount.current = false;
  }, []);

  useEffect(() => {
    if (isInitialMount.current) return;
    const state = {
      theme,
      players,
      size,
      cards,
      flippedCards,
      matchedCards,
      moves,
      time,
      isRunning,
      currentPlayer,
      scores,
      isGameOver,
    };
    sessionStorage.setItem("memory_game_storage", JSON.stringify(state));
  }, [
    theme,
    players,
    size,
    cards,
    flippedCards,
    matchedCards,
    moves,
    time,
    isRunning,
    currentPlayer,
    scores,
    isGameOver,
  ]);

  const setupGame = () => {
    const total = size === "4x4" ? 16 : 36;
    const pairs = total / 2;
    const values =
      theme === "Numbers"
        ? Array.from({ length: pairs }, (_, i) => i + 1).flatMap(n => [n, n])
        : icons.slice(0, pairs).flatMap(i => [i, i]);

    setCards(values.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setCurrentPlayer(0);
    setScores(Array(Number(players) || 1).fill(0));
    setIsGameOver(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCardClick = index => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    )
      return;
    if (!isRunning) setIsRunning(true);
    setFlippedCards(prev => [...prev, index]);
  };

  useEffect(() => {
    if (flippedCards.length !== 2) return;
    const [a, b] = flippedCards;
    if (cards[a] === cards[b]) {
      setMatchedCards(prev => [...prev, a, b]);
      setScores(prev => {
        const next = [...prev];
        next[currentPlayer]++;
        return next;
      });
    } else if (players !== "1") {
      setCurrentPlayer(p => (p + 1) % Number(players));
    }
    setMoves(m => m + 1);
    setTimeout(() => setFlippedCards([]), 800);
  }, [flippedCards]);

  useEffect(() => {
    if (cards.length > 0 && matchedCards.length === cards.length) {
      setIsRunning(false);
      setTimeout(() => setIsGameOver(true), 1000);
    }
  }, [matchedCards, cards]);

  const formattedTime = `${Math.floor(time / 60)}:${(time % 60)
    .toString()
    .padStart(2, "0")}`;

  return (
    <GameContext.Provider
      value={{
        theme,
        setTheme,
        players,
        setPlayers,
        size,
        setSize,
        cards,
        flippedCards,
        matchedCards,
        moves,
        formattedTime,
        handleCardClick,
        currentPlayer,
        scores,
        setupGame,
        isGameOver,
        setIsGameOver,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
