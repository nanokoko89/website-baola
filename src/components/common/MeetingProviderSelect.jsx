import CustomSelect from "./CustomSelect";
import googleMeetIcon from "../../assets/icons/google-meet.svg";
import zoomIcon from "../../assets/icons/zoom.svg";
import customIcon from "../../assets/icons/custom.svg";

const options = [
  { value: "google_meet", label: "Google Meet", icon: googleMeetIcon },
  { value: "zoom_meeting", label: "Zoom Meeting", icon: zoomIcon },
  { value: "custom_location", label: "Tự chọn địa điểm", icon: customIcon },
];

export default function MeetingProviderSelect({ value, onChange, width }) {
  return (
    <CustomSelect
      options={options}
      value={value}
      onChange={onChange}
      labelText="Nơi thực hiện"
      width={width}
    />
  );
}
