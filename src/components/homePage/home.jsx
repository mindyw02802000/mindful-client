
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/home.css';
import { Link } from 'react-router-dom';
import { Nivut } from '../homePage/nivut';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { LogoutButton } from '../logIn/LogoutButton';


export const Home = () => {
  const navigate = useNavigate();
  const school = useSelector(state => state.schoolsSlice.school);
  const eventDate = useSelector(state => state.schoolsSlice.dateOfEvent);
  const [greeting, setGreeting] = useState('');
  
  // יצירת ברכה מותאמת אישית בהתאם לשעה ביום
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
  
  // פורמט התאריך לתצוגה נוחה
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
      <Nivut />
      
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
          <h1 className="section-title hero-title">תלבושות יוקרתיות לכל אירוע</h1>
          <p className="hero-subtitle">השכרת תלבושות איכותיות להופעות, מסיבות ואירועים מיוחדים</p>
          <div className="hero-buttons">
            <Link to="/Model" className="hero-btn hero-btn-primary">צפייה בתלבושות</Link>
            <Link to="/katalog" className="hero-btn hero-btn-secondary">הקטלוגים שלנו</Link>
          </div>
        </div>
      </div>
      
      <section className="categories-section">
        <h2 className="section-title">הקטגוריות המובילות שלנו</h2>
        <div className="categories-grid">
          <div className="category-card" style={{backgroundImage: "url('/images/category-1.jpg')", backgroundSize: "cover"}}>
            <h3 className="category-title">תלבושות לאירועים</h3>
          </div>
          <div className="category-card" style={{backgroundImage: "url('/images/category-2.jpg')", backgroundSize: "cover"}}>
            <h3 className="category-title">תלבושות להופעות</h3>
          </div>
          <div className="category-card" style={{backgroundImage: "url('/images/category-3.jpg')", backgroundSize: "cover"}}>
            <h3 className="category-title">תלבושות למסיבות</h3>
          </div>
          <div className="category-card" style={{backgroundImage: "url('/images/category-4.jpg')", backgroundSize: "cover"}}>
            <h3 className="category-title">תלבושות לצילומים</h3>
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