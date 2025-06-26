import katalogImage1 from '../../assets/katalog1.png';
import katalogImage2 from '../../assets/katalog2.png';
import React from 'react';
import '../style/katalog.css';
import '../style/home.css';
// import { Orders } from './orders';
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { LogIn } from './logIn';
import { useNavigate } from 'react-router-dom';
// import { payment } from './payment';
import { Nivut } from '../homePage/nivut';

export const Katalog = () => {
   // const [dialog, setDialog] = useState(false);
   const navigate = useNavigate();
   
   const nivut = (num) => {
      // פונקציית ניווט שתוכל להוסיף לה לוגיקה בהמשך
   }
   
   // פונקציה לפתיחת קובץ PDF
   const openKatalog = () => {
      // אם ה-PDF נמצא בתיקיית public
      window.open("/katalog.pdf", "_blank");
   }
   
   const openKatalog2 = () => {
      // אם ה-PDF נמצא בתיקיית public
      window.open("/katalog2.pdf", "_blank");
   }
   
   return (
      <div className="katalog-page">
         <Nivut></Nivut>
         
         {/* Hero Section */}
         <div className="katalog-hero">
            <div className="katalog-hero-content">
               <h1 className="katalog-title">קטלוג המוצרים היוקרתי שלנו</h1>
               <p className="katalog-subtitle">
                  גלו את המגוון העשיר של המוצרים האיכותיים שלנו בקטלוגים המעוצבים. 
                  בחרו את השנה המתאימה לכם וצפו במבחר המוצרים המובילים בתחום, עם מפרטים מלאים ותמונות איכותיות.
               </p>
            </div>
         </div>
         
         {/* Katalog Cards Container */}
         <div className="katalog-container">
            <div className="katalog-card">
               <div className="katalog-image">
               <img src={katalogImage1} alt="קטלוג 2020" />
    
                  <div className="katalog-year">2020</div>
               </div>
               <div className="katalog-content">
                  <h3>קטלוג מוצרים פרימיום 2020</h3>
                  <p>
                     הקטלוג המקיף שלנו לשנת 2020 מציג את קולקציית המוצרים היוקרתית, 
                     כולל פריטים בלעדיים, מחירים עדכניים ומפרטים טכניים מלאים.
                  </p>
                  <button className="katalog-button" onClick={openKatalog}>
                     <i className="fas fa-file-pdf"></i> צפייה בקטלוג 2020
                  </button>
               </div>
            </div>
            
            <div className="katalog-card">
               <div className="katalog-image">
                  <img src={katalogImage2} alt="קטלוג 2022" />
                  <div className="katalog-year">2022</div>
               </div>
               <div className="katalog-content">
                  <h3>קטלוג מוצרים פרימיום 2022</h3>
                  <p>
                     הקטלוג החדש והמעודכן לשנת 2022 מציג את הדגמים החדשניים ביותר, 
                     עם טכנולוגיות מתקדמות, עיצובים חדשים ומבצעים מיוחדים.
                  </p>
                  <button className="katalog-button" onClick={openKatalog2}>
                     <i className="fas fa-file-pdf"></i> צפייה בקטלוג 2022
                  </button>
               </div>
            </div>
         </div>
         
         {/* Features Section */}
         <div className="katalog-features">
            <h2 className="features-title">יתרונות הקטלוג שלנו</h2>
            
            <div className="features-grid">
               <div className="feature-item">
                  <div className="feature-icon">
                     <i className="fas fa-camera"></i>
                  </div>
                  <h3 className="feature-title">תמונות איכותיות</h3>
                  <p className="feature-desc">
                     כל מוצר מוצג עם תמונות באיכות גבוהה המציגות את כל הפרטים החשובים.
                  </p>
               </div>
               
               <div className="feature-item">
                  <div className="feature-icon">
                     <i className="fas fa-info-circle"></i>
                  </div>
                  <h3 className="feature-title">מפרט טכני מלא</h3>
                  <p className="feature-desc">
                     מידע מקיף על כל מוצר, כולל מידות, חומרים, צבעים ואפשרויות התאמה אישית.
                  </p>
               </div>
               
               <div className="feature-item">
                  <div className="feature-icon">
                     <i className="fas fa-tags"></i>
                  </div>
                  <h3 className="feature-title">מחירים עדכניים</h3>
                  <p className="feature-desc">
                     מחירון מעודכן לכל המוצרים, כולל מבצעים מיוחדים והנחות כמות.
                  </p>
               </div>
               
               <div className="feature-item">
                  <div className="feature-icon">
                     <i className="fas fa-truck"></i>
                  </div>
                  <h3 className="feature-title">מידע על משלוחים</h3>
                  <p className="feature-desc">
                     פרטים מלאים על אפשרויות המשלוח, זמני אספקה ותנאי אחריות.
                  </p>
               </div>
            </div>
         </div>
         
         {/* Call to Action */}
         <div className="katalog-cta">
            <h2>לא מצאתם את מה שחיפשתם?</h2>
            <p>
               צוות המכירות שלנו ישמח לעזור לכם למצוא את המוצרים המתאימים ביותר לצרכים שלכם.
               צרו קשר עוד היום לקבלת ייעוץ אישי.
            </p>
            <button className="katalog-button" onClick={() => navigate('/contact')}>
               <i className="fas fa-phone"></i> צרו קשר עכשיו
            </button>
            <i> 0527668484  כל הזכויות שמורות 0548578868</i>
         </div>
      </div>
   );
}