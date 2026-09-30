import { auth } from "@/auth";
import Link from "next/link";
import { TypographyH3 } from "./typography-h3";
import { HeaderNav } from "./header-nav";

export async function Header() {
  const session = await auth();
  return (
    <header className="container mx-auto flex items-center p-4"> 
      
      <nav className="min-w-0 flex-1">
        <HeaderNav session={session} />
      </nav>
     </header>
  );
};