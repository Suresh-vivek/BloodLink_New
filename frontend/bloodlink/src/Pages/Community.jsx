import React from "react";
import "./Community.css";

import profile1 from "../assets/profile1.jpg";
import profile2 from "../assets/profile2.jpg";
import profile3 from "../assets/profile3.jpg";
import profile4 from "../assets/profile4.jpg";
import profile5 from "../assets/profile5.jpg";

import donate1 from "../assets/donate1.jpg";
import donate2 from "../assets/donate2.jpeg";
import donate3 from "../assets/donate3.png";
import donate4 from "../assets/donate4.png";
import donate5 from "../assets/donate5.jpeg";
import Post from "../components/miniComponents/Post";

const Community = () => {
  return (
    <div>
      <div className="feed">
        <Post
          profileimage={profile1}
          profilename="Aman"
          location="Faridabad"
          date="10 minutes"
          donateimage={donate1}
          comment="21"
          count={13}
        />
        <Post
          profileimage={profile2}
          profilename="Vivek"
          location="Faridabad"
          date="23/11/23"
          donateimage={donate2}
          comment="11"
          count={12}
        />
        <Post
          profileimage={profile3}
          profilename="Samantha"
          location="Faridabad"
          date="19/11/23"
          donateimage={donate3}
          comment="15"
          count={19}
        />
        <Post
          profileimage={profile4}
          profilename="Shruti"
          location="Faridabad"
          date="12/11/23"
          donateimage={donate4}
          comment="14"
          count={27}
        />
        <Post
          profileimage={profile5}
          profilename="Tarun"
          location="Faridabad"
          date="09/10/23"
          donateimage={donate5}
          comment="17"
          count={45}
        />
      </div>
    </div>
  );
};

export default Community;
