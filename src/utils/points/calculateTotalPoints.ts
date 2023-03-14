import { Database } from '../../../types/supabase';

export interface PointsModel {
  completedQuestions: number;
  totalPoints: number;
  availablePoints: number;
  thisPenalty: number;
}

const calculateTotalPoints = (
  aPs: Database['public']['Tables']['bat_adjacency_pairs']['Row'][],
) => {
  let totalPenalty = 0;
  let thisPenalty = 0;
  let totalPoints = 0;
  const completedQuestionIDs: number[] = [];
  const startingPoints = 3;

  aPs.forEach((aP) => {
    thisPenalty = 0;

    if (aP.retry_attempt === 0) {
      totalPenalty = 0;
    }

    if (aP.correct === false) {
      if (totalPenalty !== startingPoints) {
        totalPenalty += 1;
        thisPenalty = 1;
      } else {
        totalPenalty = 0;
      }
    }
    if (aP.hint) {
      totalPenalty += 1;
      thisPenalty = 1;
    }
    if (aP.correct) {
      totalPoints += startingPoints - totalPenalty;
      totalPenalty = 0;
    }

    if (
      (!completedQuestionIDs.includes(aP.id) && aP.correct) ||
      (!aP.correct && aP.retry_attempt === 2)
    ) {
      completedQuestionIDs.push(aP.id);
    }
  });

  return {
    completedQuestions: completedQuestionIDs.length,
    totalPoints: totalPoints,
    availablePoints: startingPoints - totalPenalty,
    thisPenalty: thisPenalty,
  };
};

export default calculateTotalPoints;
