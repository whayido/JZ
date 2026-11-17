'use client';

import { useRef, useState } from 'react';
import { PRINTERS, Printer } from '../types';

interface Props {
  onSubmit: (data: {
    description: string;
    urgent: boolean;
    printer: Printer | null;
    imageName: string | null;
  }) => void;
}

const MAX_LENGTH = 250;

export default function RequestForm({ onSubmit }: Props) {
  const [description, setDescription] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [usePrinter, setUsePrinter] = useState(false);
  const [printer, setPrinter] = useState<Printer>(PRINTERS[0].value);
  const [imageName, setImageName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_LENGTH) {
      setDescription(value);
    } else {
      setDescription(value.slice(0, MAX_LENGTH));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageName(file ? file.name : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onSubmit({
      description: description.trim(),
      urgent,
      printer: usePrinter ? printer : null,
      imageName,
    });

    // сброс формы
    setDescription('');
    setUrgent(false);
    setUsePrinter(false);
    setPrinter(PRINTERS[0].value);
    setImageName(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const remaining = MAX_LENGTH - description.length;
  const isLimit = description.length >= MAX_LENGTH;

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Новая заявка</h2>

      <div className="field">
        <label className="label" htmlFor="description">
          Опишите вашу проблему
        </label>
        <textarea
          id="description"
          className="textarea"
          value={description}
          onChange={handleTextChange}
          placeholder="Что случилось? Опишите проблему..."
          maxLength={MAX_LENGTH}
        />
        <div className={`counter ${isLimit ? 'limit' : ''}`}>
          {remaining} / {MAX_LENGTH}
        </div>
      </div>

      <div className="field">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={urgent}
            onChange={(e) => setUrgent(e.target.checked)}
          />
          Срочно
        </label>
      </div>

      <div className="field">
        <label className="checkbox-row">
          <input
            type="checkbox"
            checked={usePrinter}
            onChange={(e) => setUsePrinter(e.target.checked)}
          />
          Указать принтер
        </label>
        <div style={{ marginTop: 8 }}>
          <select
            className="select"
            value={printer}
            onChange={(e) => setPrinter(e.target.value as Printer)}
            disabled={!usePrinter}
          >
            {PRINTERS.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="field">
        <div className="file-row">
          <label className="file-btn">
            Добавить изображение...
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </label>
          {imageName && <span className="file-name">{imageName}</span>}
        </div>
      </div>

      <button type="submit" className="btn-primary" disabled={!description.trim()}>
        Отправить заявку
      </button>
    </form>
  );
}