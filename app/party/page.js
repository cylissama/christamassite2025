"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { AddToCalendarButton } from "add-to-calendar-button-react";

export default function Party() {
    const [guests, setGuests] = useState([]);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        await addDoc(collection(db, "chat"), { text: message });
        setMessage("");
    };

    const event = {
        title: "Cy's Christmas Party 2025",
        description: "Join us for a festive celebration at Cy's Christmas Party 2025!",
        location: "Cy's Parents House",
        startTime: "2025-13-20T18:00:00",
        endTime: "2025-13-20T23:00:00",
        options: ["Apple Calendar", "Google Calendar", "Outlook Calendar", "Yahoo Calendar"],
    }  

    useEffect(() => {
        const unsubGuests = onSnapshot(collection(db, "guests"), (snapshot) => {
            setGuests(snapshot.docs.map((doc) => doc.data()));
        });
        const unsubChat = onSnapshot(collection(db, "chat"), (snapshot) => {
            setChat(snapshot.docs.map((doc) => doc.data()));
        });
        return () => {
            unsubGuests();
            unsubChat();
        };
    }, []);

  return (
    <div>

        <audio autoPlay loop src="audio/ha_xmas.wav" />

        <div class="marquee-header">
            <h1>
                Cy's Christmas Party 2025
            </h1>
        </div>

        <marquee>
            <img src="gifs/kitten_stocking.gif"/>
        </marquee>

        <div class="tile-background-container-2">

            <div class="gif-container">

                <div class="info-box">
                    <h2> When and Where </h2>
                    <p> Date: Dec 13, lmk if that dont work </p>
                    <p> Time: 6:00 PM - Late </p>
                    <p> Location: Cy's Parents House </p>
                    <p> RSVP by December 10, 2024 or else...</p>
                    <div class="flex justify-center mt-4">
                        <AddToCalendarButton
                            name={event.title}
                            description={event.description}
                            startDate={event.startTime.split("T")[0]}
                            endDate={event.endTime.split("T")[0]}
                            startTime={event.startTime.split("T")[1].replace("Z", "")}
                            endTime={event.endTime.split("T")[1].replace("Z", "")}
                            location={event.location}
                            options={["Apple", "Google", "iCal", "Outlook.com", "Yahoo"]}
                            size="5"
                            buttonStyle="flat"
                        />
                    </div>
                </div>

                <div class="info-box">
                    <h1> BRING A GIFT FOR THE GIFT EXCHANGE </h1>
                    $15 - $30
                    <img src="gifs/white.gif"/>
                </div>
            </div>
        </div>

        <div class="attendees-container">
                
            <h1> Welcome to the Party Lounge </h1>

            <h2> See who's coming </h2>

            <div className="attendees-list">
                {guests.map((g, i) => (
                <div key={i} className="attendees-list-box">
                    <img
                    src={g.avatar || "/avatars/smiley.png"}
                    alt="avatar"
                    class="w-15 h-15 rounded-full border border-gray-400"
                    />
                    <div class="name-text">
                    {g.name}
                    </div>
                    <div class="dish-text">
                    {g.dish}
                    </div>
                </div>
                ))}
            </div>

        </div>

        {/* Chat Room Section */}
        <div className="chat-room-container">

            <h2>
                Party Chat Room
            </h2>

            <div className="chat-room-messages-container">
                {chat.length === 0 ? (
                    <p>
                        No messages yet. Be the first to say something!
                    </p>
                ) : (
                    chat.map((msg, i) => (
                        <div key={i} class="chat-message">
                            {msg.text}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit">
                    Send
                </button>
            </form>

        </div>

    </div>
  );
}