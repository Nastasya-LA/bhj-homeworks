"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface PollData {
  id: number;
  data: {
    title: string;
    answers: string[];
  };
}

interface PollStats {
  stat: Array<{
    answer: string;
    votes: number;
  }>;
}

const PollComponent = () => {
  const [pollData, setPollData] = React.useState<PollData | null>(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadPollData = async () => {
      try {
        const response = await fetch("https://students.netoservices.ru/nestjs-backend/poll");
        if (!response.ok) throw new Error("Ошибка при получении данных опроса");
        
        const data: PollData = await response.json();
        setPollData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка при загрузке данных");
      } finally {
        setIsLoading(false);
      }
    };

    loadPollData();
  }, []);

  const handleVote = async (answerIndex: number) => {
    if (!pollData) return;
    
    try {
      const response = await fetch("https://students.netoservices.ru/nestjs-backend/poll", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `vote=${pollData.id}&answer=${answerIndex}`,
      });

      if (!response.ok) throw new Error("Ошибка при отправке голоса");

      setShowDialog(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка при отправке голоса");
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        {error}
      </div>
    );
  }

  if (isLoading || !pollData) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Загрузка...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">{pollData.data.title}</h2>

      <div className="space-y-3">
        {pollData.data.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleVote(index)}
            variant="outline"
            className="w-full text-left h-auto py-3 px-4"
          >
            {answer}
          </Button>
        ))}
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Спасибо!</DialogTitle>
            <DialogDescription>
              Ваш голос засчитан!
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PollComponent;