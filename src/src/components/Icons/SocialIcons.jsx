import React from "react";
import {
  AiFillInstagram,
  AiOutlineMail,
  AiFillFacebook,
  AiFillYoutube,
  AiOutlineLink,
} from "react-icons/ai";
import { FaPinterest, FaLinkedin, FaSnapchatGhost, FaBehance, FaWhatsapp } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { SiEtsy, SiDiscord, SiTwitch, SiVimeo } from "react-icons/si";
import { AiOutlineTikTok, AiFillSpotify } from "react-icons/ai";
import { TbBrandApplePodcast } from "react-icons/tb";

// Mỗi entry: key = tên platform, value = component icon (React)
export const SOCIAL_ICONS = {
  instagram: AiFillInstagram,
  tiktok: AiOutlineTikTok,
  email: AiOutlineMail,
  facebook: AiFillFacebook,
  youtube: AiFillYoutube,
  link: AiOutlineLink,
  pinterest: FaPinterest,
  linkedin: FaLinkedin,
  behance: FaBehance,
  whatsapp: FaWhatsapp,
  x: FiX,
  etsy: SiEtsy,
  discord: SiDiscord,
  spotify: AiFillSpotify,
  applepodcast: TbBrandApplePodcast,
  snapchat: FaSnapchatGhost,
  twitch: SiTwitch,
  vimeo: SiVimeo,
};

// Component hỗ trợ render tất cả icon truyền vào (danh sách key)
export const RenderSocialIcons = ({
  icons = [],
  size = 20,
  color = "#1f1f47",
}) => {
  return (
    <>
      {icons.map((key) => {
        const IconComp = SOCIAL_ICONS[key];
        if (!IconComp) return null;
        return (
          <IconComp
            key={key}
            size={size}
            color={color}
            style={{ marginRight: "0.5rem" }}
          />
        );
      })}
    </>
  );
};
