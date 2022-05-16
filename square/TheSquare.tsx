import { motion } from "framer-motion";
import styles from "../square/TheSquare.module.css";
import classnames from "classnames";

type Player = "X" | "O" | "BOTH" | null;
function TheSquare({
  value,
  onClick,
  winner,
}: {
  value: Player;
  onClick: () => void;
  winner: Player;
}) {
  if (!value) {
    return (
      <motion.button
        className={styles.square}
        onClick={onClick}
        disabled={Boolean(winner)}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ stiffness: 500 }}
      >
        {" "}
      </motion.button>
    );
  }
  return (
    <button
      className={classnames(styles.square, styles[`square_${value}`])}
      disabled
    >
      {" "}
      {value}
    </button>
  );
}

export default TheSquare;
