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
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { format } from "date-fns";
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
        <input className="loginput" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label  className="loglabel" >
        Password:
        <input  className="loginput" required type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label   >
      <label  className="loglabel" >
        Phone number:
        <input   className="loginput" required type="tel" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
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
        required
        placeholder="Email"
        className="btn-container loginput"
       
      /><br></br>
      <input
        type="password"
        value={password}
        required
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
  const [userDetails, setUserDetails] = useState([]);
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

    fetchOrders()
    
  



  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('isAuthenticated', 'false');
    localStorage.removeItem("email");
    window.location.reload();
  }
  
  const fetchOrders = async () => {
    try {
      const response = await axios.post("https://grocerygo.co.za/api/orders");

      setUserDetails(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching grocery data", error);
      throw error; // Propagate the error so that it can be handled elsewhere
    }
  };
  const orders = userDetails.filter((order) => order.Email === email).reverse();
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    
      <div>
      {isAuthenticated ? (
        <div className='user-details-container'>
          <h1  className="userhd" >Welcome!</h1>
          <p>Email: {email} </p>

          <h2>Order History:</h2>
          <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell sx={{ minWidth: 100, maxWidth: 200 }}>Order ID</TableCell>
<TableCell sx={{ minWidth: 150, maxWidth: 250 }}>Date</TableCell>
<TableCell sx={{ minWidth: 200, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Items</TableCell>
<TableCell sx={{ minWidth: 100, maxWidth: 200 }}>Status</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
            <TableRow key={order.OrderId}>
              <TableCell>{order.OrderId}</TableCell>
              <TableCell>{format(new Date(order.Date), "dd MMM yyyy HH:mm:ss")}</TableCell>
              <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {order.Items}
              </TableCell>
              <TableCell>{order.Status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>

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