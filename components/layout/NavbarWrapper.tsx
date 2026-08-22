"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { InstantSearchModal } from "../search/InstantSearchModal";

export const NavbarWrapper = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const openSearch = () => setIsSearchOpen(true);
    window.addEventListener("open-site-search", openSearch);
    return () => window.removeEventListener("open-site-search", openSearch);
  }, []);

  return (
    <>
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />
      <InstantSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};