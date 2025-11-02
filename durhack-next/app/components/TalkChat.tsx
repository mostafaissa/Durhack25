"use client";

import { useEffect, useState, useRef } from "react";
import { Chatbox } from "@talkjs/react-components";
import "@talkjs/react-components/default.css";
import { getTalkSession } from "@talkjs/core";

export default function TalkChat() {
  const [isOpen, setIsOpen] = useState(false);
  const chatboxRef = useRef<any>(null);
  const appId = "tnMkcSe7";
  const userId = "frank";
  const otherUserId = "donna";
  const conversationId = "new_conversation";
  
  const session = getTalkSession({
    // @ts-ignore
    host: "durhack.talkjs.com",
    appId,
    userId,
  });

  useEffect(() => {
    let mounted = true;
    
    // Initialize users and conversation
    session.currentUser.createIfNotExists({ name: "Frank" });
    session.user(otherUserId).createIfNotExists({ name: "Donna" });

    const conversation = session.conversation(conversationId);
    conversation.createIfNotExists();
    conversation.participant(otherUserId).createIfNotExists();

    // Set up message handler for auto-responses as Donna
    const handleMessage = async (event: any) => {
      console.log("TalkJS message event received:", event);
      
      try {
        // Get the message from the event
        const message = event.message || event;
        const messageText = message.text;
        const senderId = message.sender?.id || message.user?.id || message.senderId || message.senderId;
        
        console.log("Message details:", { messageText, senderId, userId });
        
        // Only respond to messages from the current user (not from Donna)
        if (mounted && senderId === userId && messageText && messageText.trim()) {
          console.log("Processing user message, calling bot API...");
          
          try {
            // Call the bot API to get Donna's response
            const response = await fetch("/api/talkjs/bot", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ 
                text: messageText,
                message: { text: messageText }
              }),
            });

            if (!response.ok) {
              console.error("Bot API error:", response.status);
              return;
            }

            const data = await response.json();
            console.log("Bot API response:", data);
            
            if (data.text && mounted) {
              // Wait a bit for the user's message to appear first
              setTimeout(async () => {
                if (mounted) {
                  try {
                    console.log("Sending Donna's response:", data.text);
                    // Send the response as Donna
                    const conv = session.conversation(conversationId);
                    await conv.sendMessage({
                      text: data.text,
                    });
                    console.log("Message sent successfully");
                  } catch (err) {
                    console.error("Error sending message:", err);
                  }
                }
              }, 500);
            }
          } catch (error) {
            console.error("Error getting Donna's response:", error);
          }
        }
      } catch (error) {
        console.error("Error handling message event:", error);
      }
    };

    // Subscribe to message events using TalkJS session API
    const unsubscribes: (() => void)[] = [];
    
    // Try subscribing at conversation level
    try {
      if (conversation && typeof conversation.on === 'function') {
        console.log("Subscribing to conversation messages");
        conversation.on("message", handleMessage);
        unsubscribes.push(() => {
          if (typeof conversation.off === 'function') {
            conversation.off("message", handleMessage);
          }
        });
      }
    } catch (e) {
      console.error("Error subscribing to conversation:", e);
    }
    
    // Try subscribing at session level
    try {
      if (session && typeof session.on === 'function') {
        console.log("Subscribing to session messages");
        session.on("message", handleMessage);
        unsubscribes.push(() => {
          if (typeof session.off === 'function') {
            session.off("message", handleMessage);
          }
        });
      }
    } catch (e) {
      console.error("Error subscribing to session:", e);
    }

    // Also try using window.Talk if available (TalkJS global)
    if (typeof window !== 'undefined' && (window as any).Talk) {
      console.log("TalkJS global found, attempting to subscribe via Talk.ready");
      (window as any).Talk.ready.then(() => {
        try {
          const talkSession = (window as any).Talk.getSession({
            appId: appId,
            me: { id: userId, name: "Frank" }
          });
          
          talkSession.on("message", handleMessage);
          unsubscribes.push(() => {
            try {
              talkSession.off("message", handleMessage);
            } catch (e) {
              console.error("Error unsubscribing from Talk session:", e);
            }
          });
        } catch (e) {
          console.error("Error setting up Talk.ready listener:", e);
        }
      });
    }

    console.log("Message handlers set up");

    return () => {
      mounted = false;
      console.log("Cleaning up message handlers");
      unsubscribes.forEach(unsub => {
        try {
          unsub();
        } catch (e) {
          console.error("Error unsubscribing:", e);
        }
      });
    };
  }, [session, conversationId, otherUserId, userId, appId]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontSize: "24px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Open chat"
      >
        💬
      </button>

      {/* Popup Modal */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            height: "600px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            zIndex: 1001,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* Header with Close Button */}
          <div
            style={{
              padding: "16px",
              backgroundColor: "#f5f5f5",
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>
              Talk to Donna
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#666",
                padding: "0",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "4px",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Chatbox */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <Chatbox
              // @ts-ignore
              host="durhack.talkjs.com"
              style={{ width: "100%", height: "100%" }}
              appId={appId}
              userId={userId}
              conversationId={conversationId}
            />
          </div>
        </div>
      )}
    </>
  );
}
