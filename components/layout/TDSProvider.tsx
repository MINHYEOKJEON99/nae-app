"use client";

import { useEffect, useState } from "react";
import { TDSMobileAITProvider } from "@toss/tds-mobile-ait";

export default function TDSProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;
  return <TDSMobileAITProvider>{children}</TDSMobileAITProvider>;
}
