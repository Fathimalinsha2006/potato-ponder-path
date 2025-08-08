import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import potatoImg from "@/assets/potato.png";
import tomatoImg from "@/assets/tomato.png";
import rockImg from "@/assets/rock.png";
import carrotImg from "@/assets/carrot.png";

const SecurityCheck = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const puzzleItems = [
    { id: "potato", image: potatoImg, name: "Potato", isCorrect: true },
    { id: "tomato", image: tomatoImg, name: "Tomato", isCorrect: false },
    { id: "rock", image: rockImg, name: "Rock", isCorrect: false },
    { id: "carrot", image: carrotImg, name: "Carrot", isCorrect: false },
  ];

  const handleItemClick = (itemId: string) => {
    const newSelection = selectedItems.includes(itemId)
      ? selectedItems.filter(id => id !== itemId)
      : [...selectedItems, itemId];
    
    setSelectedItems(newSelection);
    
    // Check if only potato is selected
    if (newSelection.length === 1 && newSelection[0] === "potato") {
      setPuzzleSolved(true);
      toast({
        title: "✅ Potato confirmed!",
        description: "You may proceed, fellow potato!",
      });
    } else if (newSelection.length > 0) {
      setPuzzleSolved(false);
      toast({
        title: "🚫 Wrong!",
        description: "Are you sure you're a potato?",
        variant: "destructive",
      });
    }
  };

  const handlePotatoConfirm = () => {
    toast({
      title: "Welcome, fellow potato! 🥔",
      description: "You may proceed to the scientific survey.",
    });
    setTimeout(() => navigate("/survey"), 1500);
  };

  const handleHumanAdmit = () => {
    toast({
      title: "🚨 Imposter detected!",
      description: "Humans not allowed here!",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Button
        variant="exit"
        onClick={() => navigate("/")}
      >
        Exit — before it's too late!
      </Button>

      <div className="max-w-4xl w-full text-center space-y-8">
        <h1 className="text-6xl cartoon-font text-primary mb-4">
          Confirm you are a potato, not a human being 🥔😂
        </h1>

        <Card className="p-6 bg-card/80 backdrop-blur">
          <h2 className="text-2xl cartoon-font text-primary mb-4">
            Potato Confirmation Tips
          </h2>
          <div className="text-left space-y-2 text-lg">
            <p>• Tip 1: Potatoes don't blink.</p>
            <p>• Tip 2: If you love sunlight AND soil, you're probably a potato.</p>
            <p>• Tip 3: Potatoes don't use smartphones… usually.</p>
          </div>
        </Card>

        <Card className="p-6 bg-card/80 backdrop-blur">
          <h2 className="text-2xl cartoon-font text-primary mb-6">
            Potato Logic Test
          </h2>
          <p className="text-lg mb-6">Click only the potatoes to prove you belong here:</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {puzzleItems.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedItems.includes(item.id)
                    ? "border-primary bg-primary/20 scale-105"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => handleItemClick(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 mx-auto mb-2"
                />
                <p className="text-sm font-medium">{item.name}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-4 justify-center">
          <Button
            variant="fun"
            size="lg"
            onClick={handlePotatoConfirm}
            disabled={!puzzleSolved}
            className="text-xl px-8 py-4"
          >
            Yes, I'm a potato
          </Button>
          <Button
            variant="danger"
            size="lg"
            onClick={handleHumanAdmit}
            className="text-xl px-8 py-4"
          >
            No, I'm human
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SecurityCheck;