import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@mui/material";
import { Typography, Button, Collapse, Divider, Box } from "@mui/material";
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
  const [expandedOrder, setExpandedOrder] = useState(null);

  const handleToggle = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

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
  <div className="user-details-container">
  <Typography variant="h4" gutterBottom>Welcome!</Typography>
  <Typography>Email: {email}</Typography>

  <Typography variant="h5" sx={{ mt: 3 }}>Order History:</Typography>

  {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
 <Card key={order.OrderId} variant="outlined" sx={{ my: 2,  width: "70%",  }}>
 <CardContent>
   <Box
     display="flex"
     justifyContent="space-between"
     alignItems="flex-start"
     flexWrap="wrap"
     gap={2}
   >
     <Box>
       <Typography variant="subtitle1" fontWeight="bold">
         {order.Status === "Cancelled"
           ? "Cancelled Item(s)"
           : `Order Created ${format(new Date(order.Date), "EEE, d MMM yyyy")}`}
       </Typography>
       <Typography variant="body2" color="text.secondary">
         Status: {order.Status}
       </Typography>

       <Typography variant="body2" color="text.secondary" sx={{ fontStyle: "italic" }}>
        NB: Orders take 30–45 minutes to arrive!.
      </Typography>
       <Typography variant="body2" color="text.secondary" >
         Order ID: {order.OrderId}
       </Typography>
     </Box>

     <Button variant="outlined" onClick={() => handleToggle(order.OrderId)} sx={{ mt: 1 }}>
       {expandedOrder === order.OrderId ? "Hide Details" : "Order Details"}
     </Button>
   </Box>

   <Collapse in={expandedOrder === order.OrderId}>
   <Divider sx={{ my: 2 }} />
<Typography variant="subtitle2" fontWeight="medium" gutterBottom>
  Order Items:
</Typography>
<Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
  {order.Items.split(",").map((item, idx) => (
    <Typography
      key={idx}
      variant="body2"
      sx={{
        backgroundColor: "#f1f1f1",
        px: 1.5,
        py: 0.5,
        borderRadius: 1,
        maxWidth: "100%",
        wordBreak: "break-word",
      }}
    >
      {item.trim()}
    </Typography>
  ))}

</Box>

   </Collapse>
 </CardContent>
</Card>
  ))}

  <Box mt={3}>
    <Button variant="contained" color="error" onClick={handleLogout}>
      Log Out
    </Button>
  </Box>
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