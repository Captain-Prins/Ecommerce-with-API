import { useState } from 'react'
import { Homepage } from './Pages/Homepage';
import { CheckoutPage } from './Pages/CheckoutPage';
import {OrdersPage} from './Pages/OrdersPage';
import {TrackingPage} from './Pages/TrackingPage';
import { NotFound } from './Pages/NotFound';
import { Routes, Route } from 'react-router'  
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="checkout" element={<CheckoutPage />} />
      <Route path="order" element={<OrdersPage />} />
      <Route path="tracking" element={<TrackingPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
