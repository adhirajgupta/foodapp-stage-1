import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

export const NotFound = () => {
  // You can customize the redirect behavior here
  // In this example, it redirects to the home page
  return <Navigate to="/" />;
};