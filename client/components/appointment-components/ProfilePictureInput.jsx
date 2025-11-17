import { useRef } from "react";

export const ProfilePictureInput = ({ profilePicture, setProfilePicture }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setProfilePicture(reader.result);
    reader.readAsDataURL(file);
  };

  const removeProfilePicture = () => {
    setProfilePicture("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div style={{ marginTop: 8 }}>
      {profilePicture && (
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src={profilePicture}
            alt="Profile"
            style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover" }}
          />
          <button
            type="button"
            onClick={removeProfilePicture}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "50%",
              width: 24,
              height: 24,
              cursor: "pointer",
            }}
          >
            ×
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "block", marginTop: 8 }}
      />
    </div>
  );
};
