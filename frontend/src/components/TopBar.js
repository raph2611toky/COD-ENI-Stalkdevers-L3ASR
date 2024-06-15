import React from "react";
import profileImg from "../image/profil.jpg";
import "./TopBar.css";

const TopBar = () => {
  const notificationCount = 2;
  return (
    <div className="topBarcontainer">
      <div className="logo">logo</div>
      <div className="topBar-right-container">
        <div className="notification">
          <svg width="22" height="27" fill="none">
            <path
              fill="#000"
              fill-opacity=".9"
              d="M11 .5C8.715.5 6.524 1.51 4.908 3.306c-1.615 1.796-2.523 4.232-2.523 6.773v4.828c0 .212-.044.421-.129.611L.143 20.216a1.648 1.648 0 0 0 .06 1.465c.12.218.29.398.492.523.201.125.428.19.659.19h19.292c.23 0 .458-.065.66-.19a1.43 1.43 0 0 0 .492-.523 1.647 1.647 0 0 0 .06-1.465l-2.113-4.698a1.5 1.5 0 0 1-.13-.611v-4.828c0-2.54-.908-4.977-2.523-6.773C15.476 1.509 13.284.5 11 .5Zm0 26a3.444 3.444 0 0 1-2.133-.753 4.09 4.09 0 0 1-1.35-1.984h6.966a4.09 4.09 0 0 1-1.35 1.984A3.445 3.445 0 0 1 11 26.5Z"
            />
          </svg>
          <div className="notificationCount">{notificationCount}</div>
        </div>
        <div className="profile">
          <img src={profileImg} alt="" width={30} height={30} />
        </div>
        <div className="logout">
          <svg width="22" height="23" fill="none">
            <path
              fill="#1A1A1A"
              fill-rule="evenodd"
              d="M0 8.392v6.216c0 2.93 0 4.395.934 5.306.848.827 2.167.902 4.654.91-.13-.863-.158-1.891-.166-3.103a.928.928 0 0 1 .279-.663.952.952 0 0 1 .673-.274.962.962 0 0 1 .676.267.94.94 0 0 1 .286.66c.008 1.36.043 2.323.182 3.054.133.706.345 1.112.656 1.416.353.345.849.569 1.786.69.962.128 2.238.129 4.07.129h1.274c1.831 0 3.107-.003 4.071-.128.936-.122 1.432-.347 1.784-.691.353-.345.584-.828.709-1.74.13-.938.132-2.184.132-3.968V6.527c0-1.785-.003-3.028-.132-3.968-.125-.912-.356-1.396-.708-1.74-.353-.345-.849-.569-1.786-.69C18.413 0 17.137 0 15.306 0H14.03c-1.83 0-3.106.003-4.07.128-.936.122-1.432.347-1.785.691-.31.303-.523.71-.656 1.416-.139.73-.174 1.694-.181 3.054a.929.929 0 0 1-.287.66.953.953 0 0 1-.676.267.96.96 0 0 1-.673-.274.937.937 0 0 1-.278-.663c.007-1.212.035-2.24.165-3.103-2.487.008-3.804.083-4.653.91C0 3.996 0 5.463 0 8.392Zm3.151 3.767a.923.923 0 0 1-.28-.659.914.914 0 0 1 .28-.66l2.55-2.486a.972.972 0 0 1 1.56.302.914.914 0 0 1-.207 1.017l-.919.894h9.17c.529 0 .958.418.958.933 0 .515-.43.933-.958.933h-9.17l.918.894a.923.923 0 0 1 .28.66.914.914 0 0 1-.28.659.972.972 0 0 1-1.354 0l-2.548-2.487Z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
