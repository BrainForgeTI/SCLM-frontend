import { useEffect, useState } from "react";

interface ClockCardProps {
    targetHour: number;
    targetMinute: number;
    targetSecond: number;
  }
  
  export const ClockCard = ({ targetHour, targetMinute, targetSecond }: ClockCardProps) => {
    const calculateRemainingTime = () => {
      const now = new Date();
      const target = new Date();
  
      target.setHours(targetHour, targetMinute, targetSecond, 0);
  
      // Se o horário já passou hoje, joga pra o mesmo horário de amanhã
      if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1);
      }
  
      const diff = Math.floor((target.getTime() - now.getTime()) / 1000); // em segundos
      return diff;
    };
  
    const [secondsLeft, setSecondsLeft] = useState(calculateRemainingTime());
  
    useEffect(() => {
      const interval = setInterval(() => {
        setSecondsLeft(calculateRemainingTime());
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    const formatTime = (value: number) => value.toString().padStart(2, "0");
  
    const hours = formatTime(Math.floor(secondsLeft / 3600));
    const minutes = formatTime(Math.floor((secondsLeft % 3600) / 60));
    const seconds = formatTime(secondsLeft % 60);
  
  return (
    <div className="text-neutral/40 text-[20px]">
       Novas missões em {hours}:{minutes}:{seconds}
    </div>
      
   
  );
};
