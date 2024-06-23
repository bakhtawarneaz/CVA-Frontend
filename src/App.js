import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/layout';
// import { RequireAuth } from './layouts/RequireAuth';
import {RequireAuth} from './layouts/RequireAuth';
import Login from "./pages/unAuthorized/login/Login";
import Organizations from "./pages/authorized/organizations/Organizations";
import Brands from "./pages/authorized/brands/Brands";
import User from "./pages/authorized/user/User";


const App = () => {

  const { isAuthenticated, token } = useSelector((state) => state.authSlice);

  return (
    <Suspense fallback={null}>
      {/* <Router /> */}

      <Routes>
          <Route path='/' element={<Layout />}>
              {/* public routes */}
              {!isAuthenticated && !token && (
                <>
                  <Route path='/login' element={<Login />} />
                </>
              )}
          

          {/* protected routes */}
          {isAuthenticated && token && (
            <Route element={<RequireAuth />}>
               <Route path="" element={<Home />} />
               <Route path="/organizations" element={<Organizations />} />
               <Route path="/brands" element={<Brands />} />
               <Route path="/user" element={<User />} />
            </Route>
          )}

          {/* Default route */}
          <Route path='*' element={<Navigate to={isAuthenticated && token ? '/' : '/login'} />} />
          </Route>
      </Routes>

    </Suspense>
  );
};

export default App;
