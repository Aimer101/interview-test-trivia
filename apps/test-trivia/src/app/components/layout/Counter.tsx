import { useState, useEffect } from 'react';
export default function Counter(props: any) {
  const [time, setTime] = useState(10);
  const [timeString, setTimeString] = useState('');
  const [stackId, setStackId] = useState<any>(0);

  useEffect(() => {
    clearTimeout(stackId);
    setTime(10);
  }, [props.question]);

  useEffect(() => {
    function countDown() {
      const id = setTimeout(() => setTime((t) => t - 1), 1000);
      setStackId(id);
    }

    time > 0 && countDown();

    time === 0 && props.setFinish(true);
  }, [time, props.finish]);

  useEffect(() => {
    const t2s = time.toString();
    const newT2s = t2s.length === 1 ? '0' + t2s : t2s;
    setTimeString(newT2s);
  }, [time]);

  return (
    <div
      style={{
        display: `flex`,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <span style={{ fontWeight: 'bold' }}>TIMER</span>
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ flex: 1 }}>00 :&nbsp;</span>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span style={{ flex: 1 }}> {timeString}</span>
        </div>
      </div>
    </div>
  );
}
