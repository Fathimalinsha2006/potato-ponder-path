import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Celebration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [confettiPieces, setConfettiPieces] = useState<any[]>([]);
  const [currentJoke, setCurrentJoke] = useState("");

  const funnyTitles = [
    "Donut Destroyer 🍩",
    "Chief Fries Officer 🍟",
    "Supreme Pizza Overlord 🍕",
    "Master of Midnight Snacks 🌙",
    "Captain Calorie Counter 📊",
    "Duke of Deliciousness 👑",
    "Professor of Potato Studies 🥔",
  ];

  const randomJokes = [
    "Why don't scientists trust atoms? Because they make up everything... including your weight! 🔬",
    "I told my scale a joke. It didn't laugh, but it did give me a number! 😂",
    "My weight is like my bank account - I wish both had more digits! 💰",
    "I'm not overweight, I'm just under-tall! 📏",
    "My ideal weight is the weight of my wallet after buying food! 🍔💸",
  ];

  const [randomTitle] = useState(funnyTitles[Math.floor(Math.random() * funnyTitles.length)]);

  useEffect(() => {
    // Create confetti
    const pieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 3,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'][Math.floor(Math.random() * 5)],
    }));
    setConfettiPieces(pieces);

    // Set random joke
    setCurrentJoke(randomJokes[Math.floor(Math.random() * randomJokes.length)]);
  }, []);

  const downloadCertificate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;
    
    canvas.width = 800;
    canvas.height = 600;
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600);
    gradient.addColorStop(0, '#ff6b6b');
    gradient.addColorStop(0.25, '#ffeaa7');
    gradient.addColorStop(0.5, '#4ecdc4');
    gradient.addColorStop(0.75, '#45b7d1');
    gradient.addColorStop(1, '#96ceb4');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 800, 600);
    
    // Certificate content
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🏆 Certificate of Chaos 🏆', 400, 100);
    
    ctx.font = 'bold 28px Arial';
    ctx.fillText('Weight-O-Matic Survivor', 400, 150);
    
    ctx.font = 'bold 32px Arial';
    ctx.fillStyle = '#2c3e50';
    ctx.fillText(randomTitle, 400, 250);
    
    ctx.font = '20px Arial';
    ctx.fillText('Has successfully survived the Weight-O-Matic experience', 400, 320);
    ctx.fillText('and proven their potato credentials', 400, 350);
    
    ctx.font = 'italic 18px Arial';
    ctx.fillText('Signed, Chief Potato Officer 🥔', 400, 450);
    
    ctx.font = '16px Arial';
    ctx.fillText(`Date: ${new Date().toLocaleDateString()}`, 400, 500);
    
    // Download
    const link = document.createElement('a');
    link.download = 'weight-o-matic-certificate.png';
    link.href = canvas.toDataURL();
    link.click();
    
    toast({
      title: "Certificate Downloaded! 📄",
      description: "Your chaos certificate is ready for framing!",
    });
  };

  return (
    <div className="min-h-screen rainbow-gradient flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      <div className="max-w-4xl w-full space-y-8 z-10">
        <h1 className="text-6xl cartoon-font text-white text-center drop-shadow-lg">
          🏆 Congratulations! You've Survived the Weight-O-Matic 🏆
        </h1>

        <Card className="p-8 bg-white/90 backdrop-blur border-4 border-primary shadow-2xl">
          <div className="text-center space-y-6">
            <h2 className="text-4xl cartoon-font text-primary">
              Certificate of Chaos
            </h2>
            
            <div className="p-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg">
              <p className="text-2xl cartoon-font mb-2">
                This certifies that you are now a
              </p>
              <p className="text-4xl cartoon-font text-primary">
                {randomTitle}
              </p>
            </div>
            
            <div className="border-2 border-dashed border-primary p-4 rounded-lg">
              <p className="text-lg italic">
                "Has successfully survived the Weight-O-Matic experience and proven their potato credentials"
              </p>
            </div>
            
            <div className="text-right">
              <p className="text-lg italic">Signed, Chief Potato Officer 🥔</p>
              <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white/80 backdrop-blur">
          <h3 className="text-2xl cartoon-font text-center mb-4">Random Joke Box</h3>
          <p className="text-lg text-center italic">{currentJoke}</p>
        </Card>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="fun"
            size="lg"
            onClick={() => navigate("/")}
            className="text-xl px-8 py-4"
          >
            Restart the Madness 🔄
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={downloadCertificate}
            className="text-xl px-8 py-4"
          >
            Download Certificate ⬇️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Celebration;