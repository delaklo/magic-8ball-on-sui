import { useState, useCallback } from "react";
import {
  ConnectButton,
  useCurrentAccount,
  useSignPersonalMessage,
} from "@mysten/dapp-kit";
import MagicBall from "./components/MagicBall";
import StatusMessage from "./components/StatusMessage";
import SignatureDetails from "./components/SignatureDetails";
import "./styles/magic8ball.css";

const responses = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy, try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

const generateRandomFromSignature = (signature: Uint8Array): number => {
  const hexString = Array.from(signature, (byte: number) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2),
  ).join("");
  const hexSegment = hexString.substring(0, 8);
  const randomSeed =
    parseInt(hexSegment, 16) || Math.floor(Math.random() * 1000000);
  return randomSeed % responses.length;
};




export default function SuiMagic8Ball() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("Ask and sign to reveal");
  const [isShaking, setIsShaking] = useState(false);
  const [isAsking, setIsAsking] = useState(false);
  const [status, setStatus] = useState<{ message: string; type: "success" | "error" | "info"; isVisible: boolean }>({
    message: "",
    type: "info",

    isVisible: false,
  });
  const [signatureDetails, setSignatureDetails] = useState({
    message: "",
    signature: "",
    responseIndex: 0,
    isVisible: false,
  });



  const currentAccount = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();

  const showStatus = useCallback((message: string, type: "success" | "error" | "info") => {
    setStatus({ message, type, isVisible: true });
    if (type === "success" || type === "info") {
      setTimeout(
        () => setStatus((prev) => ({ ...prev, isVisible: false })),
        5000,
      );
    }
  }, []);

  const askMagic8Ball = useCallback(async () => {
    if (!question.trim())
      return showStatus("Please enter a question first!", "error");
    if (!currentAccount)
      return showStatus("please connect your wallet first!", "error");

    try {
      setIsAsking(true);
      setIsShaking(true);
      setAnswer("...");
      showStatus("Please sign the message in your wallet...", "info");

      const timestamp = Date.now();
      const message = `Magic 8 Ball question: "${question}" - ${timestamp}`;
      const messageBytes = new TextEncoder().encode(message);

      signPersonalMessage(
        { message: messageBytes },
        {
          onSuccess: (result) => {
            try {
               const signatureBytes = new Uint8Array(
                result.signature.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
              );
              
              const responseIndex = generateRandomFromSignature(
                signatureBytes,
              );
              const selectedAnswer = responses[responseIndex];

              const signatureHex = result.signature;

              setSignatureDetails({
                message,
                signature: signatureHex,
                responseIndex,
                isVisible: true,
              });

              setTimeout(() => {
                setIsShaking(false);
                setAnswer(selectedAnswer);
                showStatus("The Magic 8 Ball has spoken!", "success");
                setIsAsking(false);
              }, 1000);
            } catch (err) {
              console.error(err);
              setIsShaking(false);
              setAnswer("Error occrred");
              showStatus("Error processing signature", "error");
              setIsAsking(false);
            }
          },


          onError: (err) => {
            console.error(err);
            setIsShaking(false);
            setAnswer("Signing failed");
            showStatus(`Signing failed: ${err.message}`, "error");
            setIsAsking(false);
          },
        },
      );
    } catch (err) {
      console.error(err);
      setIsShaking(false);
      setAnswer("Error occurred");
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      showStatus(`Error: ${errorMessage}`, "error");
      setIsAsking(false);
    }
  }, [question, currentAccount, signPersonalMessage, showStatus]);

  const handleKeyPress = (e: { key: string; }) => {
    if (e.key === "Enter" && !isAsking) askMagic8Ball();
  };

  const handleBallClick = () => {
    if (!isAsking && question.trim()) askMagic8Ball();
  };
  return (
    <div className="container">
      <h1 className="title">Magic 8 Ball</h1>
      <div className="subtitle">
        Ask a question and sign with your Sui wallet for a mystical answer!
      </div>

      <div className="wallet-section">

        <ConnectButton />

        
        {currentAccount && (
          <div className="account-info">
            <strong>Connected:</strong>
            <br />
            {currentAccount.address.slice(0, 8)}...
            {currentAccount.address.slice(-6)}
          </div>
        )}
      </div>

      {currentAccount && (
        <div className="question-section">
          <input
            type="text"
            className="question-input"
            placeholder="Ask your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            maxLength={100}
          />

          <MagicBall
            answer={answer}
            isShaking={isShaking}
            onClick={handleBallClick}
          />

          <button
            className="ask-button"
            onClick={askMagic8Ball}
            disabled={isAsking}
          >
            {isAsking ? "Signing..." : "Ask the Magic 8 Ball"}
          </button>
        </div>
      )}
      <StatusMessage {...status} />
      <SignatureDetails {...signatureDetails} />
      <br/>
      <div>Created by stransey.sui</div>
    </div>
  );
}