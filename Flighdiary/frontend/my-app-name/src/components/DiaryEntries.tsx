import React from 'react';
import { DiaryEntry } from '../types';

interface Props {
  diaries: DiaryEntry[];
}

const DiaryEntries: React.FC<Props> = ({ diaries }) => (
  <div>
    <h1>Diary Entries</h1>
    {diaries.map((diary) => (
      <div key={diary.id}>
        <h3>{diary.date}</h3>
        <p>Visibility: {diary.visibility}</p>
        <p>Weather: {diary.weather}</p>
        <p>Comment: {diary.comment}</p>
      </div>
    ))}
  </div>
);

export default DiaryEntries;
