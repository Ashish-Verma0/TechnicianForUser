import React from "react";
// import DatePicker from "./DatePicker";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { postFetchData } from "../api/Api";

const BookingModel = ({ hide, id }) => {
  const [startingDate, setStartingDate] = React.useState(null);
  const [endingDate, setEndingDate] = React.useState(null);

  const handleStartingDateChange = (date) => {
    setStartingDate(date);
    if (endingDate && date > endingDate) {
      setEndingDate(null);
    }
  };

  const handleEndingDateChange = (date) => {
    if (startingDate && date < startingDate) {
      return;
    }
    setEndingDate(date);
  };

  const data = {
    technicianId: id,
    startTime: startingDate?.toISOString(),
    endTime: endingDate?.toISOString(),
  };
  console.log(data);

  const bookingPostData = async () => {
    try {
      const res = await postFetchData(
        "http://localhost:8500/api/booking/create",
        data
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="modal" tabIndex={-1} style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Booking Technician</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => hide()}
            />
          </div>
          <div className="modal-body">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateTimePicker"]}>
                <DateTimePicker
                  label="Starting Date"
                  value={startingDate}
                  onChange={handleStartingDateChange}
                />
                <DateTimePicker
                  label="Ending Date"
                  value={endingDate}
                  onChange={handleEndingDateChange}
                  minDateTime={startingDate} // Ensure ending date cannot be earlier than starting date
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={bookingPostData}
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModel;
