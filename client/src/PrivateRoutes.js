import React, { useState, useEffect } from "react"
import { useAuth } from "./contexts/AuthContext"
import {Outlet} from 'react-router'
import Login from "./components/login/Login"

export default function PrivateRoutes() {
  const {checkAuth, currentUser} = useAuth();
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    async function check(){
      await checkAuth();
      setLoading(false);
    }
    check();
  }, [])
  

return currentUser ? <Outlet/> : (loading ? 'loading...' : <Login />);
}