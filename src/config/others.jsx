// Import icon mạng xã hội
import instagram from "../assets/socials/instagram.svg";
import tiktok from "../assets/socials/tiktok.svg";
import behance from "../assets/socials/behance.svg";
import facebook from "../assets/socials/facebook.svg";
import linkedin from "../assets/socials/linkedin.svg";
import pinterest from "../assets/socials/pinterest.svg";
import snapchat from "../assets/socials/snapchat.svg";
import spotify from "../assets/socials/spotify.svg";
import whatsapp from "../assets/socials/whatsapp.svg";
import youtube from "../assets/socials/youtube.svg";
import vimeo from "../assets/socials/vimeo.svg";
import twitch from "../assets/socials/twitch.svg";
import discord from "../assets/socials/discord.svg";
import etsy from "../assets/socials/etsy.svg";
import podcast from "../assets/socials/podcast.svg";
import x from "../assets/socials/x.svg";
import link from "../assets/socials/link.svg";
import mail from "../assets/socials/mail.svg";

import Default from "../components/mystores/Themes/Default";
import Eclipse from "../components/mystores/Themes/Eclipse";
import Kels from "../components/mystores/Themes/Kels";
import Material from "../components/mystores/Themes/Material";
import Minima from "../components/mystores/Themes/Minima";
import Moderno from "../components/mystores/Themes/Moderno";
import NightView from "../components/mystores/Themes/NightView";
import Spotlight from "../components/mystores/Themes/Spotlight";
import Stone from "../components/mystores/Themes/Stone";
import Trish from "../components/mystores/Themes/Trish";
import Tyla from "../components/mystores/Themes/Tyla";

import DefaultPreview from "../components/mystores/ThemesPreview/Default";
import EclipsePreview from "../components/mystores/ThemesPreview/Eclipse";
import KelsPreview from "../components/mystores/ThemesPreview/Kels";
import MaterialPreview from "../components/mystores/ThemesPreview/Material";
import MinimaPreview from "../components/mystores/ThemesPreview/Minima";
import ModernoPreview from "../components/mystores/ThemesPreview/Moderno";
import NightViewPreview from "../components/mystores/ThemesPreview/NightView";
import SpotlightPreview from "../components/mystores/ThemesPreview/Spotlight";
import StonePreview from "../components/mystores/ThemesPreview/Stone";
import TrishPreview from "../components/mystores/ThemesPreview/Trish";
import TylaPreview from "../components/mystores/ThemesPreview/Tyla";

export const previewSlides = [
  {
    id: 1,
    title: "Default",
    Component: DefaultPreview,
  },
  {
    id: 2,
    title: "Moderno",
    Component: ModernoPreview,
  },

  {
    id: 3,
    title: "Kels",
    Component: KelsPreview,
  },
  {
    id: 4,
    title: "Material",
    Component: MaterialPreview,
  },
  {
    id: 5,
    title: "Minima",
    Component: MinimaPreview,
  },

  {
    id: 6,
    title: "NightView",
    Component: NightViewPreview,
  },
  {
    id: 7,
    title: "Spotlight",
    Component: SpotlightPreview,
  },
  {
    id: 8,
    title: "Stone",
    Component: StonePreview,
  },
  {
    id: 9,
    title: "Trish",
    Component: TrishPreview,
  },
  {
    id: 10,
    title: "Tyla",
    Component: TylaPreview,
  },

  {
    id: 11,
    title: "Eclipse",
    Component: EclipsePreview,
  },
];

export const slides = [
  {
    id: 1,
    title: "Default",
    label: "Tiêu Chuẩn",
    template: <Default />,
    colors: {
      primary: "#01685F",
      secondary: "#FFFFFF",
    },
  },
  {
    id: 2,
    title: "Moderno",
    label: "Hiện Đại",
    template: <Moderno />,
    colors: {
      primary: "#5383FF",
      secondary: "#FFFFFF",
    },
  },
  {
    id: 3,
    title: "Kels",
    label: "Kels",
    template: <Kels />,
    colors: {
      primary: "#FADCF0",
      secondary: "#DCE6FA",
    },
  },
  {
    id: 4,
    title: "Material",
    label: "Nguyên Sơ",
    template: <Material />,
    colors: {
      primary: "#FF66B2",
      secondary: "#FFEBFF",
    },
  },
  {
    id: 5,
    title: "Minima",
    label: "Tối Giản",
    template: <Minima />,
    colors: {
      primary: "#0037C4",
      secondary: "#FFFFFF",
    },
  },

  {
    id: 6,
    title: "NightView",
    label: "Màn Đêm",
    template: <NightView />,
    colors: {
      primary: "#00FFD1",
      secondary: "#000000",
    },
  },
  {
    id: 7,
    title: "Spotlight",
    label: "Tâm Điểm",
    template: <Spotlight />,
    colors: {
      primary: "#5943EF",
      secondary: "#FFF8EB",
    },
  },
  {
    id: 8,
    title: "Stone",
    label: "Sắc Đá",
    template: <Stone />,
    colors: {
      primary: "#FFFFFF",
      secondary: "#000000",
    },
  },
  {
    id: 9,
    title: "Trish",
    label: "Trish",
    template: <Trish />,
    colors: {
      primary: "#FF1F77",
      secondary: "#FFD6E6",
    },
  },
  {
    id: 10,
    title: "Tyla",
    label: "Tyla",
    template: <Tyla />,
    colors: {
      primary: "#e8e1d9",
      secondary: "#FDFAF7",
    },
  },

  {
    id: 11,
    title: "Eclipse",
    label: "Nhật Thực",
    template: <Eclipse />,
    colors: {
      primary: "#DEDBFF",
      secondary: "#8000FF",
    },
  },
];

// Các social mặc định
export const allSocialDefaults = [
  {
    platform: "instagram",
    label: "Instagram",
    icon: instagram,
    placeholder: "username hoặc link trang Instagram cá nhân",
  },
  {
    platform: "tiktok",
    label: "Tiktok",
    icon: tiktok,
    placeholder: "username hoặc link trang Tiktok cá nhân",
  },
  {
    platform: "link",
    label: "Website",
    icon: link,
    placeholder: "https://your-website.com/...",
  },
  {
    platform: "youtube",
    label: "YouTube",
    icon: youtube,
    placeholder: "https://youtube.com/...",
  },
  {
    platform: "x",
    label: "X (Twitter)",
    icon: x,
    placeholder: "https://x.com/...",
  },
  {
    platform: "facebook",
    label: "Facebook",
    icon: facebook,
    placeholder: "https://facebook.com/...",
  },
  {
    platform: "behance",
    label: "Behance",
    icon: behance,
    placeholder: "https://www.behance.net/...",
  },
  {
    platform: "whatsapp",
    label: "Whatsapp",
    icon: whatsapp,
    placeholder: "https://whatsapp.com/...",
  },
  {
    platform: "email",
    label: "Email",
    icon: mail,
    placeholder: "youremail@example.com",
  },
  {
    platform: "pinterest",
    label: "Pinterest",
    icon: pinterest,
    placeholder: "https://pinterest.com/...",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    icon: linkedin,
    placeholder: "https://linkedin.com/in/...",
  },
  {
    platform: "spotify",
    label: "Spotify",
    icon: spotify,
    placeholder: "https://open.spotify.com/...",
  },
  {
    platform: "applepodcast",
    label: "Apple Podcast",
    icon: podcast,
    placeholder: "https://podcasts.apple.com/...",
  },
  {
    platform: "etsy",
    label: "Etsy",
    icon: etsy,
    placeholder: "https://etsy.com/shop/...",
  },
  {
    platform: "discord",
    label: "Discord",
    icon: discord,
    placeholder: "https://discord.com/invite/...",
  },
  {
    platform: "snapchat",
    label: "Snapchat",
    icon: snapchat,
    placeholder: "https://snapchat.com/add/...",
  },
  {
    platform: "twitch",
    label: "Twitch",
    icon: twitch,
    placeholder: "https://twitch.tv/...",
  },
  {
    platform: "vimeo",
    label: "Vimeo",
    icon: vimeo,
    placeholder: "https://vimeo.com/...",
  },
];

export const initialDescriptionHtml = `
          <p>
              Chiếc áo thun nam này được thiết kế từ
              <span class="highlight">chất liệu cotton pha spandex</span> cao
              cấp, mang đến cảm giác <strong>mềm mại</strong>,
              <strong>ô m vừa vặn</strong> và <strong>co giãn linh hoạt</strong>
              . Với <span class="highlight">cổ tròn cổ điển</span> và đường may
              tỉ mỉ, bạn không cần lo lắng về tình trạng xù chỉ hay mất form sau
              nhiều lần giặt.
            </p>

            <h3>Điểm Nổi Bật</h3>
            <ul>
              <li>
                <strong>Chất liệu thoáng mát, thấm hút mồ hôi tốt:</strong>
                Cotton 100% kết hợp spandex giúp áo ôm form nhưng vẫn thông
                thoáng, tạo cảm giác khô ráo suốt ngày dài.
              </li>
              <li>
                <strong>Form ôm vừa phải, tôn dáng nam tính:</strong>
                Đường cắt gọn gàng ở vai và eo, giúp khoe nét khỏe khoắn mà vẫn
                thoải mái khi vận động.
              </li>
            </ul>

            <h3>Lợi Ích Khi Sở Hữu</h3>
            <ul class="benefits">
              <li>
                Luôn cảm thấy <strong>tự tin</strong> và{" "}
                <strong>thoải mái</strong> dù tham gia hoạt động ngoài trời hay
                dạo phố cùng bạn bè.
              </li>
              <li>
                <span class="highlight">Nâng cấp phong cách</span> thường ngày:
                trông lịch lãm, thu hút mà không cần cầu kỳ.
              </li>
            </ul>
  `;
