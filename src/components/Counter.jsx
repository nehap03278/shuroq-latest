import { useState, useEffect } from "react";

export function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count >= target) return;
    const timer = setInterval(() => {
      setCount(c => Math.min(c + Math.ceil(target / 20), target));
    }, 50);
    return () => clearInterval(timer);
  }, [target]);

  return <>{count}{suffix}</>;
}
