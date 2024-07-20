import React, { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import { getAllDiaries } from './services/diaries';
import DiaryForm from './components/DiaryForm';
import DiaryEntries from './components/DiaryEntries';

const App: React.FC = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllDiaries().then(setDiaries).catch(() => setError('Failed to fetch diaries'));
  }, []);

  const addDiary = (diary: DiaryEntry) => {
    setDiaries(diaries.concat(diary));
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1>Add an Entry</h1>
      <DiaryForm addDiary={addDiary} setError={setError} />
      <DiaryEntries diaries={diaries} />
    </div>
  );
};

export default App;
