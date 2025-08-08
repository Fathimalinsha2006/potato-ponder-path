import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [idealWeight, setIdealWeight] = useState(0);
  const [userWeight, setUserWeight] = useState(0);
  const [resultComment, setResultComment] = useState("");

  // Devine formula for ideal body weight
  const calculateIdealWeight = (height: number, isMale: boolean = true) => {
    const baseWeight = isMale ? 50 : 45.5;
    const heightInches = height / 2.54;
    const extraInches = Math.max(0, heightInches - 60);
    return baseWeight + (extraInches * 2.3);
  };

  const getResultComment = (weight: number, ideal: number) => {
    const diff = Math.abs(weight - ideal);
    if (weight < ideal - 5) return "You're so light, the wind might carry you away 🌬️.";
    if (weight > ideal + 5) return "Snack champion detected 🏆🍔.";
    if (diff <= 5) return "Perfect! Reward yourself with a cake 🍰";
    return "You're wonderfully unique! 🌟";
  };

  useEffect(() => {
    const surveyData = localStorage.getItem('weightomaticSurvey');
    if (!surveyData) {
      navigate('/survey');
      return;
    }

    const data = JSON.parse(surveyData);
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    
    // Chaotic loading animation
    const intervals = [
      { duration: 1000, target: 90 },
      { duration: 500, target: 10 },
      { duration: 800, target: 200 },
      { duration: 300, target: 100 }
    ];

    let currentInterval = 0;
    
    const runInterval = () => {
      if (currentInterval >= intervals.length) {
        setLoading(false);
        
        // Calculate results
        const ideal = calculateIdealWeight(height);
        setIdealWeight(Math.round(ideal));
        setUserWeight(weight);
        setResultComment(getResultComment(weight, ideal));
        
        toast({
          title: "✅ Analysis Complete!",
          description: "Science has run out of here.",
        });
        return;
      }

      const { duration, target } = intervals[currentInterval];
      const startProgress = progress;
      const progressDiff = target - startProgress;
      const steps = 20;
      const stepDuration = duration / steps;
      let step = 0;

      const progressInterval = setInterval(() => {
        step++;
        const newProgress = startProgress + (progressDiff * step / steps);
        setProgress(Math.min(newProgress, target));
        
        if (step >= steps) {
          clearInterval(progressInterval);
          currentInterval++;
          setTimeout(runInterval, 200);
        }
      }, stepDuration);
    };

    setTimeout(runInterval, 500);
  }, [navigate, progress]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Button
        variant="exit"
        onClick={() => navigate("/")}
      >
        Exit — before it's too late!
      </Button>

      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-5xl cartoon-font text-primary text-center">
          science ran out of here 🧪💨
        </h1>

        {loading ? (
          <Card className="p-8 bg-card/80 backdrop-blur">
            <h2 className="text-2xl cartoon-font text-center mb-6">
              Calculating Your Destiny...
            </h2>
            <Progress 
              value={Math.min(progress, 100)} 
              className="h-4 mb-4"
            />
            <p className="text-center text-lg">
              {progress > 100 ? "Breaking the laws of physics..." : `${Math.round(progress)}%`}
            </p>
          </Card>
        ) : (
          <Card className="p-8 bg-card/80 backdrop-blur">
            <h2 className="text-3xl cartoon-font text-center mb-6 text-primary">
              🏆 The Big (Fake) Reveal 🏆
            </h2>
            
            <div className="space-y-4 text-center">
              <div className="text-2xl">
                <span className="cartoon-font">Your Weight:</span> {userWeight} kg
              </div>
              <div className="text-2xl">
                <span className="cartoon-font">Ideal Weight:</span> {idealWeight} kg
              </div>
              
              <div className="p-4 bg-primary/10 rounded-lg">
                <p className="text-xl italic">{resultComment}</p>
              </div>
            </div>

            <Button
              variant="fun"
              size="lg"
              onClick={() => navigate("/celebration")}
              className="w-full mt-8 text-xl py-4"
            >
              Continue to Glory! 🏆
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Results;