import React, { useState, useEffect } from "react"
import { ProductItems } from "../product/ProductItems"
import axios from "axios";
import { Box, Button } from '@mui/material';

export const TopProduct = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [topShop, setTopShop] = useState([]);
  const [cartItems, setCartItems] = useState(topProducts)
  const [cartItemsShop, setCartItemsShop] = useState(topShop)
  const allCategories = ["all", ...new Set(topProducts.map((item) => item.category))]
  const [category, setCategory] = useState(allCategories)
  const allShops = ["all", ...new Set(topShop.map((item) => item.shops))]
 
  const [productTrue, setProductsTrue] = useState(true)
  //console.log("jjj", allCategories)
  /*console.log(setCartItems)
  console.log(setCategory)
  console.log(allCategories)*/
  //console.log("newthings",cartItemNew)
  useEffect(() => {
    fetchGrocery()
    fetchShops()

  }, []);

  
  const fetchGrocery = async () => {
    try {
      const response = await axios.post("https://grocerygo.co.za/api/gro");
      console.log("this is the new staff", response.data);
      
      setTopProducts(response.data)
      handleFilter("all", response.data)
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
      handleFilterShops("all", response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching grocery data", error);
      throw error; // Propagate the error so that it can be handled elsewhere
    }
  };
  // useEffect(() => {
  //   handleFilterShops("all");
  // }, [productTrue]);

  const handleFilter = (category, topProductsValue) => {
    console.log("shop cliked",category)
    console.log(topProductsValue, "::before")
    for (let i in category){
    if (i !== null ){
    const newItem = topProductsValue.filter((item) => item.category === category)
    setCartItems(newItem)
    console.log(topProductsValue, "::Items")
    if (category === "all" ) {
      setCartItems(topProductsValue.filter((item) => item.category !== null))
      return
    }
    setProductsTrue(false)
  }
  }
  }

  const handleFilterShops = (shops, topShopValue) => {
    console.log("something cliekd")
    //console.log("what are thses",shops, topProducts.filter((item) => item.shops === shops))
    for (let i in shops){
      if (i !== null){
      const newItem = topShopValue.filter((item) => item.shops === shops)
      setCartItemsShop(newItem)
      
      if (shops === "all" ) {
        setCartItemsShop(topShopValue.filter((item) => item.shops !== null))
        return
      }
      setProductsTrue(false)
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
            

          

          <Box
            display="flex"
            gap={2}
            overflow="auto"
            whiteSpace="nowrap"
            sx={{
              scrollbarWidth: 'none',
              padding: '8px 0', // Adds padding for better spacing
            }}
          >
            {allCategories.map((category) => (
              <Button
                key={category}
                onClick={() => handleFilter(category, topProducts)}
                variant="outlined" // You can change this to "contained" for a filled button look
                sx={{
                  padding: '8px 16px', // Adds padding to make the button more clickable
                  fontWeight: 'bold', // Bold text for better readability
                  borderRadius: '20px', // Round the corners for a softer look
                  textTransform: 'none', // Prevents uppercasing text by default
                  '&:hover': {
                    backgroundColor: '#f0f0f0', // Adds a hover effect with a light background color
                    borderColor: '#3f51b5', // Changes border color on hover
                  },
                }}
              >
                {category}
              </Button>
            ))}
          </Box>
            </div>
     
          </div>
         
          <ProductItems cartItems={filteredObjects} />
        
        </div>
        <div className='container'>
          <div className='head'>
             {/*<Heading  className="motion" title='Groceries' desc='' />*/}

            <div className='category'>
            <h3 style={{width:"100%" , paddingLeft:"25px"}} >Fast Food</h3>
                
              <Box
                display="flex"
                gap={2}
                overflow="auto"
                whiteSpace="nowrap"
                sx={{
                  scrollbarWidth: 'none',
                  padding: '8px 0', 
                }}
              >
                {allShops.map((shop) => (
                  <Button
                    key={shop}
                    onClick={() => handleFilterShops(shop, topShop)}
                    variant="outlined"
                    sx={{
                      padding: '8px 16px',
                      fontWeight: 'bold', 
                      borderRadius: '20px', 
                      textTransform: 'none', 
                      '&:hover': {
                        backgroundColor: '#f0f0f0', 
                        borderColor: '#3f51b5', 
                      },
                    }}
                  >
                    {shop}
                  </Button>
                ))}
              </Box>

            </div>
           
            
         
            
          </div>
         
          <ProductItems cartItems={filteredObjectsKFC} />
        
        </div>
      </section>
    </>
  )
}
