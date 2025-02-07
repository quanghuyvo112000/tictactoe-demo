import React from "react";

interface ScoreBoardProps {
  score: { X: number; O: number; draws: number };
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => (
  <div className="m-2">
    <h3>Score</h3>
    <p className="h5">
      {" "}
      <span className="text-danger">Win X</span>: {score.X} -{" "}
      <span className="text-primary">Win O</span>: {score.O} -{" "}
      <span className="text-secondary">Draw</span>: {score.draws}
    </p>
  </div>
);

export default ScoreBoard;
