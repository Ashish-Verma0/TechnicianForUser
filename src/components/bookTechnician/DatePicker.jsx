import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { postFetchData } from "../api/Api";

export default function DatePicker({ id }) {
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
  );
}
