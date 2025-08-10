import React, { useState } from "react";
import PickStyle from "../../common/PickStyle";
import PasteURL from "../../common/PasteURL";
import SelectImage from "../../common/SelectImage";
import ActionButtons from "../../common/ActionButtons";
import TimeAvailability from "../../common/TimeAvailability";
import Select from "../../common/Select";
import MeetingProviderSelect from "../../common/MeetingProviderSelect";
import TimeZoneSelect from "../../common/TimeZoneSelect";
import MaxAttendeesInput from "../../common/MaxAttendeesInput";
import MeetingBreakSettings from "../../common/MeetingBreakSettings";

function index() {
  const [meetingProvider, setMeetingProvider] = useState("default");
  const [timeZone, setTimeZone] = useState("UTC+7");
  const [maxAttendees, setMaxAttendees] = useState(1);
  const [maxHours, setMaxHours] = useState(12);

  return (
    <div>
      <PickStyle />
      <div style={{ marginBottom: "32px" }}>
        <MeetingProviderSelect
          defaultValue={meetingProvider}
          onChange={(val) => {
            setMeetingProvider(val);
          }}
        />
      </div>

      <div style={{ marginBottom: "32px" }}>
        <TimeZoneSelect
          defaultValue={timeZone}
          onChange={(val) => {
            setTimeZone(val);
          }}
        />
      </div>
      <div style={{ maxWidth: "400px" }}>
        <MaxAttendeesInput
          label="Số ngwòi tham gia tối đa"
          description="Host a group call by letting 1+ attendees join the meeting."
          value={maxAttendees}
          onChange={(val) => {
            // Nếu val là chuỗi rỗng (user xoá hết), ta set thành 0 hoặc 1 tuỳ ý.
            const finalVal = val === "" ? "" : val;
            setMaxAttendees(finalVal);
          }}
          suffix="Người tham gia"
          placeholder="Nhập số người..."
          min={1}
          max={24}
        />
      </div>

      <div style={{ maxWidth: "400px" }}>
        <MaxAttendeesInput
          label="Ngăn chặn đặt chỗ trong vòng X giờ kể từ thời điểm hiện tại"
          description=""
          value={maxHours}
          onChange={(val) => {
            // Nếu val là chuỗi rỗng (user xoá hết), ta set thành 0 hoặc 1 tuỳ ý.
            const finalVal = val === "" ? "" : val;
            setMaxAttendees(finalVal);
          }}
          suffix="Giờ"
          placeholder="Nhập số giờ..."
          min={1}
          max={100}
        />
      </div>
      <div style={{ maxWidth: "800px" }}>
        <MeetingBreakSettings />
      </div>
      <Select />
      <PasteURL />
      <SelectImage />
      <TimeAvailability />
      <ActionButtons />
    </div>
  );
}

export default index;
