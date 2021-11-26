import LinearProgress, {
  LinearProgressProps,
} from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

export default function Progress(props: any) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress((props.current / props.total) * 100);
  }, [props]);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontWeight: 'bold' }}>
          Question {props.current + 1} out of {props.total}
        </span>
      </div>
    </Box>
  );
}
