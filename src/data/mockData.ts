export const dashboardStats = [
  { title: 'Total Societies', value: 24, icon: 'users', accent: 'cyan' as const },
  { title: 'Active Events', value: 12, icon: 'calendar', accent: 'purple' as const },
  { title: 'Members', value: 1847, icon: 'users', accent: 'cyan' as const },
  { title: 'Upcoming', value: 8, icon: 'calendar', accent: 'purple' as const },
];

export const membersByYear = [
  { year: '1st Year', members: 620 },
  { year: '2nd Year', members: 480 },
  { year: '3rd Year', members: 420 },
  { year: '4th Year', members: 327 },
];

/** February 2025 dates that have events (for calendar highlight) */
export const eventDatesInFebruary = [14, 15, 16, 18, 20, 22];

export const lineChartData = [
  { name: 'Mon', events: 4, registrations: 120 },
  { name: 'Tue', events: 3, registrations: 98 },
  { name: 'Wed', events: 6, registrations: 210 },
  { name: 'Thu', events: 5, registrations: 165 },
  { name: 'Fri', events: 8, registrations: 280 },
  { name: 'Sat', events: 2, registrations: 45 },
  { name: 'Sun', events: 1, registrations: 32 },
];

export const doughnutData = [
  { name: 'Tech', value: 35, color: '#00f5ff' },
  { name: 'Cultural', value: 28, color: '#a855f7' },
  { name: 'Sports', value: 22, color: '#22c55e' },
  { name: 'Literary', value: 15, color: '#f59e0b' },
];

export const recentActivity = [
  { id: '1', action: 'New member joined', society: 'Tech Society', time: '2m ago' },
  { id: '2', action: 'Event created', society: 'Cultural Club', time: '15m ago' },
  { id: '3', action: 'Registration closed', society: 'Hackathon 2025', time: '1h ago' },
  { id: '4', action: 'Society updated', society: 'Sports Club', time: '2h ago' },
  { id: '5', action: 'New event', society: 'Literary Society', time: '3h ago' },
];

export const upcomingEvents = [
  { id: '1', title: 'Hackathon Kickoff', date: 'Feb 16, 10:00 AM', venue: 'Main Hall' },
  { id: '2', title: 'Dance Workshop', date: 'Feb 17, 4:00 PM', venue: 'Auditorium' },
  { id: '3', title: 'Cricket Finals', date: 'Feb 18, 9:00 AM', venue: 'Sports Ground' },
];

export const societies = [
  { id: '1', name: 'Tech Society', description: 'Coding, hackathons, and tech talks for aspiring developers.', members: 320, eventsCount: 18, category: 'Tech' },
  { id: '2', name: 'Cultural Club', description: 'Dance, music, drama and cultural events throughout the year.', members: 280, eventsCount: 24, category: 'Cultural' },
  { id: '3', name: 'Sports Club', description: 'Cricket, football, basketball and fitness activities.', members: 450, eventsCount: 32, category: 'Sports' },
  { id: '4', name: 'Literary Society', description: 'Debates, creative writing and book clubs.', members: 120, eventsCount: 12, category: 'Literary' },
  { id: '5', name: 'Photography Club', description: 'Photo walks, workshops and exhibitions.', members: 95, eventsCount: 8, category: 'Cultural' },
  { id: '6', name: 'Robotics Club', description: 'Build and compete with robots and automation projects.', members: 78, eventsCount: 6, category: 'Tech' },
];

export const events = [
  { id: '1', title: 'Hackathon 2025', date: 'Feb 16, 10:00 AM', venue: 'Main Hall', capacity: 200, registered: 156, status: 'upcoming' as const, description: 'Build something cool in 24 hours and win prizes. Show your coding skills and get noticed by recruiters.', daysUntil: 2 },
  { id: '2', title: 'Dance Workshop', date: 'Feb 15, 4:00 PM', venue: 'Auditorium', capacity: 80, registered: 80, status: 'live' as const, description: 'Learn new moves and express yourself on the floor. Perfect for beginners and enthusiasts.', daysUntil: 1 },
  { id: '3', title: 'Tech Talk: AI', date: 'Feb 14, 2:00 PM', venue: 'Room 101', capacity: 60, registered: 60, status: 'ended' as const, description: 'Explore the future of AI and machine learning with industry experts.', daysUntil: 0 },
  { id: '4', title: 'Cricket Finals', date: 'Feb 18, 9:00 AM', venue: 'Sports Ground', capacity: 500, registered: 320, status: 'upcoming' as const, description: 'Show your talent on the field and get recognized. Compete for the championship trophy.', daysUntil: 4 },
  { id: '5', title: 'Debate Competition', date: 'Feb 20, 3:00 PM', venue: 'Conference Hall', capacity: 100, registered: 45, status: 'upcoming' as const, description: 'Argue your case and sharpen your public speaking skills. Stand out and win.', daysUntil: 6 },
  { id: '6', title: 'Photo Exhibition', date: 'Feb 22, 11:00 AM', venue: 'Gallery', capacity: 150, registered: 90, status: 'upcoming' as const, description: 'Display your best shots and get feedback from pros. Get your work seen.', daysUntil: 8 },
];
