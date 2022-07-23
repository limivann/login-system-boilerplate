import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from './Login';
import PrivateRoutes from './PrivateRoutes';

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<div>HELLO</div>} />
      </Route>
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default Views;
