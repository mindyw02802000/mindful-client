
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/home.css'
// import { Orders } from './orders';
import { Link } from 'react-router-dom';
import { Maneger } from './manegar';
import { useSelector } from 'react-redux';
import { LogoutButton } from '../logIn/LogoutButton';
import { useEffect, useState } from 'react';

export const HomeManeger = () => {
    const eventDate = useSelector(state => state.schoolsSlice.eventDate);
    const school = useSelector(state => state.schoolsSlice.school);
    const [greeting, setGreeting] = useState('');
   
    const navigate = useNavigate();
    useEffect(() => {
        const hour = new Date().getHours();
        let timeGreeting = '';
        
        if (hour >= 5 && hour < 12) {
          timeGreeting = 'בוקר טוב';
        } else if (hour >= 12 && hour < 18) {
          timeGreeting = 'צהריים טובים';
        } else if (hour >= 18 && hour < 22) {
          timeGreeting = 'ערב טוב';
        } else {
          timeGreeting = 'לילה טוב';
        }
        
        setGreeting(timeGreeting);
        
        // אם אין משתמש מחובר, ננווט לדף ההתחברות
        if (!school || !school.name) {
          navigate('/login');
        }
      }, [school, navigate]);

      const formatDate = (dateString) => {
        if (!dateString) return '';
        
        const date = new Date(dateString);
        return date.toLocaleDateString('he-IL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };

       // אם אין משתמש מחובר, לא נציג את התוכן
  if (!school || !school.name) {
    return null;
  }
      return (
    <div className="home-container">
      <Maneger></Maneger>
      {/* <LogoutButton />הוספת כפתור ההתנתקות */}

       {/* הוספת באנר ברכה למשתמש */}
       <div className="welcome-banner">
        <div className="welcome-content">
          <h2 className="welcome-title">{greeting}, {school.name}!</h2>
          {eventDate && (
            <p className="welcome-subtitle">
              האירוע שלך מתוכנן לתאריך: <span className="highlight-date">{formatDate(eventDate)}</span>
            </p>
          )}
        </div>
      </div>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">ניהול תלבושות</h1>
          <p className="hero-subtitle">ברוכים הבאים למערכת הניהול - כאן תוכלו לנהל את מלאי התלבושות וההזמנות</p>
          <div className="hero-buttons">
            <Link to="/ManageModels" className="hero-btn hero-btn-primary">ניהול תלבושות</Link>
            <Link to="/Orders" className="hero-btn hero-btn-secondary">צפייה בהזמנות</Link>
          </div>
        </div>
      </div>
      
      <section className="categories-section">
        <h2 className="section-title">סטטיסטיקות מערכת</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-tshirt"></i>
            </div>
            <div className="stat-number">120</div>
            <div className="stat-title">תלבושות במלאי</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-number">45</div>
            <div className="stat-title">הזמנות פעילות</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <div className="stat-number">250</div>
            <div className="stat-title">לקוחות רשומים</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-star"></i>
            </div>
            <div className="stat-number">4.8</div>
            <div className="stat-title">דירוג ממוצע</div>
          </div>
        </div>
      </section>
      
      <img className='logo' src="logo100.png" alt="לוגו האתר" />
       {/* כפתור התנתקות בתחתית הדף */}
       <div className="footer-logout">
        <LogoutButton />
      </div>
    </div>
  );
}