
import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../style/calendar.css';
import { useNavigate } from "react-router-dom";
import { ShowDetailingOrder } from "../orders/showDetailingOrder";
import { getDetailingOrdersThunk } from "../../redux/slices/getDetailingOrderThunk";
import { getOrdersThunk } from "../../redux/slices/getOrderThunk";
import { Nivut } from "../homePage/nivut";
import { Maneger } from "../homePage/manegar";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month'); // 'month' or 'week'
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
   const [thisOrder,setThisOrder]=useState(null)

  const orders = useSelector(state => state.orderSlice.orders);
  const detailingO = useSelector(state => state.orderSlice.detailingOrders);
  const schoolName = useSelector(state => state.schoolsSlice.school.name);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dayNames = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const monthNamesHe = ["תשרי", "חשוון", "כסלו", "טבת", "שבט", "אדר", "ניסן", "אייר", "סיוון", "תמוז", "אב", "אלול"];

  const formatHebrewDate = (gregDate) => {
    try {
      return new Intl.DateTimeFormat('he-IL-u-ca-hebrew', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(gregDate);
    } catch {
      return gregDate.toLocaleDateString();
    }
  };

  const getOrders = async () => {
    await dispatch(getOrdersThunk());
  };

  const showEventDetails = async (id) => {
    await dispatch(getDetailingOrdersThunk(id));
    setSelectedEventId(id);
    setShowEventModal(true);
  };

  const closeEventModal = () => {
    setShowEventModal(false);
    setSelectedEventId(null);
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const generateMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();

    const daysFromPrevMonth = firstDayOfWeek;
    const totalDays = daysFromPrevMonth + lastDay.getDate();
    const daysFromNextMonth = 7 - (totalDays % 7 || 7);

    const allDays = [];

    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();

    for (let i = prevMonthDays - daysFromPrevMonth + 1; i <= prevMonthDays; i++) {
      allDays.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    const today = new Date();
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      allDays.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString()
      });
    }

    for (let i = 1; i <= daysFromNextMonth; i++) {
      allDays.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        isToday: false
      });
    }

    return allDays;
  };

  const getEventsForDate = (date) => {
    if (!orders || orders.length === 0) return [];
    return orders.filter(order => {
      const orderDate = new Date(order.dateOfEvent);
      return orderDate.toDateString() === date.toDateString();
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="main">
      {schoolName === "maneger" ? <Maneger /> : <Nivut />}

      <div className="calendar-container" aria-label="לוח שנה">
        <div className="calendar-header">
          <div className="calendar-title" aria-live="polite" aria-atomic="true">
            {view === 'month'
              ? `${monthNamesHe[currentDate.getMonth()]} ${currentDate.getFullYear()}`
              : `שבוע ${Math.ceil(currentDate.getDate() / 7)} - ${monthNamesHe[currentDate.getMonth()]} ${currentDate.getFullYear()}`
            }
          </div>
          <div className="calendar-nav" role="navigation" aria-label="ניווט בלוח שנה">
            <button className="calendar-nav-btn" aria-label="חודש קודם" onClick={goToPrevious}>▶</button>
            <button className="calendar-today-btn" aria-label="היום" onClick={goToToday}>היום</button>
            <button className="calendar-nav-btn" aria-label="חודש הבא" onClick={goToNext}>◀</button>

          </div>
        </div>

        <div className="calendar-view-toggle" role="radiogroup" aria-label="בחירת תצוגת לוח שנה">
          <button
            className={`view-btn ${view === 'month' ? 'active' : ''}`}
            onClick={() => setView('month')}
            role="radio"
            aria-checked={view === 'month'}
            tabIndex={view === 'month' ? 0 : -1}
          >
            חודשי
          </button>
          <button
            className={`view-btn ${view === 'week' ? 'active' : ''}`}
            onClick={() => setView('week')}
            role="radio"
            aria-checked={view === 'week'}
            tabIndex={view === 'week' ? 0 : -1}
          >
            שבועי
          </button>
        </div>

        {view === 'month' ? (
          <>
            <div className="calendar-days-header" role="row">
              {dayNames.map((day, index) => (
                <div key={index} className="day-name" role="columnheader">{day}</div>
              ))}
            </div>

            <div className="calendar-month-grid" role="grid" aria-label="תצוגת חודש">
              {generateMonthDays().map((day, index) => (
                <div
                  key={index}
                  className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''}`}
                  role="gridcell"
                  tabIndex={day.isToday ? 0 : -1}
                  aria-selected={day.isToday}
                >
                  <div className="day-number">{day.date.getDate()}</div>

                  <div className="events-container" aria-label={`אירועים בתאריך ${formatHebrewDate(day.date)}`}>
                    {getEventsForDate(day.date).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`event event-${eventIndex % 3 === 0 ? 'blue' : eventIndex % 3 === 1 ? 'green' : 'orange'}`}
                        onClick={() => showEventDetails(event.idOrder)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            showEventDetails(event.idOrder);
                          }
                        }}
                        aria-label={`אירוע: ${event.title || 'אירוע'} בתאריך ${formatHebrewDate(day.date)}`}
                      >
                        {event.title || 'אירוע'}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // תצוגת שבוע - ניתן לשדרג בדומה אם תרצה
          <div>תצוגת שבוע - לא מעודכנת כרגע</div>
        )}

      </div>

      {/* מודאל פרטי אירוע */}
      {showEventModal && (
        <div className="event-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
            <div className="event-modal-details">
              <ShowDetailingOrder detailingOrders={detailingO} setd={setShowEventModal} />
            </div>

        </div>
      )}
    </div>
  );
};
