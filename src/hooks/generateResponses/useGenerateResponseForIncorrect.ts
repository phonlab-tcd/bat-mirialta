/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePushRandomResponse } from '@/hooks';

const useGenerateResponseForIncorrect = () => {
  const pushRandomResponse = usePushRandomResponse();
  const generateResponseForIncorrect = (word: string, target: string, errorData: any) => {
    let addedFada = false;
    let missingFada = false;
    let wrongForm = false;
    let wrongNegativeForm = false;
    let wrongTense = false;
    let wrongVerb = false;
    let wrongPerson = false;
    let minorTypo = false;
    let broadSlenderMistake = false;

    let precedingWordError = false;
    let niNotNior = false;
    let niorNotNi = false;
    let arNotAn = false;
    let anNotAr = false;
    let nachError = false;
    let goError = false;

    // first, check if there was an error made with the preceding word
    if (errorData.precedingWordOutput !== 'none') {
      precedingWordError = true;
      if (errorData.precedingWordOutput === 'niNotNior') {
        niNotNior = true;
      } else if (errorData.precedingWordOutput === 'niorNotNi') {
        niorNotNi = true;
      } else if (errorData.precedingWordOutput === 'arNotAn') {
        arNotAn = true;
      } else if (errorData.precedingWordOutput === 'anNotAr') {
        anNotAr = true;
      } else if (errorData.precedingWordOutput === 'nachError') {
        nachError = true;
      } else if (errorData.precedingWordOutput === 'goError') {
        goError = true;
      }
    }

    // if no error is found, run through the rest of the error checkers
    else if (errorData.stringConjugationOutput === 'incorrectForm') {
      wrongForm = true;
    } else if (errorData.stringConjugationOutput === 'incorrectNegativeForm') {
      wrongNegativeForm = true;
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

    // return preceding word message
    if (precedingWordError) {
      console.log('precedingWordError:', precedingWordError);
      if (niNotNior) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'niNotNior',
          {},
        );
      } else if (niorNotNi) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'niorNotNi',
          {},
        );
      } else if (anNotAr) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'anNotAr',
          {},
        );
      } else if (arNotAn) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'arNotAn',
          {},
        );
      } else if (nachError) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'nachError',
          {},
        );
      } else if (goError) {
        responseObject = pushRandomResponse(
          responseObject,
          'feedback',
          'incorrect',
          'precedingWord',
          'goError',
          {},
        );
      }
    }

    // return conjugation related message
    else if (wrongForm) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'form',
        {},
      );
    } else if (wrongNegativeForm) {
      responseObject = pushRandomResponse(
        responseObject,
        'feedback',
        'incorrect',
        'conjugation',
        'negativeForm',
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
