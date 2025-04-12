import React from "react";
import { FiShoppingBag, FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { ADD } from "../../../controller/action";

export const SearchItems = ({ products, value, onSearch }) => {
  const dispatch = useDispatch();
  const addToCart = (e) => {
    dispatch(ADD(e));
  };

  return (
    <>
      <section className="searchItems">
        <div className="product_items">
          {products
            .filter((items) => {
              const searchKey = value.toLowerCase();
              const title = items.title.toLowerCase();
              return searchKey && title.includes(searchKey);
            })
            .slice(0, 10)
            .map((items) => (
              <div className="box" onClick={() => onSearch(items.title)} key={items.id}>
                <div className="img">
                  <img src={items.cover} alt="" />
                  <div className="overlay">
                    <button className="button" onClick={() => addToCart(items)}>
                      <FiShoppingBag />
                    </button>
                    <button className="button">
                      <AiOutlineHeart />
                    </button>
                    <button className="button">
                      <FiSearch />
                    </button>
                  </div>
                </div>
                <div className="details">
                  <h3>{items.title}</h3>
                  <p>{items.author}</p>
                  <h4>R{items.price}</h4>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
