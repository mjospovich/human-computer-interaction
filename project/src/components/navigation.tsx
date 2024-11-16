"use client";

import Link from "next/link";
import Logo from "../assets/kupujem_auto_logo.svg";
import { usePathname } from "next/navigation";

type Page = {
  title: string;
  path: `/${string}`;
};

const pages: Page[] = [
  { title: "Početna", path: "/" },
  { title: "Popularno", path: "/popularno" },
  { title: "Podrška", path: "/podrska" },
  { title: "O nama", path: "/onama" },
  { title: "Prijavi se", path: "/prijavise" },
];

function processPage(page: Page, index: number, pathname: string) {
  return (
    <li key={index}>
      <Link
        href={page.path}
        className={pathname === page.path ? "font-bold" : ""}
      >
        {page.title}
      </Link>
    </li>
  );
}

export function Navigation() {
  const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4">
      {/* Logo Section */}
      <div className="text-lg font-bold">
        <Link href="/">
          <Logo className="h-5 w-auto" alt="My Logo" />
        </Link>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul className="flex space-x-4">
          {pages.map((page, index) => processPage(page, index, pathname))}
        </ul>
      </nav>
    </header>
  );
}
