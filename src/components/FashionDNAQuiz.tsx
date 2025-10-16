import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Dna, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "Which environment energizes you most?",
    options: [
      { text: "Urban cityscapes", archetype: "modern" },
      { text: "Art galleries & museums", archetype: "artistic" },
      { text: "Nature & gardens", archetype: "organic" },
      { text: "Elegant ballrooms", archetype: "classic" },
    ],
  },
  {
    id: 2,
    question: "Your ideal color palette?",
    options: [
      { text: "Bold & contrasting", archetype: "modern" },
      { text: "Earthy & neutral", archetype: "organic" },
      { text: "Rich jewel tones", archetype: "classic" },
      { text: "Eclectic & unexpected", archetype: "artistic" },
    ],
  },
  {
    id: 3,
    question: "How do you approach fashion?",
    options: [
      { text: "Timeless elegance", archetype: "classic" },
      { text: "Experimental & unique", archetype: "artistic" },
      { text: "Clean & minimalist", archetype: "modern" },
      { text: "Comfortable & natural", archetype: "organic" },
    ],
  },
];

const archetypes = {
  modern: { name: "Modern Visionary", color: "from-slate-500 to-zinc-600", icon: "⚡" },
  classic: { name: "Classic Elegance", color: "from-amber-400 to-yellow-600", icon: "👑" },
  artistic: { name: "Artistic Soul", color: "from-purple-500 to-pink-600", icon: "🎨" },
  organic: { name: "Organic Harmony", color: "from-green-400 to-emerald-600", icon: "🌿" },
};

const FashionDNAQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const handleAnswer = (archetype: string) => {
    const newAnswers = [...answers, archetype];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: string[]) => {
    const counts: Record<string, number> = {};
    finalAnswers.forEach((answer) => {
      counts[answer] = (counts[answer] || 0) + 1;
    });
    const dominant = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    setResult(dominant);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  const progress = ((currentQuestion + (result ? 1 : 0)) / questions.length) * 100;

  if (result) {
    const archetype = archetypes[result as keyof typeof archetypes];
    return (
      <section className="py-24 px-4 bg-gradient-to-b from-accent/5 to-background">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <CardTitle className="text-4xl font-serif mb-2">Your Fashion DNA</CardTitle>
              <CardDescription className="text-lg">Discover your unique style identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className={`p-8 rounded-2xl bg-gradient-to-br ${archetype.color} text-white`}>
                <div className="text-6xl text-center mb-4">{archetype.icon}</div>
                <h3 className="text-3xl font-bold text-center mb-4">{archetype.name}</h3>
                <p className="text-center text-lg opacity-90">
                  {result === "modern" && "You embrace clean lines, innovation, and contemporary aesthetics. Your style is forward-thinking and effortlessly chic."}
                  {result === "classic" && "Timeless sophistication defines you. You appreciate quality, tradition, and pieces that transcend trends."}
                  {result === "artistic" && "Creative expression flows through your wardrobe. You're drawn to unique pieces that tell a story."}
                  {result === "organic" && "Natural beauty and comfort guide your choices. You value sustainability and authentic materials."}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">DNA-{result.substring(0, 3).toUpperCase()}</div>
                      <p className="text-sm text-muted-foreground">Your Style Code</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-accent mb-2">85%</div>
                      <p className="text-sm text-muted-foreground">Match Confidence</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">12</div>
                      <p className="text-sm text-muted-foreground">Curated Pieces</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-4 justify-center">
                <Button size="lg" onClick={resetQuiz}>
                  Retake Quiz
                </Button>
                <Button size="lg" variant="outline">
                  View My Collections
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-accent/5 to-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Dna className="w-5 h-5" />
            <span className="font-semibold">Fashion DNA Quiz</span>
          </div>
          <h2 className="font-serif text-4xl mb-4">Discover Your Style Identity</h2>
          <p className="text-muted-foreground">Answer a few questions to unlock your unique fashion DNA profile</p>
        </div>

        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card className="border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {questions[currentQuestion].options.map((option, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full h-auto py-6 px-6 text-left justify-start hover:bg-primary/5 hover:border-primary transition-all"
                onClick={() => handleAnswer(option.archetype)}
              >
                <div className="flex items-center gap-4 w-full">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg flex-1">{option.text}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Button>
            ))}
          </CardContent>
          {currentQuestion > 0 && (
            <div className="px-6 pb-6">
              <Button variant="ghost" onClick={goBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Previous Question
              </Button>
            </div>
          )}
        </Card>
      </div>
    </section>
  );
};

export default FashionDNAQuiz;
