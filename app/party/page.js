"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";

export default function Party() {
  const [guests, setGuests] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

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

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await addDoc(collection(db, "chat"), { text: message });
    setMessage("");
  };

  return (
    <div>

        <div class="marquee-header">
            <marquee> 
                Cy's Christmas Party 2025 🎄 Cy's Christmas Party 2025 🎄 Cy's Christmas Party 2025 🎄 Cy's Christmas Party 2025 🎄
            </marquee>
        </div>

        <div className="tile-background-container-2">

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
                <div class="box text-center">
                    <h2> When and Where </h2>
                    <p> Date: TBD </p>
                    <p> Time: 6:00 PM - Sober </p>
                    <p> Location: Cy's Parents House </p>
                    <p> RSVP by December 10, 2024 or else...</p>
                </div>  

                <img src="/gifs/snowglobe.gif" />

                <div style={{
                background: "#006400",
                border: "4px ridge gold",
                padding: "30px",
                margin: "40px auto",
                maxWidth: "800px"
                }}>
                <h1 style={{ 
                    fontFamily: "'Comic Sans MS'",
                    textAlign: "center",
                    color: "gold",
                    fontSize: "32px",
                    marginBottom: "20px"
                }}>
                    Welcome to the Party Lounge
                </h1>

                <h3 style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "20px",
                    marginBottom: "25px"
                }}>
                    See who's coming
                </h3>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                    gap: "15px"
                }}>
                    {guests.map((g, i) => (
                    <div key={i} style={{
                        width: "180px",
                        height: "120px",
                        background: "#228B22",
                        border: "3px outset #FFD700",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "10px",
                        textAlign: "center",
                        color: "white",
                        fontFamily: "Arial, sans-serif"
                    }}>
                        <div style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        marginBottom: "8px",
                        color: "gold"
                        }}>
                        {g.name}
                        </div>
                        <div style={{
                        fontSize: "14px",
                        color: "white"
                        }}>
                        {g.dish}
                        </div>
                    </div>
                    ))}
                </div>
                </div>

            </div>

        </div>

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
                <img src="/gifs/snowglobe.gif" />
                <img src="/gifs/santa_pray.gif" />
                <img src="/gifs/christmas_25.gif" />
                <img src="/gifs/snowglobe.gif" />
            </div>


        {/* Chat Room Section */}
        <div style={{
            background: "#8B0000",
            border: "4px ridge gold",
            padding: "30px",
            margin: "40px auto",
            maxWidth: "800px"
        }}>
            <h2 style={{
                fontFamily: "'Comic Sans MS'",
                textAlign: "center",
                color: "gold",
                fontSize: "28px",
                marginBottom: "20px"
            }}>
                Party Chat Room
            </h2>

            <div style={{
                background: "#FFFFFF",
                border: "3px inset #666",
                height: "300px",
                overflowY: "scroll",
                padding: "15px",
                marginBottom: "20px",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px"
            }}>
                {chat.length === 0 ? (
                    <p style={{ color: "#666", textAlign: "center" }}>
                        No messages yet. Be the first to say something!
                    </p>
                ) : (
                    chat.map((msg, i) => (
                        <div key={i} style={{
                            background: "#F0F0F0",
                            border: "2px outset #CCC",
                            padding: "8px",
                            marginBottom: "10px",
                            borderRadius: "3px"
                        }}>
                            {msg.text}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={sendMessage} style={{
                display: "flex",
                gap: "10px"
            }}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    style={{
                        flex: 1,
                        padding: "10px",
                        border: "3px inset #666",
                        fontSize: "14px",
                        fontFamily: "Arial, sans-serif"
                    }}
                />
                <button
                    type="submit"
                    style={{
                        background: "#228B22",
                        color: "white",
                        border: "3px outset #FFD700",
                        padding: "10px 25px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        fontFamily: "'Comic Sans MS'"
                    }}
                >
                    Send
                </button>
            </form>
        </div>
    </div>
  );
}