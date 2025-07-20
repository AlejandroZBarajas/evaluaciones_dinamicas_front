/* import React, { useEffect, useState } from "react";

interface Props {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (questionText: string, selected: string) => void;
}

const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const ShuffledQuestion = ({ question, onAnswer }: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const combined = [...question.options, question.answer];
    const uniqueOptions = Array.from(new Set(combined));
    setShuffledOptions(shuffleArray(uniqueOptions));
  }, [question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(question.question, e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p><strong>{question.question}</strong></p>
      {shuffledOptions.map((option, idx) => (
        <label key={idx}>
          <input
            type="radio"
            name={question.question}
            value={option}
            onChange={handleChange}
            required
          />
          {option}
          <br />
        </label>
      ))}
    </div>
  );
};

export default ShuffledQuestion;
 */


import React, { useEffect, useState } from "react";

interface Props {
  question: {
    question: string;
    options: string[];
    answer: string;
  };
  onAnswer: (questionText: string, selected: string) => void;
}

const shuffleArray = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

const ShuffledQuestion = ({ question, onAnswer }: Props) => {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const combined = [...question.options, question.answer];
    const uniqueOptions = Array.from(new Set(combined));
    setShuffledOptions(shuffleArray(uniqueOptions));
  }, [question]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onAnswer(question.question, e.target.value);
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <p><strong>{question.question}</strong></p>
      {shuffledOptions.map((option, idx) => (
        <label key={idx}>
          <input
            type="radio"
            name={question.question}
            value={option}
            onChange={handleChange}
            required
          />
          {option}
          <br />
        </label>
      ))}
    </div>
  );
};

export default ShuffledQuestion;
