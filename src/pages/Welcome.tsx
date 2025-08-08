import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-8">
        <h1 className="text-8xl cartoon-font text-primary wobble-animation mb-8">
          Weight-O-Matic
        </h1>
        
        <div className="fixed bottom-8 right-8">
          <Button
            variant="danger"
            size="lg"
            onClick={() => navigate("/security")}
            className="text-xl px-8 py-4 rounded-full"
          >
            Enter at Your Own Risk 😏⚠️
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;