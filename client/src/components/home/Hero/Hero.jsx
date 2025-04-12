import React, { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"
// import { topProduct } from "../../assets/data/data"
import axios from "axios";

export const Hero = () => {
  const [topProducts, setTopProducts] = useState([])
  const [topShop, setTopShop] = useState([]);
  // search
  const [value, setValue] = useState("")
  const onChanage = (e) => {
    setValue(e.target.value)
  }

  useEffect (() => {
    fetchShops()
    fetchGrocery()
  }, [])

  const fetchGrocery = async () => {
    try {
      const response = await axios.post("https://grocerygo.co.za/api/gro");
      console.log("this is the new staff", response.data);
      
      setTopProducts(response.data)
      // handleFilter("all", response.data)
    } catch (error) {
      console.error("Error fetching grocery data", error);
      throw error; // Propagate the error so that it can be handled elsewhere  https://grocerygo.co.za/api/gro
    }
  }
  const fetchShops = async () => {
    try {
      const response = await axios.post("https://grocerygo.co.za/api/shops");
      console.log("this is the new staff2", response.data);
      setTopShop(response.data)
      // handleFilterShops("all", response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching grocery data", error);
      throw error; // Propagate the error so that it can be handled elsewhere
    }
  };
 const combinedProducts = [...topShop, ...topProducts]
  const onSearch = (key) => {
    setValue(key)
  
  }

  //   const filteredProducts = combinedProducts.filter((product) =>
  //   product.name.toLowerCase().includes(value.toLowerCase())
  // );
  //console.log(localStorage.getItem("setSectionNone"))
  return (
    <>
      <section  className='hero'>
        <div className='container'>
          <h1>
            <label>
              Food on the move with  <span>Grocery Go</span> 
            </label>
            <br />
            <label>
             <span> </span> 
            </label>
          </h1>
          <p>Take the stress out of grocery shopping with our unbeatable delivery service.</p>
          <div className='search'>
            <span>All Categories</span>
            <hr />
          <input type='text' placeholder='Search Products...' onChange={onChanage} value={value} />
            <button onClick={() => onSearch(value)}>
              <BiSearch className='serachIcon heIcon' />
            </button>
          </div>
          <SearchItems products={combinedProducts} value={value} onSearch={onSearch} />
     
          <p></p>
        </div>
      </section>
    </>
  )
}
