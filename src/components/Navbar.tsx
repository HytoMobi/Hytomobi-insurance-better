"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-lg p-4 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black text-2xl font-bold">
          <Link href={"/"}>
            <Image src="/logo.png" width={100} height={50} alt="logo" />
          </Link>
        </div>
        <div className="hidden md:flex space-x-16">
          <Link href="/loan" className="text-black">
            Loans
          </Link>
          <Link href="/cards" className="text-black">
            Cards
          </Link>
          <Link href="/blog" className="text-black">
            Blog
          </Link>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="bg-opacity-50">
                <div className="flex justify-center	items-center gap-2">
                  Insurances <IoIosArrowDown />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/insurances/life" className="text-black">
                    Life Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/health" className="text-black">
                    Health Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/child" className="text-black">
                    Child Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/pension" className="text-black">
                    Pension Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/car" className="text-black">
                    Car Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/term" className="text-black">
                    Term Insurance
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="bg-opacity-50">
                <div className="flex justify-center	items-center gap-2">
                  Investments <IoIosArrowDown />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/investment/stock" className="text-black">
                    Stocks (Equities)
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/bonds" className="text-black">
                    Bonds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/mutual-funds" className="text-black">
                    Mutual Funds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link
                    href="/investment/exchange-trade-funds"
                    className="text-black"
                  >
                    Exchange-Traded Funds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/real-state" className="text-black">
                    Real Estate
                  </Link>
                </MenubarItem>
                <MenubarSeparator />

                <MenubarItem>
                  <Link
                    href="/investment/cryptocurrencies"
                    className="text-black"
                  >
                    Cryptocurrencies
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link
                    href="/investment/certificate-of-deposit"
                    className="text-black"
                  >
                    Certificates of Deposit (CDs)
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/annuities" className="text-black">
                    Annuities
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        <div className="md:hidden">
          <button onClick={toggleDrawer}>
            {isOpen ? (
              <FaTimes className="text-black text-2xl" />
            ) : (
              <FaBars className="text-black text-2xl" />
            )}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 h-[100vh] w-[100%] bg-white p-6 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <button onClick={toggleDrawer} className="text-black text-2xl mb-6">
          <FaTimes />
        </button>
        <nav className="space-y-6">
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="bg-opacity-50 mr-10 ">
                <div className="flex justify-center	items-center gap-2">
                  Investments <IoIosArrowDown />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/investment/stock" className="">
                    Stocks (Equities)
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/bonds" className="text-black">
                    Bonds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/mutual-funds" className="text-black">
                    Mutual Funds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link
                    href="/investment/exchange-trade-funds"
                    className="text-black"
                  >
                    Exchange-Traded Funds
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/real-state" className="text-black">
                    Real Estate
                  </Link>
                </MenubarItem>
                <MenubarSeparator />

                <MenubarItem>
                  <Link
                    href="/investment/cryptocurrencies"
                    className="text-black"
                  >
                    Cryptocurrencies
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link
                    href="/investment/certificate-of-deposit"
                    className="text-black"
                  >
                    Certificates of Deposit (CDs)
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/investment/annuities" className="text-black">
                    Annuities
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Link href="/cards" className="block text-black">
            Cards
          </Link>
          {/* <Link href="insurances" className="block text-black">
            Insurances
          </Link> */}
          <Menubar>
            <MenubarMenu>
              <MenubarTrigger className="bg-opacity-50 mr-4">
                <div className="flex justify-center	items-center gap-2">
                  Insurances <IoIosArrowDown />
                </div>
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  <Link href="/insurances/life" className="text-black">
                    Life Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/health" className="text-black">
                    Health Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/child" className="text-black">
                    Child Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/pension" className="text-black">
                    Pension Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/car" className="text-black">
                    Car Insurance
                  </Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Link href="/insurances/term" className="text-black">
                    Term Insurance
                  </Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
          <Link href="/blog" className="block text-black">
            Blog
          </Link>
          <Link href="/loan" className="block text-black">
            Loans
          </Link>
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
