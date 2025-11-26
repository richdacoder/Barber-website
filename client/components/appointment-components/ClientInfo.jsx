import { ProfilePictureInput } from "./ProfilePictureInput";

export const ClientInfo = ({
  firstName, setFirstName,
  lastName, setLastName,
  email, setEmail,
  phone, setPhone,
  profilePicture, setProfilePicture
}) => {
  return (
    <div className="form-section">
      <h4>Client Information</h4>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone Number"
      />

      <ProfilePictureInput profilePicture={profilePicture} setProfilePicture={setProfilePicture} />
    </div>
  );
};
