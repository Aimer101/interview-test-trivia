import { assign, createMachine } from 'xstate';
import {
  Question,
  Answer,
  UserData,
  createAnswer,
} from '@finnoconsult-test-trivia/api-interfaces';
import { getQuestions } from '@finnoconsult-test-trivia/questions';
import axios from 'axios';

interface AnswerEventData extends Question {
  answer: string;
}

type AnswerEvent = { type: 'ANSWER' } & AnswerEventData;

export type MachineEvent = { type: 'LOGIN' } | { type: 'RETRY' } | AnswerEvent;

function isAnswerEvent(event: MachineEvent): event is AnswerEvent {
  return event.type === 'ANSWER';
}

export interface MachineContext {
  questions?: Question[];
  answers?: Answer[];
  user?: UserData;
}

const sendUserToBackend = async (context: any) => {
  const { user } = context;

  try {
    const res = await axios.post('http://localhost:3333/api/login', {
      name: user.username,
    });
    const { accessToken } = res.data;
    window.localStorage.setItem('token', accessToken);
  } catch (e) {
    console.log(e);
  }
};

const loadQuestions = async () => {
  return await getQuestions();
};

const sendResultToBackend = async (context: any) => {
  const token = window.localStorage.getItem('token');
  let score = 0;

  context.answers.map(
    (i: { answer: string; correct: boolean }) => i.correct && score++
  );
  score = score / context.answers.length;
  try {
    axios.put(
      'http://localhost:3333/api/score',
      {
        newScore: score * 100,
      },
      {
        headers: {
          token: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {
    console.log(e);
  }
};

export const gameState = createMachine<MachineContext, MachineEvent>(
  {
    id: 'triviaGame',
    initial: 'idle',
    states: {
      idle: {
        on: {
          LOGIN: {
            target: 'loading',
            actions: ['setUser', 'sendUserToBackend'],
          },
        },
      },

      loading: {
        // onEntry: 'cleanUp',
        invoke: {
          src: loadQuestions,
          onDone: {
            target: 'question',
            actions: 'storeQuestions',
          },
          onError: {
            target: 'error',
            actions: 'handleError',
          },
        },
      },
      error: {
        on: {
          RETRY: {
            target: 'loading',
          },
        },
      },
      question: {
        on: {
          ANSWER: [
            {
              target: 'question',
              cond: { type: 'hasMoreQuestion' },
              actions: 'setAnswer',
            },
            {
              target: 'final',
            },
          ],
        },
      },
      final: {
        // due that cond hasMoreQuestion is executed first, we need to store last answer here
        onEntry: ['setAnswer', 'sendResultToBackend'],
        on: {
          RETRY: {
            actions: 'cleanUp',
            target: 'loading',
          },
        },
      },
    },
  },
  {
    actions: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleError: (error: any) => console.error(error),
      storeQuestions: assign(
        (_context: MachineContext, { type: _type, ...event }: any) => {
          // console.log('storeQuestions', _type, event);
          return { questions: event?.data?.results };
        }
      ),
      setUser: assign(
        (_context: MachineContext, { type: _type, ...user }: any) => {
          return { user };
        }
      ),
      setAnswer: assign(
        (context: MachineContext, { type: _type, ...eventData }: any) => {
          // console.log('setAnswer', _type, eventData, context);
          const answer = createAnswer(eventData, eventData.answer);
          return {
            answers: context.answers ? [...context.answers, answer] : [answer],
          };
        }
      ),
      cleanUp: assign(
        (context: MachineContext, { type: _type, ...eventData }: any) => {
          // console.warn('cleanUp!!!');
          return { questions: undefined, answers: undefined };
        }
      ),
      sendUserToBackend,
      sendResultToBackend,
    },
    guards: {
      hasMoreQuestion: (context: MachineContext, event: any) => {
        if (isAnswerEvent(event)) {
          return (
            (context.answers?.length || 0) + (event.answer ? 1 : 0) <
            (context?.questions?.length || 0)
          );
        }
        return true;
      },
    },
  }
);
