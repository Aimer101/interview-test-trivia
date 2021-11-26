import styled from '@emotion/styled';
import { useStatus, useSend } from './state/stateMachineContext';
import { Button } from '@mui/material';
import axios from 'axios';

/* eslint-disable-next-line */
export interface FinalProps {}

const StyledFinal = styled.div`
  text-align: center;
`;

const useGoodAnswerRate = (): [string | undefined, number] => {
  const state = useStatus();

  if (!state.context.answers) return [undefined, -1];

  const good = state.context.answers.filter((answer) => answer.correct).length;

  return [state.context.user?.name, good / state.context.answers.length];
};

export function Final(props: FinalProps) {
  const [username, result] = useGoodAnswerRate();
  const send = useSend();

  if (result > 0.8) {
    return (
      <StyledFinal>
        <h1>Congratulations {username}!</h1>
        <h2>
          You had passed the trivia game, you are amongst the very best as
          succeeded 80% threshold,
        </h2>
        <h1>
          <span role="img" aria-label="tada for congratulation">
            🎉
          </span>
        </h1>
      </StyledFinal>
    );
  }

  return (
    <StyledFinal>
      <h2>
        You had answered correctly {Math.round(result * 100)}% of the trivia
        questions.
      </h2>
      <Button variant="contained" onClick={() => send('RETRY')}>
        Try again
      </Button>
    </StyledFinal>
  );
}

export default Final;
