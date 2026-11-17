'use client';

import { useMemo, useState } from 'react';
import { PRINTERS, Request, RequestStatus } from '../types';

interface Props {
  requests: Request[];
  onAccept: (id: string) => void;
  onDone: (id: string) => void;
}

type Filter = 'all' | RequestStatus;

const FILTER_LABELS: Record<Filter, string> = {
  all: 'Все',
  new: 'Новые',
  accepted: 'Принятые',
  done: 'Выполненные',
};

const STATUS_LABEL: Record<RequestStatus, string> = {
  new: 'Новая',
  accepted: 'Принята',
  done: 'Выполнена',
};

const STATUS_CLASS: Record<RequestStatus, string> = {
  new: 'badge-new',
  accepted: 'badge-accepted',
  done: 'badge-done',
};

export default function RequestList({ requests, onAccept, onDone }: Props) {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter]
  );

  return (
    <div className="card">
      <h2>Журнал заявок</h2>

      <div className="filters">
        {(Object.keys(FILTER_LABELS) as Filter[]).map((f) => (
          <button
            key={f}
            type="button"
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {FILTER_LABELS[f]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty">Заявок пока нет</div>
      ) : (
        <div className="req-list">
          {filtered.map((r) => {
            const printerLabel = r.printer
              ? PRINTERS.find((p) => p.value === r.printer)?.label
              : null;

            return (
              <div key={r.id} className="req">
                <div className="req-head">
                  <span className="req-id">#{r.id.slice(-5).toUpperCase()}</span>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {r.urgent && <span className="badge badge-urgent">Срочно</span>}
                    <span className={`badge ${STATUS_CLASS[r.status]}`}>
                      {STATUS_LABEL[r.status]}
                    </span>
                  </div>
                </div>

                <p className="req-desc">{r.description}</p>

                <div className="req-meta">
                  <span>
                    Создана: {new Date(r.createdAt).toLocaleString('ru-RU')}
                  </span>
                  {printerLabel && <span>Принтер: {printerLabel}</span>}
                  {r.imageName && <span>Изображение: {r.imageName}</span>}
                </div>

                <div className="req-actions">
                  {r.status === 'new' && (
                    <button
                      type="button"
                      className="btn-sm btn-accept"
                      onClick={() => onAccept(r.id)}
                    >
                      Принять
                    </button>
                  )}
                  {r.status === 'accepted' && (
                    <button
                      type="button"
                      className="btn-sm btn-done"
                      onClick={() => onDone(r.id)}
                    >
                      Завершить
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}