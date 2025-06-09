import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import "../css/Navbar.css";
import { useAppContext } from "../context/AppContext";
const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    searchQuery,
    setSearchQuery,
    getCartCount,
  } = useAppContext();
  const logout = async () => {
    setUser(null);
    navigate("/");
  };
  useEffect(() => {}, [searchQuery]);
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" onClick={() => setOpen(false)}>
          <img className="logo" src={assets.logo} alt="logo" />
        </NavLink>

        {/* Desktop Menu */}
        <div className="menu-desktop">
          <a href="/">Home</a>
          <a href="/products">All Products</a>
          <a href="/contact">Contact</a>

          <div className="search-box">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search products"
            />
            <img src={assets.search_icon} alt="search" />
          </div>

          <div onClick={() => navigate("/cart")} className="cart-icon">
            <img src={assets.nav_cart_icon} alt="cart" />
            <button className="cart-count">{getCartCount()}</button>
          </div>
          {!user ? (
            <button
              onClick={() => {
                setShowUserLogin(true);
              }}
              className="btn-login"
            >
              Login
            </button>
          ) : (
            <div className="relative group">
              <img src={assets.profile_icon} className="w-10" alt="" />
              <ul className="hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40">
                <li
                  onClick={() => navigate("my-orders")}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  my orders
                </li>
                <li
                  onClick={logout}
                  className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
                >
                  logout
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center gap-6 sm:hidden">
          <div onClick={() => navigate("/cart")} className="cart-icon">
            <img src={assets.nav_cart_icon} alt="cart" />
            <button className="cart-count">{getCartCount()}</button>
          </div>
          {/* Hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="menu-toggle"
          >
            <img src={assets.menu_icon} alt="menu" />
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className={`menu-mobile ${open ? "open" : ""}`}>
            <NavLink to="/" onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" onClick={() => setOpen(false)}>
              All Products
            </NavLink>
            {user && (
              <NavLink to="/" onClick={() => setOpen(false)}>
                My Orders
              </NavLink>
            )}
            <NavLink to="/" onClick={() => setOpen(false)}>
              contact
            </NavLink>
            {!user ? (
              <button
                onClick={() => {
                  setOpen(false);
                  setShowUserLogin(true);
                }}
                className="btn-login small"
              >
                Login
              </button>
            ) : (
              <button className="btn-login small">Logout</button>
            )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
