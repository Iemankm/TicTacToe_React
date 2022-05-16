import React, { useReducer } from "react";
import TheSquare from "../square/TheSquare";
import { motion } from "framer-motion";
import { TicTacToeMachine } from "../state/GameState";
import { useMachine } from "@xstate/react";
import styles from "../game/Game.module.css";

function Board() {
  const [state, send] = useMachine(TicTacToeMachine);
  const range = (start: number, end: number) => {
    return Array(end - start)
      .fill(null)
      .map((_, idx) => idx + start);
  };

  const { squares, currentPlayer, winner } = state.context;

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 100,
    when: "afterChildren",
  };

  return (
    <div className={styles.game}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      {!winner && <p className={styles.textt}>its {currentPlayer} turn!</p>}
      {winner && winner !== "BOTH" && (
        <p className={styles.textt}>{winner} is the winner</p>
      )}
      {winner && winner === "BOTH" && (
        <p className={styles.textt}> its a Tie!</p>
      )}
      <div className={styles.grid}>
        {range(0, 9).map((index2) => {
          return (
            <TheSquare
              key={index2}
              winner={winner}
              onClick={() => send({ type: "CLICK", index: index2 })}
              value={squares[index2]}
            />
          );
        })}
      </div>
      <motion.button
        whileTap={{ scale: 0.8 }}
        className={styles.newgame}
        onClick={() => send("NEW_GAME")}
      >
        New Game
      </motion.button>
    </div>
  );
}

export default Board;
