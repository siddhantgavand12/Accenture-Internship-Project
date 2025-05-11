import { useState } from "react";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/add-product" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
