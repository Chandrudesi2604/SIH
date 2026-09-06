import React, { useState } from 'react';
import { SkillAssessmentQuestion, SkillAssessmentResult } from '../../types';
import {
  Award,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Zap,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface SkillAssessmentProps {
  questionsByDomain: Record<string, SkillAssessmentQuestion[]>;
  onAssessmentCompleted: (result: SkillAssessmentResult) => void;
  onNavigate: (page: string) => void;
}

export const SkillAssessment: React.FC<SkillAssessmentProps> = ({
  questionsByDomain,
  onAssessmentCompleted,
  onNavigate,
}) => {
  const domains = Object.keys(questionsByDomain);
  const [selectedDomain, setSelectedDomain] = useState<string>(domains[0] || 'Full Stack');
  const [quizActive, setQuizActive] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<SkillAssessmentResult | null>(null);

  const currentQuestions = questionsByDomain[selectedDomain] || [];

  const handleStart = (domain: string) => {
    setSelectedDomain(domain);
    setQuizActive(true);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setResult(null);
  };

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optionIdx,
    });
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    currentQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const percentage = Math.round((correctCount / currentQuestions.length) * 100);
    let badgeLevel: SkillAssessmentResult['badgeLevel'] = 'Novice';
    if (percentage >= 85) badgeLevel = 'Master';
    else if (percentage >= 70) badgeLevel = 'Expert';
    else if (percentage >= 50) badgeLevel = 'Proficient';

    const testResult: SkillAssessmentResult = {
      domain: selectedDomain,
      score: correctCount,
      totalQuestions: currentQuestions.length,
      percentage,
      badgeLevel,
      feedback:
        percentage >= 75
          ? 'Outstanding mastery of industry architectural patterns and core concepts. Verified badge updated in National Registry 26044.'
          : 'Good foundational grasp. Review the explanations below and explore recommended NPTEL modules to close the remaining gap.',
      recommendedTopics:
        percentage >= 75
          ? ['Advanced Distributed Systems', 'Zero Trust API Infrastructure']
          : ['Microservices Design Patterns', 'OWASP Top 10 Hands-on Labs', 'Query Optimization'],
    };

    setResult(testResult);
    setQuizActive(false);
    onAssessmentCompleted(testResult);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Verified Skill Assessment Portal
          </h1>
          <span className="bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-200 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> SIH 26044 National Rubric
          </span>
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Objective assessments evaluated against real-time industry benchmark standards. Earn verified badges displayed on your digital portfolio.
        </p>
      </div>

      {!quizActive && !result && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {domains.map((domain) => {
              const qCount = questionsByDomain[domain]?.length || 0;
              return (
                <div
                  key={domain}
                  className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:border-emerald-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 w-fit mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-base text-stone-900 font-serif">{domain}</h3>
                    <p className="text-xs text-stone-500 mt-1">
                      {qCount} Curated Questions • AICTE Benchmark
                    </p>
                    <div className="mt-3 text-[11px] text-stone-600 space-y-1">
                      <div>⏱️ Time Limit: 10 mins</div>
                      <div>🎯 Passing Threshold: 70% for Gold Badge</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStart(domain)}
                    className="mt-5 w-full py-2 px-4 bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-sm"
                  >
                    Start Assessment &rarr;
                  </button>
                </div>
              );
            })}
          </div>

          <div className="bg-[#fbf9f4] p-5 rounded-2xl border border-stone-200 text-xs text-stone-700">
            <div className="font-bold text-stone-900 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              National Assessment Integrity Standards:
            </div>
            <p className="text-stone-600 leading-relaxed">
              Assessment questions are refreshed dynamically based on industry problem statements submitted for SIH 2026. Successful completions update your verified candidate profile seen by recruiters across the national grid.
            </p>
          </div>
        </div>
      )}

      {/* Live Quiz Interface */}
      {quizActive && currentQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {selectedDomain}
              </span>
              <span className="text-stone-500 font-medium">
                Question {currentIndex + 1} of {currentQuestions.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
              <Clock className="w-3.5 h-3.5" />
              <span>Time Remaining: 08:42</span>
            </div>
          </div>

          {/* Active Question Box */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-300 flex items-center justify-center font-bold text-stone-700 text-xs shrink-0 mt-0.5">
                {currentIndex + 1}
              </span>
              <p className="text-sm sm:text-base font-semibold text-stone-900 leading-relaxed">
                {currentQuestions[currentIndex].question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5 pt-2">
              {currentQuestions[currentIndex].options.map((opt, oIdx) => {
                const isSelected = selectedAnswers[currentIndex] === oIdx;
                return (
                  <div
                    key={oIdx}
                    onClick={() => handleSelectOption(currentIndex, oIdx)}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-semibold shadow-xs ring-1 ring-emerald-700'
                        : 'bg-stone-50/50 border-stone-200 text-stone-800 hover:bg-stone-100/80'
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-700 bg-emerald-700' : 'border-stone-400 bg-white'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation & Submit Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 text-xs">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-stone-100 cursor-pointer"
            >
              &larr; Previous
            </button>

            {currentIndex < currentQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(currentQuestions.length - 1, prev + 1))}
                className="px-5 py-2 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="px-6 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-black shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Test Evaluation
              </button>
            )}
          </div>
        </div>
      )}

      {/* Result Display */}
      {result && (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-md p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 mb-2">
              <Award className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-stone-900 font-serif">Assessment Completed!</h2>
            <p className="text-xs text-stone-600">{result.feedback}</p>
          </div>

          {/* Score Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-[#fbf9f4] rounded-xl border border-stone-200">
              <div className="text-2xl font-black text-emerald-800 font-serif">{result.percentage}%</div>
              <div className="text-[11px] font-bold text-stone-500 uppercase mt-0.5">Final Score</div>
              <div className="text-[10px] text-stone-400 mt-0.5">{result.score} of {result.totalQuestions} Correct</div>
            </div>

            <div className="p-4 bg-[#fbf9f4] rounded-xl border border-stone-200">
              <div className="text-2xl font-black text-amber-700 font-serif">{result.badgeLevel}</div>
              <div className="text-[11px] font-bold text-stone-500 uppercase mt-0.5">Earned Badge</div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">AICTE Verified</div>
            </div>

            <div className="p-4 bg-[#fbf9f4] rounded-xl border border-stone-200">
              <div className="text-2xl font-black text-stone-900 font-serif">{result.domain}</div>
              <div className="text-[11px] font-bold text-stone-500 uppercase mt-0.5">Evaluation Domain</div>
              <div className="text-[10px] text-stone-400 mt-0.5">SIH 26044 Standard</div>
            </div>
          </div>

          {/* Answer Key Explanations */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-bold text-sm text-stone-900 font-serif">Detailed Solution &amp; Explanations</h3>
            {currentQuestions.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.correctIndex;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-xs space-y-2 ${
                    isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-semibold text-stone-900">
                      Q{idx + 1}: {q.question}
                    </span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] shrink-0 ${
                        isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                    </span>
                  </div>
                  <div className="text-stone-700">
                    <div>
                      <strong>Your Answer:</strong>{' '}
                      {userAns !== undefined ? q.options[userAns] : 'Not Attempted'}
                    </div>
                    <div className="text-emerald-800 font-medium">
                      <strong>Correct Answer:</strong> {q.options[q.correctIndex]}
                    </div>
                  </div>
                  <p className="text-stone-600 bg-white/70 p-2 rounded border border-stone-200 italic text-[11px]">
                    {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-200 text-xs">
            <button
              onClick={() => {
                setResult(null);
                setQuizActive(false);
              }}
              className="px-4 py-2 rounded-lg border border-stone-300 text-stone-700 font-semibold hover:bg-stone-100 cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake or Try Another Domain
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('Skill Gap Analysis')}
                className="px-4 py-2 rounded-lg bg-[#0c2f21] hover:bg-[#14532d] text-white font-bold cursor-pointer"
              >
                View Skill Gap Impact &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
