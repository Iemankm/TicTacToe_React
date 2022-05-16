import { createMachine, assign } from "xstate";
import React, { useState } from "react";

interface Context {
  squares: Array<Player>;
  currentPlayer: Player;
  winner: Player;
}

type Player = "X" | "O" | "BOTH" | null;

function showWinner(squares: Player[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [x, y, z] = lines[i];
    if (squares[x] && squares[x] === squares[y] && squares[x] === squares[z]) {
      return squares[x];
    }
  }
  return null;
}
export const TicTacToeMachine = createMachine<Context>({
  id: "TicTacToe",
  initial: "playing",
  context: {
    squares: Array(9).fill(null),
    currentPlayer: Math.round(Math.random() * 1) === 1 ? "X" : "O",
    winner: null,
  },
  states: {
    playing: {
      always: [
        {
          cond: (context) => showWinner(context.squares) !== null,
          target: "gameover",
          actions: assign({ winner: (context) => showWinner(context.squares) }),
        },
        {
          cond: (context) =>
            !context.squares.filter((TheSquare) => !TheSquare).length,
          target: "gameover",
          actions: assign({ winner: (context) => "BOTH" }),
        },
      ],
      on: {
        CLICK: {
          actions: assign({
            squares: (context, event) => {
              const x = context.squares.map((theValue, index2) => {
                if (index2 === event.index) {
                  return context.currentPlayer;
                }
                return theValue;
              });
              console.log(x);
              return x;
            },

            currentPlayer: (context) => {
              return context.currentPlayer === "X" ? "O" : "X";
            },
          }),
        },
      },
    },

    gameover: {
      on: {
        NEW_GAME: {
          target: "playing",
          actions: assign({
            squares: (context) => Array(9).fill(null),
            currentPlayer: (context) =>
              Math.round(Math.random() * 1) === 1 ? "X" : "O",
            winner: (context) => null,
          }),
        },
      },
    },
  },
});
