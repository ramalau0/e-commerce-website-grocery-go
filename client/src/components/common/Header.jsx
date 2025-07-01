
import React, { useState } from "react"
import logo from "../assets/images/logo.svg"
import cartimg from "../assets/images/cart.png"
import { BiSearch } from "react-icons/bi"
import { BsBagCheck } from "react-icons/bs"
import { RiUser3Line } from "react-icons/ri"
import { AiOutlineHeart, AiOutlineMenu, AiOutlineClose, AiOutlineDelete } from "react-icons/ai"
import { navlist } from "../assets/data/data"
import { connect, useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { DELETE } from "../../controller/action"
import { useEffect } from "react"
import  Login  from "../my/User"
import  Register  from "../my/User"
import User from "../my/User"

import firebase from "firebase/app";
import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs ,query, where,} from "firebase/firestore";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";



const firebaseConfig = {
  apiKey: "AIzaSyC02QekvqLBRTCKPVU8nT0SQ5nMY2uiJ2E",
  authDomain: "groza-eb6d3.firebaseapp.com",
  databaseURL: "https://groza-eb6d3-default-rtdb.firebaseio.com",
  projectId: "groza-eb6d3",
  storageBucket: "groza-eb6d3.appspot.com",
  messagingSenderId: "584452006839",
  appId: "1:584452006839:web:09c84b5c36d377156abe32",
  measurementId: "G-2E9DM2Z485"
};

//firebase.initializeApp(firebaseConfig);

//////////

const apps = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(apps);

const db = getFirestore(apps);


export const Header = () => {

  const [myEmail, setMyEmail] = useState('');
  const [location, setLocation ] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [status, setStatus] = useState('On the way');

  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('')
  const [items, setItems] = useState('')
  //const [sectionNone, setSectionNone] = useState(false)
  //const [addressLine1, setAddressLine1] = useState('');

  // time date
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };

  }, []);

//store email 
useEffect(() => {
const valueFromLocalStorage = localStorage.getItem('email');
if (valueFromLocalStorage) {
  setMyEmail(valueFromLocalStorage);
}
}, []);
  // navbar
  const [mobile, setMobile] = useState(false)
  // cartopen and close
  const [cartList, setCartList] = useState(false)
  const handleClose = () => {
    setCartList(null)
  }
  // scroll navbar
  window.addEventListener("scroll", function () {
    const header = this.document.querySelector(".header")
    header.classList.toggle("active", this.window.scrollY > 100)
  })

  // cart add in shop
  const getdata = useSelector((state) => state.cartReducer.carts)
  //console.log(getdata)

  // delete cart
  const dispatch = useDispatch()
  const delet = (id) => {
    dispatch(DELETE(id))
  }


  const [price, setPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(15); 
  const minimumForFreeDelivery = 200; 


  const updatedDeliveryFee = price >= minimumForFreeDelivery ? 0 : deliveryFee;
  
 
  const totalPrice = price + updatedDeliveryFee;

  const totals = () => {
    let price = 0
    getdata.map((e, i) => {
      price = parseFloat(e.price) * e.qty + price
    })
    setPrice(price)
  }

  useEffect(() => {
    totals()
  }, [totals])

  const handleCloses = () => {
    setCartList(null)
  }

//process payment to yoco
const handleCheckout = async (e) => {
 
  

// if not email popup please signing first after clicking ok redirect to login page

  if (!myEmail) {
    window.location.href = "/User";
    alert('Please login before you purchase')
  

  } else if (location) { 

                                  

  window.scrollTo({ top: 0, behavior: 'smooth' });


  const pic = getdata.map(Element => Element.cover);
  setItems(getdata.map(Element => Element.title));
  const priceItem = getdata.map(Element => Element.price);
  
  const phoneNumbers = ['0685885609']; // Replace with the recipient's phone numbers
  const message = `Order, ${items},${totalPrice},${location}`; // Replace with your message

  try {


   const data = await axios.post('https://grocerygo.co.za/api/ph', {
    email: myEmail
   }) 
 

   setPhone(data.data.map(Element => Element.Phone))
 
  //  const status = "Prepering order(not paid)"


   /*
    // Loop through the phoneNumbers and open a WhatsApp link for each one
    phoneNumbers.forEach((phoneNumber) => {
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    });
    */
    setOpen(true);
    setCartList(null);
    

    
  } catch (e) {
    console.error("Error adding document: ", e);
  }




  /////////////////////////////////////////////////////////
 // alert("results",data.data)



  // process payment 
 
   

  } else {
    alert("Please enter location to finish order")
  }
  
};

const handlePurchae = async(method) => {

  if (method === "card") {
    try {
      const redirectUrl = await axios.post("https://grocerygo.co.za/api/yoco", { totalPrice });
      if (redirectUrl.data.redirectUrl) {
        const savedata = await axios.post('https://grocerygo.co.za/api/insertOrd', {
          email: myEmail, 
          getData: items,
          cost: totalPrice,
          status: status,
          phone: phone,
          location: location,
          checkoutId: redirectUrl.data.redirectUrl,
          paymentType:  "card" 
         })
         const sms = await axios.post('https://grocerygo.co.za/api/sms',{
          to: "+27656340510",
          body: `Order items: ${items},  Total price: ${totalPrice}, phone: ${phone}, locataion: ${location}, Payment method: card`
         })
      
        window.location.href = redirectUrl.data.redirectUrl;
      }
    } catch (error) {
      console.error("Payment error:", error);
    }
  } else if (method == "cash") {
   
    const savedata = await axios.post('https://grocerygo.co.za/api/insertOrd', {
      email: myEmail, 
      getData: items,
      cost: totalPrice,
      status: status,
      phone: phone,
      location: location,
      checkoutId: "none",
      paymentType: "cash"
     })
     const sms = await axios.post('https://grocerygo.co.za/api/sms',{
      to: "+27656340510",
      body: `Order items: ${items},  Total price: ${totalPrice}, phone: ${phone}, locataion: ${location}, Payment method: cash`
     })
     if(savedata){
      alert("Your order was placed. You will be contacted.");
     } else (
      alert("Order was not successful please contact us.")
     )
    window.location.href = "https://grocerygo.co.za/user"

    setCartList(null);
  }
  setOpen(false)
}

  return (
    <>
      <header className='header'>
        <div className='container'>
          <nav>
            <div className='toggle'>
               <button onClick={() => setMobile(!mobile)}>{mobile ? <AiOutlineClose className='close heIcon' /> : <AiOutlineMenu className='open heIcon' />}</button>
            </div>
            <div className='left'>
              <Link to='/'>
                <h1></h1>
               {/* <img src={logo} alt='logo' />*/}
              </Link>
            </div>
            <div className='center'>
              <ul className={mobile ? "mobile-nav" : "menu"}>
                {navlist.map((nav, i) => (
                  <li key={i}>
                    <Link to={nav.path}  onClick={() => setMobile(!mobile)} >{nav.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
         <div className='right'  >
            <div className='right_search' style={{ display: 'none' }} >
              <input type='text' placeholder='Search Products...' />
              <BiSearch className='serachIcon heIcon' />
            </div>  
            <div className='right_user'>
              <RiUser3Line className='userIcon heIcon' />
              <AiOutlineHeart className='userIcon heIcon' />
            </div>
            <div className='right_card'>
              <button className='button' onClick={() => setCartList(!cartList)}>
                <BsBagCheck className='shop heIcon' />
                MY CART<span> ({getdata.length})</span>
              </button>
              <div className={cartList ? "showCart" : "hideCart"}>
                {getdata.length ? (
                  <section  className='details'>
                    <div className='details_title'>
                      <h3>Photo</h3>
                      <p>Product Name</p>
                    </div>
                    {getdata.map((e) => (
                      <div className='details_content'>
                        <div className='details_content_img'>
                          <Link to={`/cart/${e.id}`} onClick={handleCloses}>
                            <img src={e.cover} alt='' />
                          </Link>
                        </div>
                        <div className='details_content_detail'>
                          <div className='details_content_detail_price'>
                            <p>{e.title.slice(0, 20)}...</p>
                            <p>Price : R{e.price}</p>
                            <p>Quantity : {e.qty}</p>
                          </div>
                        </div>
                        <div className='details_content_detail_icon'>
                          <i onClick={() => delet(e.id)}>
                            <AiOutlineDelete />
                          </i>
                        </div>
                      </div>
                    ))}
                    <div className='details_total'>
                    <p>Subtotal: R{price.toFixed(2)}</p>

{/* Delivery Fee */}
{updatedDeliveryFee > 0 ? (
  <p>Delivery Fee (added): R{updatedDeliveryFee.toFixed(2)}</p>
) : (
  <p>Delivery Fee: Free!</p>
)}

{/* Always show the free delivery message */}
<p style={{ color: "blue", fontSize: "14px" }}>
  🚚 If you buy items for more than R200, you get free delivery!
</p>

<hr style={{ margin: "8px 0" }} />

{/* Total */}
<h4>Total: R{totalPrice.toFixed(2)}</h4>

                    </div>
                    <div>
                    <input
                      type="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Street name, suburb / Res Name & Unit No"
                      className="btn-container loginput"
                      style={{ width: "100%" }}
                     />
                     </div>
                    <button sx={{ mr: 2 }} type='button' className='logout-button' onClick={handleCheckout} >
                     Purchase 
                    
                    </button>
                  
                    <button  type='button' className='logout-button' onClick={handleClose} >
                     Close tab 
                    
                    </button>
                  </section>
                ) : (
                  <div className='empty'>
                    <p>Your cart is empty</p>
                    <img src={cartimg} alt='' />
                    <button  type='button' className='logout-button' onClick={handleClose} >
                     Close tab 
                    
                    </button>
                  </div>
                  
                )}
              </div>
              <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Select Payment Method</DialogTitle>
      <DialogContent>
        <p>Would you like to pay with Card or Cash?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handlePurchae('cash')} color="primary">
          Cash
        </Button>
        <Button onClick={() => handlePurchae('card')} color="secondary">
          Card
        </Button>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    amount: state.amount,
  }
}
connect(mapStateToProps)(Header)
