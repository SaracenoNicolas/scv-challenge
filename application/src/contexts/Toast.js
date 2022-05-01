import React, { createContext, useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [showToast, setShowToast] = useState(false);
  const [toastOptions, setToastOptions] = useState({
    variant: '',
    header: '',
    body: ''
  });

  useEffect(() => {
  }, []);

  return (
    <ToastContext.Provider
      value={{
        setToastOptions,
        setShowToast
      }}
    >
      <ToastContainer position="top-end">
        <Toast onClose={() => setShowToast(false)} bg={toastOptions.variant} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong>{toastOptions.header}</strong>
          </Toast.Header>
          <Toast.Body>
            {toastOptions.body}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      {children}
    </ToastContext.Provider>
  );
}