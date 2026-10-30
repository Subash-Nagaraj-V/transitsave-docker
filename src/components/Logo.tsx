import { useEffect, useState } from "react";

export function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-12 w-32" />;
  }

  return (
    <div className="flex items-center justify-center cursor-pointer h-12 md:h-14 overflow-hidden rounded-xl dark:rounded-none transition-all">
      <img
        src="/logo.png"
        alt="Transit Save Logo"
        className="h-full w-auto object-contain dark:mix-blend-screen drop-shadow-sm dark:drop-shadow-none hover:scale-105 transition-transform duration-300 rounded-xl dark:rounded-none"
      />
    </div>
  );
}
