import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'tippy.js/dist/tippy.css'; 
import HomePage from './components/pages/HomePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <Router>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
    </>
  );
}

export default App;
