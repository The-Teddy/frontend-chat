import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography } from '@mui/material';

const ChatBot = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        message: input,
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }

    setInput("");
  };
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
    <Box flex={1} overflow="auto" p={2} bgcolor="#f9f9f9">
      <Typography variant="body1">Message example...</Typography>
    </Box>
    <Box display="flex" p={2} borderTop="1px solid #ccc">
      <TextField fullWidth variant="outlined" placeholder="Type a message..." />
      <Button variant="contained" color="primary">Send</Button>
    </Box>
  </Box>
  );
};

export default ChatBot;
