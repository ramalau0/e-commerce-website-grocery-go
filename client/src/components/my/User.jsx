import React, { useState } from "react";
import axios from "axios";
//import bcrypt from "bcryptjs";
//import jwt from "jsonwebtoken";
//import { getAuth , createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc, getDocs ,query, where,} from "firebase/firestore";
import { useEffect } from 'react';
import "./user.css";
//import { Map, GoogleApiWrapper, Autocomplete } from 'google-maps-react';
import MapContainer from "./MapContainer";

//firebase.initializeApp(firebaseConfig);

//firebase.initializeApp(firebaseConfig);

const Register = (props) => {
  const [email, setEmail ] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
 // const [addressLine1, setAddressLine1] = useState('');
 // const [addressLine2, setAddressLine2] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  /*
  const handleSubmit = async (e) => {
    e.preventDefault();

  
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  */

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.length !==0 && password.length > 8 && phoneNumber.length >= 10){
    const data = await axios.post('https://grocerygo.co.za/api/insert', {
      email: email,
      password: password,
      phone: phoneNumber
    })
    if (data.data) {
      setIsAuthenticated(true);

      localStorage.setItem('isAuthenticated', 'true');
      
          
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
  
      window.location.reload();
      
   } else (alert("Error, reinter your details or email already exists"));


  } else (alert("Error, please enter correct details"));
    
    /// validate this data maybe return true if the infor is correctly instated unless they auto validate

      

  };

  return (
    <form onSubmit={handleSubmit} className='logform' >
       <label className="loglabel">
        Email:
        <input className="loginput"  type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label  className="loglabel" >
        Password:
        <input  className="loginput" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label   >
      <label  className="loglabel" >
        Phone number:
        <input   className="loginput"  type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
      </label  >
     
      <button type="submit">Sign up</button>
    </form>
  );
};

const Login = () => {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);



  // const handleSubmit = async (e) => {
    // e.preventDefault();

 
 
 
    const handleSubmits = async(e) => {
      e.preventDefault();
      const datas = await axios.post('https://grocerygo.co.za/api/get', {
        emailLog: email.toLocaleLowerCase(),
        password: password.toString()
      })
      //console.log(datas)
      if (datas.data.length !== 0) {
        setIsAuthenticated(true);

        localStorage.setItem('isAuthenticated', 'true');
        
            
        if (email) {
          localStorage.setItem("email", email);
        } else {
          localStorage.removeItem("email");
        }
    
       window.location.reload();
        
     } else (alert("Wrong email or password"));
        
       
      };
/*
      //setLoggedIn(true);
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log("User logged in successfully", res);

          setIsAuthenticated(true);
          localStorage.setItem('isAuthenticated', 'true');
      
      
      
          
            if (email) {
              localStorage.setItem("email", email);
            } else {
              localStorage.removeItem("email");
            }
      
            //window.location.reload();
        })
        .catch((error) => {
          console.error("Error logging in user", error);
        });
 
 
 
       


         // Perform login logic here and set isAuthenticated to true


    
  
    try {
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });

      // Verify the password using bcrypt
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        console.error("Invalid credentials");
        return;
      }

      // Generate a JSON Web Token
      const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET);
      console.log("User logged in successfully", token);
    } catch (error) {
      console.error("Error logging in user", error);
    }  */
  

  return (
    <form onSubmit={handleSubmits}  className="logform" > 
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="btn-container loginput"
       
      /><br></br>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="loginput"
      />
      <button type="submit" >Login</button>
    </form>
  );
  };


const User = (props) => {
  //const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //const [email, setEmail] = useState({});
  const [email, setEmail ] = useState(localStorage.getItem("email") || "");
  
  //const email = "gacadap370@otanhome.com";
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    if (email) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }
  }, [email]);

  useEffect(() => {

   
    const getUser = async () => {
      //const userRef = query(collection(db, "users"), where("email", "==", email));
      //const querySnapshot = await getDocs(userRef);
      //querySnapshot.forEach((doc) => {
      //  const { phone, password } = doc.data();
      //  setUser({ id: doc.id, phone, password });
    //  });
    };

    getUser();


    // Check local storage for the user's authentication status
    const storedAuth = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(storedAuth === 'true');
    setUserDetails({
      orderHistory: [{ /*orderId: 1234, date: "2023-02-15", status: "Delivered"}, {orderId: 5678, date: "2023-02-12", status: "In transit" */}]
    });

    
  



  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem("email");
    window.location.reload();
  }
  



  return (
    
      <div>
      {isAuthenticated ? (
        <div className='user-details-container'>
          <h1  className="userhd" >Welcome!</h1>
          <p>Email: {email} </p>

          <h2>Order History:</h2>
          <ul>
            {userDetails.orderHistory.map((order) => (
              <li key={order.orderId}>
                Order ID: {order.orderId}<br />
                Date: {order.date}<br />
                Status: {order.status}
              </li>
            ))}
          </ul>

          <button type="submit" onClick={handleLogout} className='buttons'>LogOut</button>

        </div>
      ) : (
      <div>
      <Register  />
      <Login />
 



      </div>
      )}
    </div>
  );
};

export default User;