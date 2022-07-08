import React, {useState, useEffect} from 'react';
import NewReminder from './components/NewReminder';
import ReminderList from './components/ReminderList';
import Reminder from './models/reminder';
import ReminderService from "./services/reminder";

function App() {
  const [reminders, setReminders] = useState<Reminder[]>([
    {id: 1, title: "Reminder 1"},
    {id: 2, title: "Reminder 2"}
  ]);

  const loadReminders = async() => {
    const reminders = await ReminderService.getReminders();
    setReminders(reminders);
  }

  useEffect(() => {
    loadReminders();
  }, [])
  
  const removeReminder = (id: number) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  }

  const addReminder = async (title: string) => {
    const newReminder = await ReminderService.addReminder(title);
    setReminders([newReminder, ...reminders]);
  }

  return (
    <div className="App">
      <NewReminder onAddReminder={addReminder} />
      <ReminderList items={reminders} onRemoveReminder={removeReminder} />
    </div>
  );
}

export default App;
