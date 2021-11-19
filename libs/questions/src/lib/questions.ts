import { Question } from '@finnoconsult-test-trivia/api-interfaces';

interface APIResponse {
  response_code: number;
  results: Question[];
}

export function getQuestions(): APIResponse {
  return {
    response_code: 0,
    results: [
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'In%20past%20times%2C%20what%20would%20a%20gentleman%20keep%20in%20his%20fob%20pocket%3F',
        correct_answer: 'Watch',
        incorrect_answers: ['Money', 'Keys', 'Notebook'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'What%20is%20the%20largest%20organ%20of%20the%20human%20body%3F',
        correct_answer: 'Skin',
        incorrect_answers: ['Heart', 'large%20Intestine', 'Liver'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'On%20a%20dartboard%2C%20what%20number%20is%20directly%20opposite%20No.%201%3F',
        correct_answer: '19',
        incorrect_answers: ['20', '12', '15'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What%20alcoholic%20drink%20is%20made%20from%20molasses%3F',
        correct_answer: 'Rum',
        incorrect_answers: ['Gin', 'Vodka', 'Whisky'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What%20is%20%22dabbing%22%3F',
        correct_answer: 'A%20dance',
        incorrect_answers: [
          'A%20medical%20procedure',
          'A%20sport',
          'A%20language',
        ],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'What%20is%20the%20shape%20of%20the%20toy%20invented%20by%20Hungarian%20professor%20Ern%C5%91%20Rubik%3F',
        correct_answer: 'Cube',
        incorrect_answers: ['Sphere', 'Cylinder', 'Pyramid'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'Red%20Vines%20is%20a%20brand%20of%20what%20type%20of%20candy%3F',
        correct_answer: 'Licorice',
        incorrect_answers: ['Lollipop', 'Chocolate', 'Bubblegum'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What%20is%20Tasmania%3F',
        correct_answer: 'An%20Australian%20State',
        incorrect_answers: [
          'A%20flavor%20of%20Ben%20and%20Jerry%27s%20ice-cream',
          'A%20Psychological%20Disorder',
          'The%20Name%20of%20a%20Warner%20Brothers%20Cartoon%20Character',
        ],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question: 'Which%20candy%20is%20NOT%20made%20by%20Mars%3F',
        correct_answer: 'Almond%20Joy',
        incorrect_answers: ['M%26M%27s', 'Twix', 'Snickers'],
      },
      {
        category: 'General%20Knowledge',
        type: 'multiple',
        difficulty: 'easy',
        question:
          'The%20likeness%20of%20which%20president%20is%20featured%20on%20the%20rare%20%242%20bill%20of%20USA%20currency%3F',
        correct_answer: 'Thomas%20Jefferson',
        incorrect_answers: [
          'Martin%20Van%20Buren',
          'Ulysses%20Grant',
          'John%20Quincy%20Adams',
        ],
      },
    ],
  };
}
