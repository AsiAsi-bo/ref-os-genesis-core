
import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

type Event = {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'meeting' | 'reminder' | 'task';
  description?: string;
};

const CalendarApp: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([
    { 
      id: '1', 
      title: 'Team Meeting', 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2), 
      time: '10:00 AM', 
      type: 'meeting' 
    },
    { 
      id: '2', 
      title: 'Project Deadline', 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 4), 
      time: '5:00 PM', 
      type: 'reminder' 
    },
    { 
      id: '3', 
      title: 'Review Documentation', 
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1), 
      time: '2:30 PM', 
      type: 'task' 
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    type: 'meeting' as Event['type'],
    description: ''
  });
  
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };
  
  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;
    
    const event: Event = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: new Date(newEvent.date),
      time: newEvent.time,
      type: newEvent.type,
      description: newEvent.description
    };
    
    setEvents([...events, event]);
    setNewEvent({
      title: '',
      date: '',
      time: '',
      type: 'meeting',
      description: ''
    });
    setIsDialogOpen(false);
  };
  
  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-refos-window/20 bg-refos-taskbar/50"></div>
      );
    }
    
    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = events.filter(
        event => event.date.getDate() === day && 
                event.date.getMonth() === month && 
                event.date.getFullYear() === year
      );
      
      days.push(
        <div key={`day-${day}`} className="h-20 border border-refos-window/20 bg-refos-taskbar p-1 relative">
          <div className="flex justify-between items-start">
            <span className={cn(
              "text-sm font-medium p-1 rounded-full w-6 h-6 flex items-center justify-center",
              new Date().toDateString() === date.toDateString() 
                ? "bg-refos-primary text-white" 
                : "text-white/80"
            )}>
              {day}
            </span>
          </div>
          <div className="mt-1 space-y-1 overflow-hidden">
            {dayEvents.map(event => (
              <div 
                key={event.id}
                className={cn(
                  "text-xs px-1 py-0.5 rounded truncate",
                  event.type === 'meeting' ? "bg-blue-500/30" :
                  event.type === 'reminder' ? "bg-red-500/30" :
                  "bg-green-500/30"
                )}
              >
                {event.time} - {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="flex flex-col h-full bg-refos-window p-4 text-white">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CalendarIcon size={24} className="text-refos-primary mr-2" />
          <h3 className="text-xl font-medium">Calendar</h3>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-refos-primary/20">
              <Plus size={18} className="mr-1" />
              New Event
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-refos-window border-refos-primary/20">
            <DialogHeader>
              <DialogTitle className="text-white">Add New Event</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="text-white/80">Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="bg-refos-taskbar border-refos-primary/20 text-white"
                  placeholder="Event title"
                />
              </div>
              <div>
                <Label htmlFor="date" className="text-white/80">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="bg-refos-taskbar border-refos-primary/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-white/80">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newEvent.time}
                  onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  className="bg-refos-taskbar border-refos-primary/20 text-white"
                />
              </div>
              <div>
                <Label htmlFor="type" className="text-white/80">Type</Label>
                <Select value={newEvent.type} onValueChange={(value: Event['type']) => setNewEvent({ ...newEvent, type: value })}>
                  <SelectTrigger className="bg-refos-taskbar border-refos-primary/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-refos-window border-refos-primary/20">
                    <SelectItem value="meeting" className="text-white hover:bg-refos-primary/20">Meeting</SelectItem>
                    <SelectItem value="reminder" className="text-white hover:bg-refos-primary/20">Reminder</SelectItem>
                    <SelectItem value="task" className="text-white hover:bg-refos-primary/20">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description" className="text-white/80">Description (optional)</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="bg-refos-taskbar border-refos-primary/20 text-white"
                  placeholder="Event description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                  className="text-white/80 hover:text-white hover:bg-refos-primary/20"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddEvent}
                  className="bg-refos-primary hover:bg-refos-primary/80 text-white"
                  disabled={!newEvent.title || !newEvent.date || !newEvent.time}
                >
                  Add Event
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-medium">
          {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
        </h4>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" className="text-white/80" onClick={prevMonth}>
            <ChevronLeft size={18} />
          </Button>
          <Button variant="ghost" size="icon" className="text-white/80" onClick={nextMonth}>
            <ChevronRight size={18} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-0 mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-white/60 text-sm py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-0 flex-1">
        {renderCalendar()}
      </div>
    </div>
  );
};

export default CalendarApp;
