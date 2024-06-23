import React, { useState } from "react"
import { topProduct } from "../../assets/data/data"
import { topShops } from "../../assets/data/dataShops"
import { Heading } from "../../common/Heading"
import { ProductItems } from "../product/ProductItems"
import axios from "axios";

export const TopProduct = () => {
  //console.log("jjjjjknjkd", topProducts, topShops)
  const topProducts =  [...topProduct]
  const topShop = [...topShops]
  //console.log("this4", topProducts)
  const [cartItems, setCartItems] = useState(topProducts)
  const [cartItemsShop, setCartItemsShop] = useState(topShop)
  //const cartItemNew = useState(topProducts.filter((item) => item.shops))
  const allCategories = ["all", ...new Set(cartItems.map((item) => item.category))]
  const [category, setCategory] = useState(allCategories)
  const allShops = ["all", ...new Set(cartItemsShop.map((item) => item.shops))]
  const [shops, setShops] = useState(allShops)
  //console.log("jjj", allCategories)
  /*console.log(setCartItems)
  console.log(setCategory)
  console.log(allCategories)*/
  //console.log("newthings",cartItemNew)
  const handleFilter = (category) => {
    console.log("shop",category)
    for (let i in category){
    if (i !== null){
    const newItem = topProducts.filter((item) => item.category === category)
    setCartItems(newItem)
    
    if (category === "all" ) {
      setCartItems(topProducts.filter((item) => item.category !== null))
      return
    }
  }
  }
  }

  const handleFilterShops = (shops) => {
    //console.log("what are thses",shops, topProducts.filter((item) => item.shops === shops))
    for (let i in shops){
      if (i !== null){
      const newItem = topShop.filter((item) => item.shops === shops)
      setCartItemsShop(newItem)
      
      if (shops === "all" ) {
        setCartItemsShop(topShop.filter((item) => item.shops !== null))
        return
      }
    }
    } 
  }

  const [displayCategory, setDisplayCategory] = useState('all');

  const handleClick = (category) => {
    setDisplayCategory(category);
  };

  const [groupIndex, setGroupIndex] = useState(0);
  const startIndex = groupIndex * 1000;
  const endIndex = startIndex + 1000;
// cartitems
  const currentGroup = cartItems.slice(startIndex, endIndex);
  const filteredObjects = currentGroup.filter(object => {
    return displayCategory === 'all' || object.category === displayCategory ;
  });


 // cartitemshop
 const currentGroupKFC = cartItemsShop.slice(startIndex, endIndex);
 const filteredObjectsKFC = currentGroupKFC.filter(object => {
   return displayCategory === 'all' || object.shops === displayCategory ;
 });

 // Continues
    const [count, setCount] = useState(0)
    const increment = () => {
      setCount(count + 1)
    }
  
 

  const handleNext = () => {
    setGroupIndex(groupIndex + 1);
  };

  const handlePrev = () => {
    setGroupIndex(groupIndex - 1);
  };
  {/*
  const SampleNextArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='next'>
          <i className='fa fa-long-arrow-alt-right'></i>
        </button>
      </div>
    )
  }
  const SamplePrevArrow = (props) => {
    const { onClick } = props
    return (
      <div className='control-btn' onClick={onClick}>
        <button className='prev'>
          <i className='fa fa-long-arrow-alt-left'></i>
        </button>
      </div>
    )
  } */}



  return (
    <>
   
      <section className='topproduct'>
        <div className='container'>
          <div className='head'>
             {/*<Heading  className="motion" title='Groceries' desc='' />*/}

            <div className='category'>
            <h3 style={{width:"100%" , paddingLeft:"25px"}} >Groceries</h3>
            
              {category.map((category) => (
            
                <button className='button' onClick={() => handleFilter(category)}>
                  {category}
                </button>
               
              
              ))}
            </div>
           
            
         
            
          </div>
         
          <ProductItems cartItems={filteredObjects} />
        
        </div>
        <div className='container'>
          <div className='head'>
             {/*<Heading  className="motion" title='Groceries' desc='' />*/}

            <div className='category'>
            <h3 style={{width:"100%" , paddingLeft:"25px"}} >KFC</h3>
            
              {shops.map((shops) => (
            
                <button className='button' onClick={() => handleFilterShops(shops)}>
                  {shops}
                </button>
               
              
              ))}
            </div>
           
            
         
            
          </div>
         
          <ProductItems cartItems={filteredObjectsKFC} />
        
        </div>
      </section>
    </>
  )
}
