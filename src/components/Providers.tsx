"use client";

import { SessionProvider } from "next-auth/react";
import ReduxProvider from "./ReduxProvider";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider>
      <SessionProvider>{children}</SessionProvider>
    </ReduxProvider>
  );
}
