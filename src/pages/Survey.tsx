import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface SurveyData {
  weight: string;
  height: string;
  age: string;
  snack: string;
  foodThoughts: string;
}

const Survey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<SurveyData>({
    weight: "",
    height: "",
    age: "",
    snack: "",
    foodThoughts: "",
  });

  const handleInputChange = (field: keyof SurveyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getFoodThoughtComment = (hours: number) => {
    if (hours === 0) return "Liar detected 🚨. Nobody escapes food thoughts.";
    if (hours >= 1 && hours <= 3) return "Moderate snack thinker.";
    if (hours >= 4) return "Certified food visionary 🍟🔮.";
    return "";
  };

  const handleSubmit = () => {
    const requiredFields: (keyof SurveyData)[] = ['weight', 'height', 'age', 'snack', 'foodThoughts'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information!",
        description: "Please fill in all fields to proceed.",
        variant: "destructive",
      });
      return;
    }

    const hours = parseInt(formData.foodThoughts);
    const comment = getFoodThoughtComment(hours);
    
    toast({
      title: "Food Thought Analysis Complete!",
      description: comment,
    });

    // Store survey data for results
    localStorage.setItem('weightomaticSurvey', JSON.stringify(formData));
    
    setTimeout(() => navigate("/results"), 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Button
        variant="exit"
        onClick={() => navigate("/")}
      >
        Exit — before it's too late!
      </Button>

      <div className="max-w-2xl w-full space-y-8">
        <h1 className="text-5xl cartoon-font text-primary text-center mb-8">
          Totally Scientific Survey 🧪
        </h1>

        <Card className="p-8 bg-card/80 backdrop-blur">
          <div className="space-y-6">
            <div>
              <Label htmlFor="weight" className="text-lg cartoon-font">
                Weight (kg) 🏋️
              </Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter your weight"
              />
            </div>

            <div>
              <Label htmlFor="height" className="text-lg cartoon-font">
                Height (cm) 📏
              </Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter your height"
              />
            </div>

            <div>
              <Label htmlFor="age" className="text-lg cartoon-font">
                Age (years) 🎂
              </Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
                className="mt-2 text-lg"
                placeholder="Enter your age"
              />
            </div>

            <div>
              <Label htmlFor="snack" className="text-lg cartoon-font">
                Favourite Snack 🍕🍫🍟
              </Label>
              <Input
                id="snack"
                value={formData.snack}
                onChange={(e) => handleInputChange('snack', e.target.value)}
                className="mt-2 text-lg"
                placeholder="What's your favorite snack?"
              />
            </div>

            <div>
              <Label htmlFor="foodThoughts" className="text-lg cartoon-font">
                How many hours a day do you think about food?
              </Label>
              <Input
                id="foodThoughts"
                type="number"
                min="0"
                max="24"
                value={formData.foodThoughts}
                onChange={(e) => handleInputChange('foodThoughts', e.target.value)}
                className="mt-2 text-lg"
                placeholder="Be honest... 0-24 hours"
              />
              {formData.foodThoughts && (
                <p className="mt-2 text-sm italic">
                  {getFoodThoughtComment(parseInt(formData.foodThoughts))}
                </p>
              )}
            </div>
          </div>

          <Button
            variant="fun"
            size="lg"
            onClick={handleSubmit}
            className="w-full mt-8 text-xl py-4"
          >
            Next — Calculate My Destiny! ✨
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Survey;