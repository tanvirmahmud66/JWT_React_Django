import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import AuthContext, { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";

function App() {
  const {user} = useContext(AuthContext)
  if(user){
    console.log(user)
  }
  
  return (
    <Router>
      <div className="App">
        {/* <AuthProvider> */}
          <Header/>  
          <Routes>
            
            <Route element={user? <HomePage/> : <Navigate to="/login"/>} path="/"/>
            <Route Component={LoginPage} path="/login"/>
            
          </Routes>
        {/* </AuthProvider> */}
      </div>
    </Router>
  );
}

export default App;
