"use client";
import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [dish, setDish] = useState("");
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !dish) return alert("Please fill in both fields!");
    await addDoc(collection(db, "guests"), { name, dish });
    router.push("/party");
  };

  const handlePopupClick = () => {
    setShowPopup(false);
  };

  return ( 
    <> 
      {showPopup && (
        <div
          onClick={handlePopupClick}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <img 
              src="/gifs/christmas_invite.gif" 
              alt="Welcome"
              style={{ width: "75vw", height: "75vh", objectFit: "contain" }}
            />
          </div>
        </div>
      )}

    <div className="welcome-header">

      <audio autoPlay loop src="audio/ha_xmas.wav" />

      <div style={{
        backgroundColor: "#006400", // dark green
        border: "8px solid",
        borderImage: "linear-gradient(to right, red, gold, green, red) 1",
        boxShadow: "0 0 30px gold, 0 0 50px gold",
        padding: "20px",
        margin: "20px auto",
        maxWidth: "900px",
        borderRadius: "10px"
      }}>
        <h1 style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          fontFamily: "Comic Sans MS", 
          fontSize: "40px", 
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 4px black",
          margin: 0 
        }}>
          YOUR INVITED TO CY'S CHRISTMAS PARTY!
        </h1>
      </div>

      {/* @ts-ignore */}
      <marquee style={{ color: "gold", fontSize: "20px" }}>
        <img src="/gifs/santa_walk.gif"/>
      {/* @ts-ignore */}
      </marquee>

      <h2 style={{fontFamily: "Comic Sans MS", fontSize: "25px", textAlign: "center"}}> Enter your name and what dish you're bringing for the potluck!</h2>
      <form onSubmit={handleSubmit} style={{ marginTop: "60px", textAlign: "center" }}>
        <p>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "5px", border: "2px solid red", backgroundColor: "green" }}
          />
        </p>
        <p>
          <label>Dish: </label>
          <input
            type="text"
            value={dish}
            onChange={(e) => setDish(e.target.value)}
            style={{ padding: "5px", border: "2px solid red", backgroundColor: "green" }}
          />
        </p>
        <button
          type="submit"
          style={{
            marginTop: "20px",
            backgroundColor: "red",
            color: "white",
            padding: "10px 20px",
            border: "2px solid gold",
          }}
        >
          Join the Party!
        </button>
      </form>

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "10px auto",
        maxWidth: "100vw",
        padding: "0 20px",
        gap: "20px"
      }}>
        <img 
          src="/gifs/snow_window.gif" 
          alt="Snow window" 
          style={{ width: "300px", flexShrink: 0 }}
        />
        
        <img 
          src="/gifs/slay_santa.gif" 
          alt="Center decoration" 
          style={{ width: "400px", flexGrow: 1, maxWidth: "400px" }}
        />
        
        <img 
          src="/gifs/snow_window.gif" 
          alt="Snow window" 
          style={{ width: "300px", flexShrink: 0 }}
        />
      </div>
    </div>
    </>
  );
}