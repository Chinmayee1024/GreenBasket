import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import "../css/productDetails.css";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  // Debugging logs
  console.log("products:", products);
  console.log("id from params:", id);
  console.log("product:", product);

  useEffect(() => {
    if (products.length > 0 && product) {
      const productsCopy = products.filter(
        (item) =>
          product?.category === item.category && item._id !== product._id
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products, product]);

  useEffect(() => {
    setThumbnail(product?.image?.[0] || null);
  }, [product]);

  if (!product) {
    return <div style={{ padding: "2rem" }}>Loading Product Details...</div>;
  }

  return (
    <div className="breadcrumb">
      <p>
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /{" "}
        <Link to={`/products/${product.category.toLowerCase()}`}>
          {product.category}
        </Link>{" "}
        / <span className="text-primary">{product.name}</span>
      </p>

      <div className="product-details">
        <div className="image-thumbnails">
          <div className="image-thumbnails-column">
            {product.image?.map((image, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(image)}
                className="thumbnail"
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} />
              </div>
            ))}
          </div>
          <div className="main-image">
            <img src={thumbnail} alt="Selected product" />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>
          <div className="rating-stars">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                  alt="star"
                  className="md:w-4 w-3.5"
                />
              ))}
            <p>(4)</p>
          </div>

          <div className="price-info">
            <p className="price-strike">
              MRP: {currency}
              {product.price}
            </p>
            <p className="price-offer">
              MRP: {currency} {product.offerPrice}
            </p>
            <span className="price-note">(inclusive of all taxes)</span>
          </div>

          <p className="about-product">About Product</p>
          <ul className="description-list">
            {Array.isArray(product.description) ? (
              product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))
            ) : (
              <li>{product.description}</li>
            )}
          </ul>

          <div className="action-buttons">
            <button onClick={() => addToCart(product._id)} className="btn-cart">
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="btn-buy"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="related-section">
        <div className="related-title">
          <p>Related Products</p>
          <div className="underline"></div>
        </div>
        <div
          className="related-grid"
          tabIndex={0}
          aria-label="Related products horizontally scrollable"
        >
          {relatedProducts
            .filter((product) => product.inStock)
            .map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
        </div>
        <button
          className="btn-see-more"
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
