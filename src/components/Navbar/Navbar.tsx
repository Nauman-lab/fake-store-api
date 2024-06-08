"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  currentPath: string;
  onClick: () => void;
}

const Navbar = ({
  currentPath,
  onClickNavLink,
}: {
  currentPath: string;
  onClickNavLink: (path: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold">Fake Store</div>
        <div className="hidden md:flex space-x-4">
          <NavLink
            href="/pages/AllProducts"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AllProducts")}
          >
            All Products
          </NavLink>
          <NavLink
            href="/pages/SingleProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SingleProduct")}
          >
            Single Product
          </NavLink>
          <NavLink
            href="/pages/LimitResults"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/LimitResults")}
          >
            Limit Results
          </NavLink>
          <NavLink
            href="/pages/SortResults"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SortResults")}
          >
            Sort Results
          </NavLink>
          <NavLink
            href="/pages/AllCategories"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AllCategories")}
          >
            All Categories
          </NavLink>
          <NavLink
            href="/pages/SpecificCategory"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SpecificCategory")}
          >
            Specific Category
          </NavLink>
          <NavLink
            href="/pages/AddNewProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AddNewProduct")}
          >
            Add New Product
          </NavLink>
          <NavLink
            href="/pages/UpdateProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/UpdateProduct")}
          >
            Update Product
          </NavLink>
          <NavLink
            href="/pages/DeleteProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/DeleteProduct")}
          >
            Delete Product
          </NavLink>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <NavLink
            href="/pages/AllProducts"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AllProducts")}
          >
            All Products
          </NavLink>
          <NavLink
            href="/pages/SingleProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SingleProduct")}
          >
            Single Product
          </NavLink>
          <NavLink
            href="/pages/LimitResults"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/LimitResults")}
          >
            Limit Results
          </NavLink>
          <NavLink
            href="/pages/SortResults"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SortResults")}
          >
            Sort Results
          </NavLink>
          <NavLink
            href="/pages/AllCategories"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AllCategories")}
          >
            All Categories
          </NavLink>
          <NavLink
            href="/pages/SpecificCategory"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/SpecificCategory")}
          >
            Specific Category
          </NavLink>
          <NavLink
            href="/pages/AddNewProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/AddNewProduct")}
          >
            Add New Product
          </NavLink>
          <NavLink
            href="/pages/UpdateProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/UpdateProduct")}
          >
            Update Product
          </NavLink>
          <NavLink
            href="/pages/DeleteProduct"
            currentPath={currentPath}
            onClick={() => onClickNavLink("/pages/DeleteProduct")}
          >
            Delete Product
          </NavLink>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ href, children, currentPath, onClick }: NavLinkProps) => {
  const isActive = currentPath === href;

  return (
    <Link href={href}>
      <div
        className={`text-white ${isActive ? "font-bold text-red-600" : ""}`}
        onClick={onClick}
      >
        {children}
      </div>
    </Link>
  );
};

const Appbar = ({ children }: { children: React.ReactNode }) => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const handleNavLinkClick = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <>
      <Navbar currentPath={currentPath} onClickNavLink={handleNavLinkClick} />
      <div>{children}</div>
    </>
  );
};

export default Appbar;
