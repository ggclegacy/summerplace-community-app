import { useState } from "react";

function Logo({ className = "", fallbackClassName = "" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={`grid place-items-center rounded-full border border-silver/25 bg-silver/10 text-center text-xs font-semibold leading-tight text-silver ${fallbackClassName || className}`}
      >
        Summer Place
      </span>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="Summer Place Apartments"
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}

export default Logo;
