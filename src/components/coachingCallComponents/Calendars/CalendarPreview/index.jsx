import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { addMonths, isSameDay, endOfMonth } from "date-fns";
import classNames from "classnames/bind";
import styles from "./CalendarPreview.module.scss";
import "react-datepicker/dist/react-datepicker.css";

// React Icons
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import vi from "date-fns/locale/vi";

registerLocale("vi", vi);

const cx = classNames.bind(styles);

// Vietnamese localization functions
const formatMonthYear = (date) => {
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

const CalendarPreview = ({ color, dayColor, headerOnly = false }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  console.log("CalendarPreview==>", today);
  // Define available dates (from today to end of next month)
  const getAvailableDates = () => {
    const endDate = endOfMonth(addMonths(today, 1));
    const daysCount = Math.floor((endDate - today) / (24 * 60 * 60 * 1000)) + 1;

    return Array.from({ length: daysCount }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date;
    });
  };

  const availableDates = getAvailableDates();

  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => {
    // Không cập nhật state ở đây nữa
    return (
      <div className={cx("custom-header")}>
        <div className={cx("navigation")}>
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            className={cx("nav-button")}
          >
            <FiChevronLeft
              size={24}
              className={cx("nav-icon")}

              // color={prevMonthButtonDisabled ? "#444" : "#0360e6"}
            />
          </button>
          <span className={cx("month-year")}>{formatMonthYear(date)}</span>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            className={cx("nav-button")}
          >
            <FiChevronRight
              size={24}
              className={cx("nav-icon")}

              // color={nextMonthButtonDisabled ? "#444" : "#0360e6"}
            />
          </button>
        </div>
      </div>
    );
  };

  const isDateAvailable = (date) => {
    return availableDates.some((availableDate) =>
      isSameDay(availableDate, date)
    );
  };

  const filterDate = (date) => {
    return isDateAvailable(date);
  };

  const styleVars = {};
  if (color) styleVars["--template-color-primary"] = color;
  if (dayColor) styleVars["--calendar-day-text-color"] = dayColor;

  if (headerOnly) {
    const decreaseMonth = () =>
      setCurrentMonth((prev) => addMonths(prev, -1));
    const increaseMonth = () =>
      setCurrentMonth((prev) => addMonths(prev, 1));
    const prevMonthButtonDisabled =
      currentMonth.getMonth() === today.getMonth();
    const nextMonthButtonDisabled =
      currentMonth.getMonth() === addMonths(today, 1).getMonth();

    return (
      <div style={Object.keys(styleVars).length ? styleVars : undefined}>
        {renderCustomHeader({
          date: currentMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        })}
      </div>
    );
  }

  return (
    <div style={Object.keys(styleVars).length ? styleVars : undefined}>
      <DatePicker
        //   selected={selectedDate}
        //   onChange={handleDateChange}
        onMonthChange={(date) => setCurrentMonth(date)}
        renderCustomHeader={renderCustomHeader}
        inline
        locale="vi"
        fixedHeight
        weekDayFormat={(day) => {
          const labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
          return labels[day.getDay()];
        }}
        calendarClassName={cx("custom-calendar")}
        //   filterDate={filterDate}
        //   maxDate={endOfMonth(addMonths(today, 1))}
        //   minDate={today}
        //   dayClassName={(date) =>
        //     isDateAvailable(date) ? cx("available-day") : cx("unavailable-day")
        //   }
      />
    </div>
    // <DatePicker
    //   //   selected={selectedDate}
    //   //   onChange={handleDateChange}
    //   onMonthChange={(date) => setCurrentMonth(date)}
    //   renderCustomHeader={renderCustomHeader}
    //   inline
    //   locale="vi"
    //   fixedHeight
    //   weekDayFormat={(day) => {
    //     const labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    //     return labels[day.getDay()];
    //   }}
    //   calendarClassName={cx("custom-calendar")}
    //   //   filterDate={filterDate}
    //   //   maxDate={endOfMonth(addMonths(today, 1))}
    //   //   minDate={today}
    //   //   dayClassName={(date) =>
    //   //     isDateAvailable(date) ? cx("available-day") : cx("unavailable-day")
    //   //   }
    // />
  );
};

export default CalendarPreview;
