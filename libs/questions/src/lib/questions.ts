import { Question } from '@finnoconsult-test-trivia/api-interfaces';
import axios from 'axios';

interface APIResponse {
  response_code: number;
  results: Question[];
}

// TODO: this is what you need to replace with a call to the backend

export async function getQuestions(): Promise<APIResponse> {
  const res = await axios.get('http://localhost:3333/api/question');
  const results: any[] = [];

  res.data.results.map((i: any) => {
    const { type, ...other } = i;
    results.push({
      ...other,
      answer_type: type,
    });
  });

  res.data.results = results;

  return res.data;
}
