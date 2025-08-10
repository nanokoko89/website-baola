import React, { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { addMonths, isSameDay, endOfMonth } from "date-fns";
import classNames from "classnames/bind";
import styles from "./Book.module.scss";
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

const formatFullDate = (date) => {
  const dayNames = [
    "Chủ Nhật",
    "Thứ 2",
    "Thứ 3",
    "Thứ 4",
    "Thứ 5",
    "Thứ 6",
    "Thứ 7",
  ];
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
  return `${dayNames[date.getDay()]}, Ngày ${date.getDate()} ${
    monthNames[date.getMonth()]
  }`;
};

const Book = () => {
  const today = new Date();
  const [step, setStep] = useState("date");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  console.log("today:", today);

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    setStep("result");
  };

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

  // Define available times based on the selected date
  const getAvailableTimesForDate = (date) => {
    const defaultTimes = [
      { time: "9:30", available: false },
      { time: "10:00", available: false },
      { time: "10:30", available: true },
      { time: "11:00", available: true },
      { time: "11:30", available: true },
      { time: "14:00", available: true },
    ];

    if (date.getDate() % 2 === 0) {
      return [
        { time: "9:00", available: true },
        { time: "9:30", available: true },
        { time: "10:00", available: false },
        { time: "13:30", available: true },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
        { time: "9:00", available: true },
        { time: "9:30", available: true },
        { time: "10:00", available: false },
        { time: "13:30", available: true },
        { time: "14:00", available: true },
        { time: "15:00", available: true },
      ];
    }

    return defaultTimes;
  };

  const [availableTimes, setAvailableTimes] = useState(
    getAvailableTimesForDate(selectedDate)
  );

  // Handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setAvailableTimes(getAvailableTimesForDate(date));
    setStep("time");
  };

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

  const formattedSelectedDate = formatFullDate(selectedDate);

  return (
    <div className={cx("calendar-section")}>
      {step === "date" && (
        <div className={cx("date-container")}>
          <h2 className={cx("section-title")}>Chọn ngày và giờ</h2>
          <div className={cx("date-time-selection")}>
            <div className={cx("date-picker-wrapper")}>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                onMonthChange={(date) => setCurrentMonth(date)}
                renderCustomHeader={renderCustomHeader}
                inline
                locale="vi"
                weekDayFormat={(day) => {
                  const labels = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
                  return labels[day.getDay()];
                }}
                calendarClassName={cx("custom-calendar")}
                filterDate={filterDate}
                maxDate={endOfMonth(addMonths(today, 1))}
                minDate={today}
                dayClassName={(date) =>
                  isDateAvailable(date)
                    ? cx("available-day")
                    : cx("unavailable-day")
                }
              />
            </div>
          </div>
        </div>
      )}
      {step === "time" && (
        <div className={cx("hour-container")}>
          <div className={cx("date-display")}>
            <span>{formattedSelectedDate}</span>
          </div>
          <div className={cx("time-slots")}>
            {availableTimes.map((slot, idx) => (
              <div key={idx} className={cx("time-slot-wrapper")}>
                <button
                  className={cx("time-slot", {
                    available: slot.available,
                    selected: selectedTime === slot.time,
                  })}
                  onClick={() => slot.available && handleTimeClick(slot.time)}
                  disabled={!slot.available}
                >
                  {slot.available && <div className={cx("dot")}></div>}
                  {slot.time}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {step === "result" && (
        <div className={cx("result-container")}>
          <span>
            {formattedSelectedDate} - {selectedTime}
          </span>
        </div>
      )}
    </div>
  );
};

export default Book;
