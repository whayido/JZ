'use client';

import { useState } from 'react';
import RequestForm from './components/RequestForm';
import RequestList from './components/RequestList';
import { Printer, Request } from './types';

export default function HomePage() {
  const [requests, setRequests] = useState<Request[]>([]);

  const handleSubmit = (data: {
    description: string;
    urgent: boolean;
    printer: Printer | null;
    imageName: string | null;
  }) => {
    const newRequest: Request = {
      id: crypto.randomUUID(),
      description: data.description,
      urgent: data.urgent,
      printer: data.printer,
      imageName: data.imageName,
      status: 'new',
      createdAt: new Date().toISOString(),
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleAccept = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'accepted' } : r))
    );
  };

  const handleDone = (id: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'done' } : r))
    );
  };

  return (
    <div className="container">
      <h1>📋 Журнал заявок</h1>
      <div className="layout">
        <RequestForm onSubmit={handleSubmit} />
        <RequestList
          requests={requests}
          onAccept={handleAccept}
          onDone={handleDone}
        />
      </div>
    </div>
  );
}