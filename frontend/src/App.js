
// // export default App;

// import React, { useState } from 'react';
// import './App.css';
// import Postimg from './Components/Home/Postimg';
// import Admin from './Components/Admin/admin';
// import Main from './Components/Home/mainpage';
// import Openpage from './Components/Home/openingpage';
// import UserSignUp from './Components/Home/usersignup';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import UserSignin from './Components/Home/usersignin';
// import Profile from './Components/Home/profilepage';
// import PrivateRoute from './Components/Home/PrivateRoute';
// import SellerSignup from './Components/Home/SellerSignup';
// import SellerSignin from './Components/Home/SellerSignin';
// import Seller from './Components/Home/sellerpage';
// import Chatbox from './Components/Home/chatbox';



// function App() {
  
//   const [authenticated, setAuthenticated] = useState(false);
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [sellerAuthenticated, setSellerAuthenticated] = useState(false);

//   const handleLogin = () => {
//     const validUsers = [
//       { username: '11', password: '11' },
//       { username: 'deepika', password: 'deepu@132' }
//     ];
//     const isValidUser = validUsers.some(user => user.username === username && user.password === password);
//     if (isValidUser) {
//       setAuthenticated(true);
//     } else {
//       alert('Invalid username or password');
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path='/' element={<Openpage />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/usersignup" element={<UserSignUp />} />
//         <Route path="/usersignin" element={<UserSignin setAuthenticated={setAuthenticated} />} />
//         <Route path='/admin' element={authenticated ? <Admin /> : (
//           <div className='ramya6'>
//           <div className='lavanya6'>
//             <h2>Admin Authentication</h2>
           
//             <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        
//             <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//             <button onClick={handleLogin}>Login</button>
//           </div>
//           </div>
//         )} />
//         <Route path='/*' element={<Navigate to="/admin" />} />
//         <Route path="/SellerSignup" element={<SellerSignup />} />
//         <Route path="/SellerSignin" element={<SellerSignin setAuthenticated={setSellerAuthenticated} />} />
       
//         <Route path="/sellersignin/sellerpage" element={
//           <PrivateRoute authenticated={sellerAuthenticated} redirectPath="/SellerSignin">
//             <Seller />
//           </PrivateRoute>
//         } />
//         <Route path="/postimg" element={
//           <PrivateRoute authenticated={sellerAuthenticated} redirectPath="/SellerSignin">
//             <Postimg />
//           </PrivateRoute>
//         } />
//         <Route path='/mainpage/*' element={<PrivateRoute authenticated={authenticated}><Main /></PrivateRoute>} />
//         <Route path='/mainpage/chatbox' element={<PrivateRoute authenticated={authenticated}><Chatbox /></PrivateRoute>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Postimg from './Components/Home/Postimg';
import Admin from './Components/Admin/admin';
import Main from './Components/Home/mainpage';
import Openpage from './Components/Home/openingpage';
import UserSignUp from './Components/Home/usersignup';
import UserSignin from './Components/Home/usersignin';
import Profile from './Components/Home/profilepage';
import PrivateRoute from './Components/Home/PrivateRoute';
import SellerSignup from './Components/Home/SellerSignup';
import SellerSignin from './Components/Home/SellerSignin';
import Seller from './Components/Home/sellerpage';
import Chatbox from './Components/Home/chatbox';

function App() {
  const [authenticated, setAuthenticated] = useState(sessionStorage.getItem('authenticated') === 'true');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [sellerAuthenticated, setSellerAuthenticated] = useState(sessionStorage.getItem('sellerAuthenticated') === 'true');

  useEffect(() => {
    sessionStorage.setItem('authenticated', authenticated);
    sessionStorage.setItem('sellerAuthenticated', sellerAuthenticated);
  }, [authenticated, sellerAuthenticated]);

  const handleLogin = () => {
    const validUsers = [
      { username: '11', password: '11' },
      { username: 'deepika', password: 'deepu@132' }
    ];
    const isValidUser = validUsers.some(user => user.username === username && user.password === password);
    if (isValidUser) {
      setAuthenticated(true);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Openpage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/usersignin" element={<UserSignin setAuthenticated={setAuthenticated} />} />
        <Route path='/admin' element={authenticated ? <Admin /> : (
          <div className='ramya6'>
            <div className='lavanya6'>
              <h2>Admin Authentication</h2>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button onClick={handleLogin}>Login</button>
            </div>
          </div>
        )} />
        {/* <Route path='/*' element={<Navigate to="/admin" />} /> */}
        <Route path="/SellerSignup" element={<SellerSignup />} />
        <Route path="/SellerSignin" element={<SellerSignin setAuthenticated={setSellerAuthenticated} />} />
        <Route path="/sellersignin/sellerpage" element={
          <PrivateRoute authenticated={sellerAuthenticated} redirectPath="/SellerSignin">
            <Seller />
          </PrivateRoute>
        } />
        <Route path="/postimg" element={
          <PrivateRoute authenticated={sellerAuthenticated} redirectPath="/SellerSignin">
            <Postimg />
          </PrivateRoute>
        } />
        <Route path='/mainpage/*' element={<PrivateRoute authenticated={authenticated}><Main /></PrivateRoute>} />
        <Route path='/mainpage/chatbox' element={<PrivateRoute authenticated={authenticated}><Chatbox /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
