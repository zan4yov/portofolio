import React, { useEffect, useRef, useMemo } from "react";
import "./ProfileCard.css";
import profilePhoto from "@/assets/profile.webp";
import miniProfile from "@/assets/mini-profile.webp";

const DEFAULT_BEHIND_GRADIENT =
  "radial-gradient(farthest-side circle at var(--pointer-x) var(--pointer-y),hsla(266,100%,90%,var(--card-opacity)) 4%,hsla(266,50%,80%,calc(var(--card-opacity)*0.75)) 10%,hsla(266,25%,70%,calc(var(--card-opacity)*0.5)) 50%,hsla(266,0%,60%,0) 100%),radial-gradient(35% 52% at 55% 20%,#00ffaac4 0%,#073aff00 100%),radial-gradient(100% 100% at 50% 50%,#00c1ffff 1%,#073aff00 76%),conic-gradient(from 124deg at 50% 50%,#c137ffff 0%,#07c6ffff 40%,#07c6ffff 60%,#c137ffff 100%)";

const DEFAULT_INNER_GRADIENT =
  "linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)";

const clamp = (value: number, min = 0, max = 100) =>
  Math.min(Math.max(value, min), max);
const round = (value: number, precision = 3) =>
  parseFloat(value.toFixed(precision));

interface ProfileCardProps {
  avatarUrl?: string;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  onContactClick?: () => void;
}

const ProfileCardComponent = ({
  avatarUrl = profilePhoto,
  miniAvatarUrl = miniProfile,
  name = "Razan Widya Reswara",
  title = "Computer Science Student",
  handle = "zan4yov",
  status = "Open to opportunities",
  contactText = "Contact Me",
  onContactClick = () => (window.location.href = "/contact"), // ✅ default action ke /contact
}: ProfileCardProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Efek tilt (sama seperti sebelumnya)
  useEffect(() => {
    const card = cardRef.current;
    const wrap = wrapRef.current;
    if (!card || !wrap) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
      const width = card.clientWidth;
      const height = card.clientHeight;
      const percentX = clamp((100 / width) * offsetX);
      const percentY = clamp((100 / height) * offsetY);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      wrap.style.setProperty("--pointer-x", `${percentX}%`);
      wrap.style.setProperty("--pointer-y", `${percentY}%`);
      wrap.style.setProperty("--rotate-x", `${round(-(centerX / 5))}deg`);
      wrap.style.setProperty("--rotate-y", `${round(centerY / 4)}deg`);
    };

    card.addEventListener("mousemove", handleMove);
    return () => card.removeEventListener("mousemove", handleMove);
  }, []);

  const cardStyle = useMemo(
    () =>
      ({
        "--behind-gradient": DEFAULT_BEHIND_GRADIENT,
        "--inner-gradient": DEFAULT_INNER_GRADIENT,
      } as React.CSSProperties),
    []
  );

  return (
    <div ref={wrapRef} className="pc-card-wrapper" style={cardStyle}>
      <section ref={cardRef} className="pc-card">
        <div className="pc-inside">
          {/* Foto utama */}
          <div className="pc-content pc-avatar-content">
            <img
              className="avatar"
              src={avatarUrl}
              alt={name}
              fetchPriority="high"
              decoding="async"
            />

            {/* Bagian bawah */}
            <div className="pc-user-info">
              <div className="pc-user-details">
                {/* Mini avatar */}
                <div className="pc-mini-avatar">
                  <img
                    src={miniAvatarUrl}
                    alt={`${name} mini avatar`}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                  />
                </div>

                {/* Text rata kiri */}
                <div className="pc-user-text text-left">
                  <div className="pc-handle">@{handle}</div>
                  <div className="pc-status mt-[1px]">{status}</div>
                </div>
              </div>

              {/* ✅ Tombol Contact Me kembali berfungsi */}
              <button
                className="pc-contact-btn"
                onClick={onContactClick}
                style={{ pointerEvents: "auto" }} // 👈 ini penting
                type="button"
                aria-label={`Contact ${name}`}
              >
                {contactText}
              </button>
            </div>
          </div>

          {/* Nama dan title */}
          <div className="pc-content">
            <div className="pc-details">
              <h3>{name}</h3>
              <p>{title}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ProfileCard = React.memo(ProfileCardComponent);
export default ProfileCard;
