/* File: src/components/AvailabilityTimeComponent.jsx */
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import NumberLabel from "../../common/NumberLabel";
import MeetingProviderSelect from "../../common/MeetingProviderSelect";
import TimeZoneSelect from "../../common/TimeZoneSelect";
import Select from "../../common/Select";
import MaxAttendeesInput from "../../common/MaxAttendeesInput";
import MeetingBreakSettings from "../../common/MeetingBreakSettings";
import InNext from "../../common/InNext";
import TimeAvailability from "../../common/TimeAvailability";
import ActionButtons from "../../common/ActionButtons";

import {
  setAvailablePlace,
  setAvailableTimeZone,
  setAvailableDuration,
  setAvailableMaxAttendees,
  setPreventTime,
  setBreakBeforeMeeting,
  setBreakAfterMeeting,
  setAvailableSlots,
  setInNext,
} from "../../../store/newCoachingCallSlice";

export default function AvailabilityTimeComponent({ handlePublish }) {
  const dispatch = useDispatch();
  const {
    place,
    timeZone,
    time,
    maxAttendees,
    preventTime,
    breakBeforeMeeting,
    breakAfterMeeting,
    inNext,
    slots,
  } = useSelector((state) => state.coachingCall.availableTime);

  return (
    <div>
      <NumberLabel number="1" label="Định cấu hình" />

      <MeetingProviderSelect
        value={place}
        onChange={(value) => dispatch(setAvailablePlace(value))}
        width="100%"
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "32px 0",
        }}
      >
        <TimeZoneSelect
          value={timeZone}
          onChange={(value) => dispatch(setAvailableTimeZone(value))}
          width="65%"
        />
        <Select
          value={time}
          onChange={(value) => dispatch(setAvailableDuration(value))}
          width="30%"
        />
      </div>

      <MaxAttendeesInput
        label="Số người tham gia tối đa"
        value={maxAttendees}
        onChange={(value) => dispatch(setAvailableMaxAttendees(value))}
        suffix="Người"
      />

      <MeetingBreakSettings
        preventTime={preventTime}
        breakBefore={breakBeforeMeeting}
        breakAfter={breakAfterMeeting}
        onPreventTimeChange={(v) => dispatch(setPreventTime(v))}
        onBreakBeforeChange={(v) => dispatch(setBreakBeforeMeeting(v))}
        onBreakAfterChange={(v) => dispatch(setBreakAfterMeeting(v))}
      />

      <InNext
        label="Có thể đặt lịch trong vòng"
        value={inNext}
        onChange={(value) => dispatch(setInNext(value))}
        suffix="Ngày"
      />

      <TimeAvailability
        slots={slots}
        onChangeSlots={(v) => dispatch(setAvailableSlots(v))}
      />

      <ActionButtons title="Xuất bản" handleBtn={handlePublish} />
    </div>
  );
}
