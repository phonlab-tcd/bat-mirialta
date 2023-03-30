/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseModel } from '@/models';

const generateResponseForIncorrect = (word: string, target: string, errorData: any) => {
  console.log(word, target, errorData);
  const responseObject: ResponseModel[] = [];

  let addedFada = false;
  let missingFada = false;
  let wrongPerson = false;
  let wrongTense = false;
  let wrongForm = false;
  let minorTypo = false;
  let broadSlenderMistake = false;

  if (errorData.conjugationOutput == 'incorrectPerson') {
    wrongPerson = true;
  } else if (errorData.conjugationOutput == 'incorrectTense') {
    wrongTense = true;
  } else if (errorData.conjugationOutput == 'incorrectForm') {
    wrongForm = true;
  } else if (errorData.typoOutput == 1) {
    minorTypo = true;
  } else if (errorData.fadaOutput == 'omittedFada') {
    missingFada = true;
  } else if (errorData.fadaOutput == 'extraFada') {
    addedFada = true;
  } else if (errorData.broadSlenderOutput == 'againstRule') {
    broadSlenderMistake = true;
  }

  const errorDataToHumanReadable = {
    fada: {
      omittedFada: ['hey, you left out a fada', 'looks like no fada', 'add in a fada somewhere'],
      extraFada: ['wow, no need for that fada', "you don't always need a fada"],
    },
    conjugation: {
      person: [
        'tense is right, but check who is doing the action',
        'the person is incorrect',
        'try to figure out who is doing the action',
      ],
      form: [`you said ${word}, but watch out for the correct form`, ''],
      tense: ['remember to use the right tense', 'tense!'],
    },
    typo: {
      one: ['watch out for any minor typos!', 'careful now', "don't add in any"],
    },
    broadSlender: {
      againstRule: [
        'remember the caol le caol, leathan le leathan rule',
        'watch out for the broad/slender vowels',
      ],
    },
    other: {
      otherError: ['you might want to rethink that one', 'have another go'],
    },
  };

  const incorrectResponses = ['níl se ceart', 'mícheart'];

  responseObject.push({
    text: incorrectResponses[Math.floor(Math.random() * incorrectResponses.length)],
    form: 'statement',
  });

  // return conjugation related message
  if (wrongPerson) {
    responseObject.push({
      text: errorDataToHumanReadable.conjugation.person[
        Math.floor(Math.random() * errorDataToHumanReadable.conjugation.person.length)
      ],
      form: 'statement',
    });
  } else if (wrongTense) {
    responseObject.push({
      text: errorDataToHumanReadable.conjugation.tense[
        Math.floor(Math.random() * errorDataToHumanReadable.conjugation.tense.length)
      ],
      form: 'statement',
    });
  } else if (wrongForm) {
    responseObject.push({
      text: errorDataToHumanReadable.conjugation.form[
        Math.floor(Math.random() * errorDataToHumanReadable.conjugation.form.length)
      ],
      form: 'statement',
    });
  }
  // return typo related message
  else if (minorTypo) {
    responseObject.push({
      text: errorDataToHumanReadable.typo.one[
        Math.floor(Math.random() * errorDataToHumanReadable.typo.one.length)
      ],
      form: 'statement',
    });
  }
  // return fada related message
  else if (missingFada) {
    responseObject.push({
      text: errorDataToHumanReadable.fada.omittedFada[
        Math.floor(Math.random() * errorDataToHumanReadable.fada.omittedFada.length)
      ],
      form: 'statement',
    });
  } else if (addedFada) {
    responseObject.push({
      text: errorDataToHumanReadable.typo.one[
        Math.floor(Math.random() * errorDataToHumanReadable.typo.one.length)
      ],
      form: 'statement',
    });
  }
  // return broad/slender related message
  else if (broadSlenderMistake) {
    responseObject.push({
      text: errorDataToHumanReadable.broadSlender.againstRule[
        Math.floor(Math.random() * errorDataToHumanReadable.broadSlender.againstRule.length)
      ],
      form: 'statement',
    });
  }
  // return default error message
  else {
    responseObject.push({
      text: errorDataToHumanReadable.other.otherError[
        Math.floor(Math.random() * errorDataToHumanReadable.other.otherError.length)
      ],
      form: 'statement',
    });
  }

  return responseObject;
};

export default generateResponseForIncorrect;
