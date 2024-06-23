import React, { useEffect, useState } from "react"
import { BiSearch } from "react-icons/bi"
import { products } from "../../assets/data/data"
import { SearchItems } from "./SearchItems"
import { topProduct } from "../../assets/data/data"

export const Hero = () => {
  // search
  const [value, setValue] = useState("")
  const onChanage = (e) => {
    setValue(e.target.value)
  }

  

  const onSearch = (key) => {
    setValue(key)
    //console.log("search", key)
  }
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
          <SearchItems products={topProduct} value={value} onSearch={onSearch} />
          <p></p>
        </div>
      </section>
    </>
  )
}
