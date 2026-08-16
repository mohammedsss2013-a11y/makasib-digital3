"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { InstantSearchModal } from "../search/InstantSearchModal";

export const NavbarWrapper = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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