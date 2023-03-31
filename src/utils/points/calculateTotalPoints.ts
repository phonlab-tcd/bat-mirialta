import { Database } from '../../../types/supabase';

export interface PointsModel {
  completedQuestions: number;
  totalPoints: number;
  availablePoints: number;
  mostRecentPenalty: number;
}

const calculateTotalPoints = (
  aPs: Database['public']['Tables']['bat_adjacency_pairs']['Row'][],
) => {
  let totalPenalty = 0;
  let mostRecentPenalty = 0;
  let totalPoints = 0;
  const completedQuestionIDs: number[] = [];
  const startingPoints = 10;

  aPs.forEach((aP) => {
    mostRecentPenalty = 0;

    if (aP.retry_attempt === 0) {
      totalPenalty = 0;
    }

    if (aP.correct === false) {
      mostRecentPenalty = 2;
      totalPenalty += mostRecentPenalty;
      if (Array.isArray(aP.hints)) {
        totalPenalty += aP.hints.length * 3;
      }
    } else {
      if (Array.isArray(aP.hints)) {
        totalPenalty += aP.hints.length * 3;
        mostRecentPenalty = 3;
      }
    }

    if (aP.correct) {
      totalPoints += startingPoints - totalPenalty;
      totalPenalty = 0;
    }

    if (
      (!completedQuestionIDs.includes(aP.id) && aP.correct) ||
      (aP.correct === false && totalPenalty >= 10)
    ) {
      completedQuestionIDs.push(aP.id);
    }
  });

  return {
    completedQuestions: completedQuestionIDs.length,
    totalPoints: totalPoints,
    availablePoints: startingPoints - totalPenalty,
    mostRecentPenalty: mostRecentPenalty,
  };
};

export default calculateTotalPoints;
