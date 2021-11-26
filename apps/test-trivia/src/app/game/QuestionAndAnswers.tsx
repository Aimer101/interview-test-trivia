import styled from '@emotion/styled';
import { Question } from '@finnoconsult-test-trivia/api-interfaces';
import { Button } from '@mui/material';
import Counter from '../components/layout/Counter';
import Progress from '../components/layout/Progress';
import { useSend, useStatus } from './state/stateMachineContext';
import { useState, useEffect } from 'react';

export interface QuestionWithRandomAnswers extends Question {
  random_answers: string[];
  current: number | undefined;
  total: number | undefined;
}

/* eslint-disable-next-line */
export interface QuestionProps {}

const QuestionStyles = styled.div`
  margin-bottom: 2rem;
`;
const AnswerStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  place-content: center;
`;

const useCurrentQuestion = (): QuestionWithRandomAnswers | null => {
  const status = useStatus();

  const question =
    status.context.questions?.[status.context.answers?.length || 0];

  if (!question) return null;
  const current = status.context?.answers?.length || 0;
  const total = status.context.questions?.length;

  return {
    ...question,
    current,
    total,
    random_answers: [...question.incorrect_answers, question.correct_answer]
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value),
  };
};

export function QuestionAndAnswers(props: QuestionProps) {
  const [finish, setFinish] = useState(false);
  const send = useSend();
  const question = useCurrentQuestion();

  useEffect(() => {
    finish === true &&
      send('ANSWER', { ...question, answer: question?.incorrect_answers[0] });
    setFinish(false);
  }, [finish]);

  if (!question) return <div>loading...</div>;

  return (
    <>
      <Counter setFinish={setFinish} question={question.current} />
      <QuestionStyles>
        <h1>{decodeURIComponent(question.question)}</h1>

        <AnswerStyles>
          {question.random_answers.map((answer) => (
            <Button
              key={answer}
              variant="contained"
              onClick={() => {
                send('ANSWER', { ...question, answer });
              }}
            >
              {decodeURIComponent(answer)}
            </Button>
          ))}
        </AnswerStyles>
      </QuestionStyles>
      <Progress current={question.current} total={question.total} />
    </>
  );
}

export default Question;
