import { FcCheckmark } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai"
import React, { useState, useEffect, version, useRef } from "react";
import axios from "axios";


export const navlist = [
  {
    text: "shop",
    path: "/",
  },
  {
    text: "my account",
    path: "/user",
  },
  {
    text: "home website",
    path: "/contact",
  },
]
export const hero = [
  {
    id: 1,
    cover: "../images/hero/cate-h11_1.png",
    name: "Web Themes",
    items: "5",
  },
  {
    id: 2,
    cover: "../images/hero/cate-h11_2.png",
    name: "UI Design",
    items: "12",
  },
  {
    id: 3,
    cover: "../images/hero/cate-h11_3.png",
    name: "3D Models",
    items: "12",
  },
  {
    id: 4,
    cover: "../images/hero/cate-h11_5.png",
    name: "Image Stock",
    items: "15",
  },
  {
    id: 5,
    cover: "../images/hero/cate-h11.png",
    name: "Mockup Design",
    items: "7",
  },
]
export const products = [
  {
    id: 20,
    cover: "../images/product/shops-11.png",
    title: "Oros 1L",
    author: "",
    price: "35.99",
    category: "",
    qty: 0,
  },
  {
    id: 21,
    cover: "../images/product/shops-21.png",
    title: "Beef Noodles",
    author: "",
    price: "19.99",
    category: "Snacks & Drinks",
    qty: 0,
  },

  {
    id: 22,
    cover: "../images/product/shops-22.png",
    title: "White Bread",
    author: "",
    price: "15.99",
    category: "Diary",
    qty: 0,
  },
  {
    id: 23,
    cover: "../images/product/shops-23.png",
    title: "Macaroni 1kg",
    author: "",
    price: "7.99",
    category: "Fat & Oil",
    qty: 0,
  },
  {
    id: 24,
    cover: "../images/product/shops-24.png",
    title: "",
    author: "",
    price: "30.99",
    category: "",
    qty: 0,
  },
  {
    id: 25,
    cover: "../images/product/shops-25.png",
    title: "Brown Bread",
    author: "",
    price: "12.99",
    category: "",
    qty: 0,
  },
  {
    id: 26,
    cover: "../images/product/shops-26.png",
    title: "Spaghetti",
    author: "",
    price: "7.99",
    category: "",
    qty: 0,
  },
  {
    id: 27,
    cover: "../images/product/shops-27.png",
    title: "Rice 2kg",
    author: "",
    price: "15.99",
    category: "",
    qty: 0,
  },

]
export const banner = [
  {
    id: 1,
    title1: "Simple IPhone ",
    title2: "Mockups Design PSD, Ai, EPS",
    desc: "Sale 30% Off For Members",
    cover: "../images/banner/b2.png",
  },
  {
    id: 2,
    title1: "Mockup PSD",
    title2: "50+ Ui Screen Mockups",
    desc: "Sale 30% Off For Members",
    cover: "../images/banner/b1.png",
  },
]



export let topProduct = []

const fetchGrocery = async () => {
  try {
    const response = await axios.post("http://localhost:3002/api/gro");
    console.log("this is the new staff", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching grocery data", error);
    throw error; // Propagate the error so that it can be handled elsewhere
  }
};



  fetchGrocery()
  .then((data) => {
    topProduct = data
    console.log("this",topProduct)
     // Assign topProducts when the data is fetched
  })
  .catch((error) => {
    // Handle errors if necessary
    console.error("Error fetching grocery data", error);
  });



/////topProducts = topProduct.concat(topShops)
//console.log("this3",topShops)
//export { topProducts, topShops }  // Declare topProducts without initializing it

//console.log("top",topProducts, topShops)
 // topProducts = topProduct.cancat(topShops)
/*
[
  {
    id: 1,
    cover: "../images/product/shops-1-1.png",
    title: "Water 5L",
    author: "",
    price: "20.00",
    category: "Water",
    shops: null,
    qty: 0,
  },
  {
    id: 2,
    cover: "../images/product/shops-2.png",
    title: "Sprite 2.5l",
    author: "",
    price: "27.99",
    category: "Drinks",
    shops: null,
    qty: 0,
  },
  {
    id: 3,
    cover: "../images/product/shops-3.png",
    title: "Coca Cola 2.5l",
    author: "",
    price: 27.98,
    category: "Drinks",
    shops: null,
    qty: 0,
  },

  {
    id: 4,
    cover: "../images/product/shops-4.png",
    title: "Ice Cream Farmhouse 2l",
    author: "",
    price: "69.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 5,
    cover: "../images/product/shops-5.png",
    title: "Sunfower Oil Excella 500ml",
    author: "",
    price: "31.99",
    category: "Fat",
    shops: null,
    qty: 0,
  },
  {
    id: 6,
    cover: "../images/product/shops-6.png",
    title: "Yoghurt, vanilla flavoured 1l",
    author: "",
    price: "26.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 7,
    cover: "../images/product/shops-7.png",
    title: "Custard, Vanilla Flavoured 1l",
    author: "",
    price: "39.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 8,
    cover: "../images/product/shops-8.png",
    title: "Tropika Orange Flavoured Fruit Mix",
    author: "",
    price: "43.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 9,
    cover: "../images/product/shops-9.png",
    title: "Cheese, Parmalat Gouda Flavoured400g",
    author: "",
    price: "78.49",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 10,
    cover: "../images/product/shops-10.png",
    title: "Jungle Oats 1kg",
    author: "",
    price: "49.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 11,
    cover: "../images/product/shops-11.png",
    title: "Oros Orange Squash",
    author: "",
    price: "48.99",
    category: "Drinks",
    shops: null,
    qty: 0,
  },

  {
    id: 12,
    cover: "../images/product/shops-12.png",
    title: "Noodles Chicken Flavoured",
    author: "",
    price: "30.49",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 13,
    cover: "../images/product/shops-13.png",
    title: "Sugar Brown Selati 5kg",
    author: "",
    price: "132.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 14,
    cover: "../images/product/shops-14.png",
    title: "Danone Smooth Yoghurt Parmalat 6 x 100g",
    author: "",
    price: "29.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 15,
    cover: "../images/product/shops-15.png",
    title: "Milk Low Fat 6 x 1l",
    author: "",
    price: "115.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 16,
    cover: "../images/product/shops-16.png",
    title: "Cheese Gouda flavoured",
    author: "",
    price: "89.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 17,
    cover: "../images/product/shops-17.png",
    title: "d'lite Fat Spread 1kg",
    author: "",
    price: "48.99",
    category: "Fat",
    shops: null,
    qty: 0,
  },
  {
    id: 18,
    cover: "../images/product/shops-18.png",
    title: "Tropika Mango & Peach Flavoured Fruit Mix",
    author: "",
    price: "43.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 19,
    cover: "../images/product/shops-19.png",
    title: "Inkomazi Full Cream Maas 2kg",
    author: "",
    price: "45.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },

 {
    id: 20,
    cover: "../images/product/shops-20.png",
    title: "Yoghurt",
    author: "",
    price: "14.49",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 21,
    cover: "../images/product/shops-21.png",
    title: "Noodles Beef Flavoured",
    author: "",
    price: "30.49",
    category: "Grain",
    shops: null,
    qty: 0,
  },

  {
    id: 22,
    cover: "../images/product/shops-22.png",
    title: "Bread White Sasko",
    author: "",
    price: "23.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 23,
    cover: "../images/product/shops-23.png",
    title: "Macaroni Fatti's & Moni's 1kg",
    author: "",
    price: "33.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 24,
    cover: "../images/product/shops-24.png",
    title: "Weetbix 900g",
    author: "",
    price: "39.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 25,
    cover: "../images/product/shops-25.png",
    title: "Bread Brown Sunbake",
    author: "",
    price: "21.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 26,
    cover: "../images/product/shops-26.png",
    title: "Spaghetti Fatti's & Moni's 500g",
    author: "",
    price: "22.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 27,
    cover: "../images/product/shops-27.png",
    title: "Rice Tastic 2kg",
    author: "",
    price: "44.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 28,
    cover: "../images/product/shops-28.png",
    title: "Morvite Original 150g",
    author: "",
    price: "18.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 29,
    cover: "../images/product/shops-29.png",
    title: "Apricot Fruit Roll",
    author: "",
    price: "16.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },

 {
    id: 30,
    cover: "../images/product/shops-30.png",
    title: "WeetBix 450g",
    author: "",
    price: "39.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },
  {
    id: 31,
    cover: "../images/product/shops-31.png",
    title: "Bread White Sunbake",
    author: "",
    price: "22.99",
    category: "Grain",
    shops: null,
    qty: 0,
  },

  {
    id: 32,
    cover: "../images/product/shops-32.png",
    title: "Chicken Spice",
    author: "",
    price: "32.99",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 33,
    cover: "../images/product/shops-33.png",
    title: "Rice 2kg",
    author: "",
    price: "33.99",
    category: "Fat",
    shops: null,
    qty: 0,
  },

  {
    id: 35,
    cover: "../images/product/shops-35.png",
    title: "Mayonnaice 750g ",
    author: "",
    price: "35.99",
    category: "Fat",
    shops: null,
    qty: 0,
  },
  {
    id: 36,
    cover: "../images/product/shops-36.png",
    title: "Spinach",
    author: "",
    price: "30.00",
    category: "Veg",
    shops: null,
    qty: 0,
  },
  {
    id: 37,
    cover: "../images/product/shops-37.png",
    title: "Carrots",
    author: "",
    price: "14.99",
    category: "Veg",
    shops: null,
    qty: 0,
  },
  {
    id: 38,
    cover: "../images/product/shops-38.png",
    title: "Onions 2kg",
    author: "",
    price: "28.80",
    category: "Veg",
    shops: null,
    qty: 0,
  },
  {
    id: 39,
    cover: "../images/product/shops-39.png",
    title: "Onions 3kg",
    author: "",
    price: "37.90",
    category: "Veg",
    shops: null,
    qty: 0,
  },

 {
    id: 40,
    cover: "../images/product/shops-40.png",
    title: "Potatos 3kg",
    author: "",
    price: "70.50",
    category: "Veg",
    shops: null,
    qty: 0,
  },
  
  {
    id: 41,
    cover: "../images/product/shops-41.png",
    title: "",
    author: "",
    price: "30.00",
    category: "Snacks & Drinks",
    shops: null,
    qty: 0,
  },

  {
    id: 42,
    cover: "../images/product/shops-42.png",
    title: "",
    author: "",
    price: "30.00",
    category: "Dairy",
    shops: null,
    qty: 0,
  },
  {
    id: 43,
    cover: "../images/product/shops-43.png",
    title: "Cabbage 1kg",
    author: "",
    price: "19.90",
    category: "Veg",
    shops: null,
    qty: 0,
  },
  {
    id: 44,
    cover: "../images/product/shops-44.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    shops: null,
    qty: 0,
  },
  {
    id: 45,
    cover: "../images/product/shops-45.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 46,
    cover: "../images/product/shops-46.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 47,
    cover: "../images/product/shops-47.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 48,
    cover: "../images/product/shops-48.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 49,
    cover: "../images/product/shops-49.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },

 {
    id: 50,
    cover: "../images/product/shops-50.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 51,
    cover: "../images/product/shops-51.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 52,
    cover: "../images/product/shops-52.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },

 {
    id: 53,
    cover: "../images/product/shops-53.png",
    title: "",
    author: "",
    price: "30.00",
    category: "",
    qty: 0,
  },
  {
    id: 54,
    cover: "../images/product/shops-1.png",
    title: "Full Cream Milk 500ml",
    author: "",
    price: "24.99",
    category: "Diary",
    qty: 0,
  }, 
  
]  */
export const price = [
  {
    id: 1,
    name: "Free Trial",
    price: "0",
    desc: "Beautifully simple project planning, 14 days of free trial.",
    list: [
      {
        para: "Demo Content Install",
        icon: <FcCheckmark />,
      },
      {
        para: "Theme Updates",
        icon: <FcCheckmark />,
      },
      {
        para: "Support And Updates",
        icon: <AiOutlineClose />,
      },
      {
        para: "Access All Themes",
        icon: <AiOutlineClose />,
      },
      {
        para: "All Themes For Life",
        icon: <AiOutlineClose />,
      },
      {
        para: "30 Days Money Back",
        icon: <AiOutlineClose />,
      },
    ],
  },
  {
    id: 2,
    name: "Premium",
    price: "26",
    desc: "Declutter your mind and save time with Premium.",
    list: [
      {
        para: "Demo Content Install",
        icon: <FcCheckmark />,
      },
      {
        para: "Theme Updates",
        icon: <FcCheckmark />,
      },
      {
        para: "Support And Updates",
        icon: <FcCheckmark />,
      },
      {
        para: "Access All Themes",
        icon: <FcCheckmark />,
      },
      {
        para: "All Themes For Life",
        icon: <AiOutlineClose />,
      },
      {
        para: "30 Days Money Back",
        icon: <AiOutlineClose />,
      },
    ],
  },
  {
    id: 3,
    name: "Unlimited Access ",
    price: "49",
    desc: "Declutter your mind and save time with Premium.",
    list: [
      {
        para: "Demo Content Install",
        icon: <FcCheckmark />,
      },
      {
        para: "Theme Updates",
        icon: <FcCheckmark />,
      },
      {
        para: "Support And Updates",
        icon: <FcCheckmark />,
      },
      {
        para: "Access All Themes",
        icon: <FcCheckmark />,
      },
      {
        para: "All Themes For Life",
        icon: <FcCheckmark />,
      },
      {
        para: "30 Days Money Back",
        icon: <FcCheckmark />,
      },
    ],
  },
]
export const customer = [
  {
    id: 1,
    desc: "Congue condimentum et non eu arcu sociis aenean vivamus quisque. Porta purus urna. Massa id blandit enim cursus ante, nec consectetuer imperdiet ipsum",
    name: "ALGISTINO",
    post: "Marketing Company Director",
  },
  {
    id: 2,
    desc: "Congue condimentum et non eu arcu sociis aenean vivamus quisque. Porta purus urna. Massa id blandit enim cursus ante, nec consectetuer imperdiet ipsum",
    name: "ALGISTINO",
    post: "Marketing Company Director",
  },
  {
    id: 3,
    desc: "Congue condimentum et non eu arcu sociis aenean vivamus quisque. Porta purus urna. Massa id blandit enim cursus ante, nec consectetuer imperdiet ipsum",
    name: "ALGISTINO",
    post: "Marketing Company Director",
  },
]
export const blog = [
  {
    id: 1,
    date: "October 27, 2021",
    title: "Transition Your Favorite Looks into  Fall France 2022",
    category: "image",
    cover: "../images/blog/b1.jpg",
  },
  {
    id: 2,
    date: "October 27, 2021",
    title: "Meeting Breathtaking Beauty for  Everyday Life",
    category: "shopping",
    cover: "../images/blog/b2.jpg",
  },
  {
    id: 3,
    date: "October 27, 2021",
    title: "Perfect Quality Reasonable Price for Your",
    category: "travle",
    cover: "../images/blog/b3.jpg",
  },
  {
    id: 4,
    date: "October 27, 2021",
    title: "Transition Your Favorite Looks into  Fall France 2022",
    category: "music",
    cover: "../images/blog/b4.jpg",
  },
  {
    id: 5,
    date: "October 27, 2021",
    title: "Meeting Breathtaking Beauty for  Everyday Life",
    category: "music",
    cover: "../images/blog/b5.jpg",
  },
  {
    id: 6,
    date: "October 27, 2021",
    title: "Perfect Quality Reasonable Price for Your",
    category: "lifestyle",
    cover: "../images/blog/b6.jpg",
  },
]
