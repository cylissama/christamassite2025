"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import AvatarSelector from "./components/AvatarSelector";

export default function Home() {
  const [name, setName] = useState("");
  const [dish, setDish] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const [avatar, setAvatar] = useState("/avatars/santa_list.gif");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !dish) return alert("Please fill in both fields!");
    await addDoc(collection(db, "guests"), { name, dish, avatar });
    router.push("/party");
  };

  const handlePopupClick = () => {
    setShowPopup(false);
  };

  const handleNextPage = () => {
    router.push("/party");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  return ( 
    <> 
      {showPopup && (
        <div onClick={handlePopupClick} className="pop-up">
            <img src="/gifs/christmas_invite.gif" alt="Welcome"/>
        </div>
      )}

    <div className="welcome-header">

      <audio autoPlay loop src="audio/ha_xmas.wav" />

      <div className="invite-box">
        <h1>
          YOUR INVITED TO CY'S CHRISTMAS PARTY!
        </h1>

      </div>

      {/* @ts-ignore */}
      <marquee>
        <img src="/gifs/santa_walk.gif"/>
      {/* @ts-ignore */}
      </marquee>

      <h2> 
        Enter your name and what dish you're bringing for the potluck to RSVP!
      </h2>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="invite-form">
          <p>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </p>
          <p>
            <label>Dish: </label>
            <input
              type="text"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
            />
          </p>
          <h2>
            Choose an avatar!
            <AvatarSelector selectedAvatar={avatar} onSelect={setAvatar} />
          </h2>

          <button
            type="submit"
            className="outside-button"
          >
            Join the Party!
          </button>
        </form>
          
        <button
          onClick={handleNextPage}
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "2px solid gold",
            justifyContent: "center",
          }}
        >
          Already RSVPed? Click Here!
        </button>
      </div>

      <div className="gif-container">
        <img 
          src="/gifs/snow_window.gif" 
          alt="Snow window" 
          style={{ width: "300px", flexShrink: 0 }}
          className="gif-side"
        />
        
        <img 
          src="/gifs/seasons_greetings.gif" 
          alt="Center decoration" 
          style={{ width: "400px", flexGrow: 1 }}
        />
        
        <img 
          src="/gifs/snow_window.gif" 
          alt="Snow window" 
          style={{ width: "300px", flexShrink: 0 }}
          className="gif-side"
        />
      </div>
    </div>
    </>
  );
}