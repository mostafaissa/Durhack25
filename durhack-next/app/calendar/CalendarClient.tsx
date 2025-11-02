"use client";
import React, { useEffect, useMemo, useState } from "react";

type EventItem = {
  id: string;
  date: string;
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
};

const STORAGE_KEY = "durhack_calendar_events";

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatMonthYear(date: Date) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function formatDateKey(date: Date) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function CalendarClient() {
  const [current, setCurrent] = useState<Date>(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<string>(
    formatDateKey(new Date())
  );
  const [events, setEvents] = useState<Record<string, EventItem[]>>({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEvents(JSON.parse(raw));
      else {
        // seed some demo events to match old HTML
        const demo: Record<string, EventItem[]> = {};
        const d1 = new Date();
        const key1 = d1.toISOString().slice(0, 10);
        demo[key1] = [
          {
            id: "e1",
            date: key1,
            title: "Morrison case review",
            startTime: "10:30",
            endTime: "11:30",
            description: "Case review meeting",
          },
        ];
        const d2 = new Date(d1.getFullYear(), d1.getMonth(), 2);
        const key2 = d2.toISOString().slice(0, 10);
        demo[key2] = [
          {
            id: "e2",
            date: key2,
            title: "Client presentation",
            startTime: "14:00",
            endTime: "15:00",
            description: "Project presentation",
          },
        ];
        setEvents(demo);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(demo));
      }
    } catch (e) {
      console.error("Failed to load events", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const monthMatrix = useMemo(() => {
    const monthStart = startOfMonth(current);
    const month = monthStart.getMonth();
    const year = monthStart.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const rows: (number | null)[][] = [];
    let week: (number | null)[] = [];
    // fill previous month blanks
    for (let i = 0; i < firstDay; i++) week.push(null);
    for (let day = 1; day <= daysInMonth; day++) {
      week.push(day);
      if (week.length === 7) {
        rows.push(week);
        week = [];
      }
    }
    if (week.length) {
      while (week.length < 7) week.push(null);
      rows.push(week);
    }
    return rows;
  }, [current]);

  function prevMonth() {
    setCurrent((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }
  function nextMonth() {
    setCurrent((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  function selectDay(day: number | null) {
    if (!day) return;
    const d = new Date(current.getFullYear(), current.getMonth(), day);
    const key = formatDateKey(d);
    setSelectedDate(key);
  }

  function handleDoubleClick(day: number | null) {
    if (!day) return;
    const d = new Date(current.getFullYear(), current.getMonth(), day);
    const key = formatDateKey(d);
    setSelectedDate(key);
    setShowModal(true);
  }

  function addEvent(eventData: Omit<EventItem, "id" | "date">) {
    const id = `evt_${Date.now()}`;
    setEvents((prev) => {
      const list = prev[selectedDate] ? [...prev[selectedDate]] : [];
      const nextList = [...list, { ...eventData, id, date: selectedDate }];
      return { ...prev, [selectedDate]: nextList };
    });
  }

  function deleteEvent(id: string) {
    setEvents((prev) => {
      const copy = { ...prev };
      for (const k of Object.keys(copy)) {
        copy[k] = copy[k].filter((e) => e.id !== id);
        if (copy[k].length === 0) delete copy[k];
      }
      return copy;
    });
  }

  const selectedEvents = events[selectedDate] || [];

  return (
    <div className="calendar-grid-layout">
      <div className="card">
        <div className="card-header-flex">
          <h3 id="calendar-month-year">{formatMonthYear(current)}</h3>
          <div>
            <button className="btn-icon" id="prev-month" onClick={prevMonth}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="btn-icon" id="next-month" onClick={nextMonth}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <div className="card-body">
          <div className="calendar-container">
            <div className="calendar-header">Sun</div>
            <div className="calendar-header">Mon</div>
            <div className="calendar-header">Tue</div>
            <div className="calendar-header">Wed</div>
            <div className="calendar-header">Thu</div>
            <div className="calendar-header">Fri</div>
            <div className="calendar-header">Sat</div>
            {monthMatrix.map((week, wi) => (
              <React.Fragment key={wi}>
                {week.map((day, di) => {
                  const isToday =
                    day === new Date().getDate() &&
                    current.getMonth() === new Date().getMonth() &&
                    current.getFullYear() === new Date().getFullYear();
                  const key = day
                    ? formatDateKey(
                        new Date(current.getFullYear(), current.getMonth(), day)
                      )
                    : "";
                  const hasEvents = day
                    ? events[key] && events[key].length > 0
                    : false;
                  return (
                    <div
                      key={di}
                      className={`calendar-day ${day ? "" : "other-month"} ${
                        isToday && day ? "today" : ""
                      } ${selectedDate === key ? "selected" : ""}`}
                      onClick={() => selectDay(day)}
                      onDoubleClick={() => handleDoubleClick(day)}
                    >
                      {day && <div className="day-number">{day}</div>}
                      {hasEvents && (
                        <div className="event-previews">
                          {events[key].map(
                            (event, i) =>
                              i < 2 && (
                                <div key={event.id} className="event-preview">
                                  <span className="event-time-preview">
                                    {event.startTime}
                                  </span>
                                  <span className="event-title-preview">
                                    {event.title}
                                  </span>
                                </div>
                              )
                          )}
                          {events[key].length > 2 && (
                            <div className="more-events">
                              +{events[key].length - 2} more
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <aside className="sidebar">
        <div className="card">
          <div className="card-header">
            <h3 id="schedule-title">
              {new Date(selectedDate).toLocaleDateString()}
            </h3>
          </div>
          <div className="card-body" id="schedule-body">
            {selectedEvents.length === 0 && (
              <p className="empty-state">No events scheduled</p>
            )}
            {selectedEvents.length > 0 && (
              <ul className="priority-list">
                {selectedEvents.map((ev) => (
                  <li
                    key={ev.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div>
                      <span className="priority-dot" />
                      <div>{ev.title}</div>
                      <div className="event-time">
                        {ev.startTime} - {ev.endTime}
                      </div>
                      {ev.description && (
                        <div className="event-description">
                          {ev.description}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        className="btn-icon"
                        onClick={() => deleteEvent(ev.id)}
                        title="Delete event"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Add Event</h3>
          </div>
          <div className="card-body">
            <AddEventForm onAdd={addEvent} />
          </div>
        </div>
      </aside>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                Add Event for {new Date(selectedDate).toLocaleDateString()}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <AddEventForm
                onAdd={(eventData) => {
                  addEvent(eventData);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AddEventForm({
  onAdd,
}: {
  onAdd: (event: Omit<EventItem, "id" | "date">) => void;
}) {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !startTime || !endTime) return;

    onAdd({
      title: title.trim(),
      startTime,
      endTime,
      description: description.trim(),
    });

    setTitle("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
    // Set end time to 1 hour after start time if not already set
    if (!endTime) {
      const startDate = new Date(`1970-01-01T${e.target.value}`);
      startDate.setHours(startDate.getHours() + 1);
      setEndTime(startDate.toTimeString().slice(0, 5));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="form-group">
        <label htmlFor="event-title">Event Title *</label>
        <input
          id="event-title"
          type="text"
          className="form-input"
          placeholder="Enter event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          autoFocus
        />
      </div>

      <div className="form-group time-inputs">
        <div className="time-input-group">
          <label htmlFor="event-start-time">Start Time *</label>
          <input
            id="event-start-time"
            type="time"
            className="form-input"
            value={startTime}
            onChange={handleStartTimeChange}
            required
          />
        </div>

        <div className="time-input-group">
          <label htmlFor="event-end-time">End Time *</label>
          <input
            id="event-end-time"
            type="time"
            className="form-input"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            min={startTime}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="event-description">Description</label>
        <textarea
          id="event-description"
          className="form-input"
          placeholder="Add event details"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          <i className="fa-solid fa-plus"></i> Add Event
        </button>
      </div>
    </form>
  );
}
