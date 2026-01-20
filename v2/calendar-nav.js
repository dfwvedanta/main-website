/**
 * Interactive Calendar with Navigation
 * Dynamically generates calendar grid and handles month navigation
 */

class InteractiveCalendar {
    constructor() {
        this.currentDate = new Date(2026, 1, 1); // February 2026 (month is 0-indexed)
        this.events = this.loadEvents();

        this.container = document.getElementById('calendar-days-container');
        this.monthDisplay = document.getElementById('calendar-month-display');

        if (!this.container || !this.monthDisplay) return;

        this.init();
    }

    init() {
        // Set up navigation buttons
        const prevBtn = document.querySelector('.prev-month');
        const nextBtn = document.querySelector('.next-month');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousMonth());
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextMonth());
        }

        // Render initial calendar
        this.render();
    }

    loadEvents() {
        // Event data organized by date (YYYY-MM-DD format)
        return {
            // January 2026
            '2026-01-16': [
                { type: 'special', time: '7:00 PM', title: "Swami Ishtananda's Retreat (Day 1)" }
            ],
            '2026-01-17': [
                { type: 'special', time: '8:00 PM', title: "Swami Ishtananda's Retreat (Day 2)" }
            ],
            '2026-01-18': [
                { type: 'special', time: 'All Week', title: 'Vivekananda Food Drive Begins' }
            ],
            '2026-01-19': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-01-22': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-01-25': [
                { type: 'special', time: 'All Week', title: 'Vivekananda Food Drive Ends' }
            ],
            '2026-01-26': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-01-29': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],

            // February 2026
            '2026-02-01': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Reminiscences of Vedanta Monks' }
            ],
            '2026-02-05': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-02-08': [
                { type: 'sunday-talk', time: '11:00 AM', title: "Vivekananda's Arati Song" }
            ],
            '2026-02-12': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-02-15': [
                { type: 'special', time: '6:30 PM', title: 'Shivaratri Puja' }
            ],
            '2026-02-19': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-02-22': [
                { type: 'special', time: '10:30 AM', title: "Sri Ramakrishna's Birthday" }
            ],
            '2026-02-26': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],

            // March 2026 (placeholder - can be updated when details are available)
            '2026-03-01': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-03-05': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-03-08': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-03-12': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-03-15': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-03-19': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-03-22': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ],
            '2026-03-26': [
                { type: 'raja-yoga', time: '7:00 PM', title: 'Raja Yoga' }
            ],
            '2026-03-29': [
                { type: 'sunday-talk', time: '11:00 AM', title: 'Sunday Talk' }
            ]
        };
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.render();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.render();
    }

    render() {
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[this.currentDate.getMonth()];
        const year = this.currentDate.getFullYear();
        this.monthDisplay.textContent = `${month} ${year}`;

        // Clear container
        this.container.innerHTML = '';

        // Get first day of month and number of days
        const firstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const lastDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

        // Add empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day empty';
            this.container.appendChild(emptyDay);
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${this.currentDate.getFullYear()}-${String(this.currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = this.events[dateStr] || [];

            const dayDiv = document.createElement('div');
            dayDiv.className = 'calendar-day';

            if (dayEvents.length > 0) {
                dayDiv.classList.add('has-event');

                // Check if any event is special
                if (dayEvents.some(e => e.type === 'special')) {
                    dayDiv.classList.add('special-event');
                }
            }

            dayDiv.dataset.date = dateStr;

            // Day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = day;
            dayDiv.appendChild(dayNumber);

            // Events
            if (dayEvents.length > 0) {
                const eventsContainer = document.createElement('div');
                eventsContainer.className = 'day-events';

                dayEvents.forEach(event => {
                    const eventDiv = document.createElement('div');
                    eventDiv.className = `day-event ${event.type}`;
                    eventDiv.textContent = `${event.time}: ${event.title}`;
                    eventsContainer.appendChild(eventDiv);
                });

                dayDiv.appendChild(eventsContainer);
            }

            this.container.appendChild(dayDiv);
        }
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveCalendar();
});
