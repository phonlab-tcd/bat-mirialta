/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePushRandomResponse } from '@/hooks';

const useGenerateResponseForIncorrect = () => {
  const pushRandomResponse = usePushRandomResponse();
  const generateResponseForIncorrect = (word: string, target: string, errorData: any) => {
    let addedFada = false;
    let missingFada = false;
    let wrongForm = false;
    let wrongTense = false;
    let wrongVerb = false;
    let wrongPerson = false;
    let minorTypo = false;
    let broadSlenderMistake = false;
    // let precedingWord = false;

    if (errorData.stringConjugationOutput === 'incorrectForm') {
      wrongForm = true;
    } else if (errorData.stringConjugationOutput === 'incorrectPerson') {
      wrongPerson = true;
    } else if (errorData.stringConjugationOutput === 'incorrectTense') {
      wrongTense = true;
    } else if (errorData.stringConjugationOutput === 'incorrectVerb') {
      wrongVerb = true;
    } else if (errorData.fadaOutput === 'omittedFada') {
      missingFada = true;
    } else if (errorData.fadaOutput === 'extraFada') {
      addedFada = true;
    } else if (errorData.typoOutput == 1) {
      minorTypo = true;
    } else if (errorData.broadSlenderOutput === 'againstRule') {
      broadSlenderMistake = true;
    }
    // else if (errorData.precedingWord) {
    //   precedingWord = true
    // }

    // initial feedback
    let responseObject = pushRandomResponse([], 'feedback', 'incorrect', 'general', 'notice', {});

    // precedingWord
    // if (precedingWord) {
    //   responseObject = pushRandomResponse(
    //     responseObject,
    //     'feedback',
    //     'incorrect',
    //     'conjugation',
    //     'form',
    //     {},
    //   );
    // } else

    // return conjugation related message

    if (wrongForm) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'form',
        {},
      );
    } else if (wrongTense) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'tense',
        {},
      );
    } else if (wrongVerb) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'verb',
        {},
      );
    } else if (wrongPerson) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'person',
        {},
      );
    }

    // return typo related message
    else if (minorTypo) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'typo',
        'one',
        {},
      );
    }
    // return fada related message
    else if (missingFada) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'fada',
        'omitted',
        {},
      );
    } else if (addedFada) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'fada',
        'extra',
        {},
      );
    }
    // return broad/slender related message
    else if (broadSlenderMistake) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'broadSlender',
        'againstRule',
        {},
      );
    }
    // return default error message
    else {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'other',
        'error',
        {},
      );
    }
    return responseObject;
  };

  return generateResponseForIncorrect;
};

export default useGenerateResponseForIncorrect;
