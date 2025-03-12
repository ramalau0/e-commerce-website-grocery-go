import { FcCheckmark } from "react-icons/fc"
import { AiOutlineClose } from "react-icons/ai"
import React, { useState, useEffect, version, useRef } from "react";
import axios from "axios";



export let topShops = []

// const fetchShops = async () => {
//     try {
//       const response = await axios.post("https://grocerygo.co.za/api/shops");
//       console.log("this is the new staff2", response.data);
//       return response.data;
//     } catch (error) {
//       console.error("Error fetching grocery data", error);
//       throw error; // Propagate the error so that it can be handled elsewhere
//     }
//   };

// fetchShops()
//   .then((data) => {
//     topShops = data; // Assign topProducts when the data is fetched
//     console.log("this2",topShops)
//   })
//   .catch((error) => {
//     // Handle errors if necessary
//     console.error("Error fetching grocery data", error);
//   });
  
