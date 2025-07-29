import { Link, NavLink, Outlet } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import "../../css/seller/SellerLayout.css";

const SellerLayout = () => {
  const { setIsSeller } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller", icon: assets.add_icon },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: assets.product_list_icon,
    },
    { name: "Orders", path: "/seller/orders", icon: assets.order_icon },
  ];

  const logout = async () => {
    setIsSeller(false);
  };

  return (
    <>
      <div className="seller-header">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="seller-logo" />
        </Link>
        <div className="seller-header-right">
          <p>Hi! Admin</p>
          <button onClick={logout} className="logout-button">
            Logout
          </button>
        </div>
      </div>

      <div className="seller-body">
        <div className="seller-sidebar">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              <img src={item.icon} alt="" className="sidebar-icon" />
              <p className="sidebar-label">{item.name}</p>
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SellerLayout;
