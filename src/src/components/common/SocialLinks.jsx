import React from "react";
import { SOCIAL_ICONS } from "../Icons/SocialIcons";

/**
 * Render social icons with links based on user provided URLs.
 * @param {Object} props
 * @param {Object} props.links - Object mapping platform -> url
 * @param {string} [props.linkClass] - class for <a> wrapper
 * @param {string} [props.iconClass] - class for icon component
 * @param {number} [props.size=20] - icon size
 */
const SocialLinks = ({ links = {}, linkClass = "", iconClass = "", size = 20 }) => {
  return (
    <>
      {Object.entries(links)
        .filter(([, url]) => url && url.trim() !== "")
        .map(([platform, url]) => {
          const Icon = SOCIAL_ICONS[platform.toLowerCase()];
          if (!Icon) return null;
          const href =
            platform.toLowerCase() === "email" && !url.startsWith("mailto:")
              ? `mailto:${url}`
              : url;
          return (
            <a
              key={platform}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
              title={platform}
            >
              <Icon className={iconClass} size={size} />
            </a>
          );
        })}
    </>
  );
};

export default SocialLinks;
