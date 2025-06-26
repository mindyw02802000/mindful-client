import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoggedOut, resetUser } from '../../redux/slices/schoolsSlice';
import '../style/LogoutButton.css';

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // סימון שהמשתמש התנתק
    dispatch(setLoggedOut(true));
    
    // איפוס נתוני המשתמש
    dispatch(resetUser());
    
    // ניווט לדף ההתחברות
    navigate('/login');
  };
  
  return (
    <button className="logout-button" onClick={handleLogout}>
      <i className="fas fa-sign-out-alt"></i> התנתק->
    </button>
  );
};