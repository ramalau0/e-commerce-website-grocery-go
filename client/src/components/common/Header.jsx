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

  // total prcie
  const [price, setPrice] = useState(0)
  //console.log(price)

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
  const items = getdata.map(Element => Element.title);
  const priceItem = getdata.map(Element => Element.price);
  
  const phoneNumbers = ['0685885609']; // Replace with the recipient's phone numbers
  const message = `Order, ${items},${price},${location}`; // Replace with your message

  try {


   const data = await axios.post('https://grocerygo.co.za/api/ph', {
    email: myEmail
   }) 
 

   const phone = data.data.map(Element => Element.Phone)
   console.log("prices", phone)
   const sms = await axios.post('https://grocerygo.co.za/api/sms',{
    to: "+27656340510",
    body: `Order items: ${items},  Total price: ${price}, phone: ${phone}, locataion: ${location}`
   })

   /*
    // Loop through the phoneNumbers and open a WhatsApp link for each one
    phoneNumbers.forEach((phoneNumber) => {
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      window.open(whatsappURL, '_blank');
    });
*/
setCartList(null)
alert("Order has been send please enter card details to finish order")

  
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }




  /////////////////////////////////////////////////////////
 // alert("results",data.data)



  // process payment 
  setCartList(null)
  const redirectUrl = await axios.post('https://grocerygo.co.za/api/yoco',{ price
  });
  console.log(redirectUrl, "nnj")
  if (redirectUrl) {
    window.location.href = redirectUrl.data.redirectUrl; 
  }
   

  } else {
    alert("Please enter location to finish order")
  }
  
};

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
                      <h4>Total : R{price}</h4>
                    </div>
                    <div>
                    <input
                      type="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Gate no, street, res name"
                      className="btn-container loginput"
       
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
                  </div>
                )}
              </div>
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
