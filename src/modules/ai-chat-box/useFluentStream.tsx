import { useEffect, useState } from "react";

const useFluentStream = () => {
  const [output, setOutput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const fluentOutput = output.substring(0, currentIndex);

  useEffect(() => {
    if (output.length > currentIndex)
      setTimeout(() => setCurrentIndex(currentIndex + 1), 50);
  }, [currentIndex, output]);

  return {
    fluentOutput,
    output,
    setOutput,
  };
};

export default useFluentStream;
