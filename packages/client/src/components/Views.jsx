import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login, Register } from './Login';

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default Views;
