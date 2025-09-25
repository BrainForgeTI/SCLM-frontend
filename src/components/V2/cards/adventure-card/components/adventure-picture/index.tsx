import { Card } from "@/components/ui/card";
import { Camera, Image } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface AdventurePictureProps {
  form: UseFormReturn<any>;
}

export const AdventurePicture = () => {
  return (
    <Card className="w-25 h-25 rounded-xl flex justify-center items-center">
      <Camera size={60} strokeWidth={1} opacity={0.3} />
    </Card>
  );
};
