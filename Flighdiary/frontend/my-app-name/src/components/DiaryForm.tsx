import React, { useState } from 'react';
import { createDiary } from '../services/diaries';
import { Weather, Visibility, NewDiaryEntry, DiaryEntry } from '../types';
import { TextField, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';

interface Props {
  addDiary: (diary: DiaryEntry) => void;
  setError: (error: string) => void;
}

const DiaryForm: React.FC<Props> = ({ addDiary, setError }) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newDiary: NewDiaryEntry = { date, weather, visibility, comment };
      const addedDiary = await createDiary(newDiary);
      addDiary(addedDiary);
      setDate('');
      setWeather(Weather.Sunny);
      setVisibility(Visibility.Good);
      setComment('');
    } catch (error) {
      setError('Failed to add diary entry');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={({ target }) => setDate(target.value)}
        fullWidth
        required
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Weather</FormLabel>
        <RadioGroup row value={weather} onChange={({ target }) => setWeather(target.value as Weather)}>
          {Object.values(Weather).map((w) => (
            <FormControlLabel key={w} value={w} control={<Radio />} label={w} />
          ))}
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Visibility</FormLabel>
        <RadioGroup row value={visibility} onChange={({ target }) => setVisibility(target.value as Visibility)}>
          {Object.values(Visibility).map((v) => (
            <FormControlLabel key={v} value={v} control={<Radio />} label={v} />
          ))}
        </RadioGroup>
      </FormControl>
      <TextField
        label="Comment"
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        fullWidth
        required
      />
      <Button type="submit" variant="contained" color="primary" style={{ marginTop: '1rem' }}>
        Submit
      </Button>
    </form>
  );
};

export default DiaryForm;
