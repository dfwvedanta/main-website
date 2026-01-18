/**
 * Add to Calendar Utility
 * Generates calendar links and .ics files for multiple calendar platforms
 */

class AddToCalendar {
    /**
     * Create calendar event
     * @param {Object} event - Event details
     * @param {string} event.title - Event title
     * @param {string} event.description - Event description
     * @param {string} event.location - Event location
     * @param {Date|string} event.startDate - Start date/time
     * @param {Date|string} event.endDate - End date/time
     * @param {string} event.url - Event URL (optional)
     */
    constructor(event) {
        this.event = {
            title: event.title || '',
            description: event.description || '',
            location: event.location || 'Ramakrishna Vedanta Society of North Texas, 119 W. Scotland Drive, Irving, TX 75063',
            startDate: this.parseDate(event.startDate),
            endDate: this.parseDate(event.endDate),
            url: event.url || window.location.href
        };
    }

    /**
     * Parse date to Date object
     */
    parseDate(date) {
        if (date instanceof Date) return date;
        return new Date(date);
    }

    /**
     * Format date to YYYYMMDDTHHMMSSZ format (UTC)
     */
    formatDateUTC(date) {
        const pad = (n) => (n < 10 ? '0' : '') + n;
        return date.getUTCFullYear() +
            pad(date.getUTCMonth() + 1) +
            pad(date.getUTCDate()) + 'T' +
            pad(date.getUTCHours()) +
            pad(date.getUTCMinutes()) +
            pad(date.getUTCSeconds()) + 'Z';
    }

    /**
     * Generate Google Calendar URL
     */
    googleCalendar() {
        const start = this.formatDateUTC(this.event.startDate);
        const end = this.formatDateUTC(this.event.endDate);

        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: this.event.title,
            details: this.event.description,
            location: this.event.location,
            dates: `${start}/${end}`
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    }

    /**
     * Generate Yahoo Calendar URL
     */
    yahooCalendar() {
        const start = this.formatDateUTC(this.event.startDate);
        const end = this.formatDateUTC(this.event.endDate);

        const params = new URLSearchParams({
            v: '60',
            title: this.event.title,
            desc: this.event.description,
            in_loc: this.event.location,
            st: start,
            et: end
        });

        return `https://calendar.yahoo.com/?${params.toString()}`;
    }

    /**
     * Generate Outlook.com URL
     */
    outlookCalendar() {
        const start = this.formatDateUTC(this.event.startDate);
        const end = this.formatDateUTC(this.event.endDate);

        const params = new URLSearchParams({
            path: '/calendar/action/compose',
            rru: 'addevent',
            subject: this.event.title,
            body: this.event.description,
            location: this.event.location,
            startdt: start,
            enddt: end
        });

        return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
    }

    /**
     * Generate .ics file content (works with Apple Calendar, Outlook desktop, etc.)
     */
    generateICS() {
        const start = this.formatDateUTC(this.event.startDate);
        const end = this.formatDateUTC(this.event.endDate);

        // Escape special characters in ICS format
        const escapeICS = (str) => {
            return str.replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
        };

        const ics = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Vedanta DFW//Event//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            `DTSTART:${start}`,
            `DTEND:${end}`,
            `DTSTAMP:${this.formatDateUTC(new Date())}`,
            `UID:${Date.now()}@vedantadfw.org`,
            `SUMMARY:${escapeICS(this.event.title)}`,
            `DESCRIPTION:${escapeICS(this.event.description)}`,
            `LOCATION:${escapeICS(this.event.location)}`,
            `URL:${this.event.url}`,
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        return ics;
    }

    /**
     * Download .ics file
     */
    downloadICS() {
        const icsContent = this.generateICS();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${this.event.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Create dropdown menu with all calendar options
     */
    createDropdown(buttonText = 'Add to Calendar') {
        const container = document.createElement('div');
        container.className = 'add-to-calendar-dropdown';

        const button = document.createElement('button');
        button.className = 'add-to-calendar-btn';
        button.textContent = buttonText;
        button.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 6px; vertical-align: middle;">
                <path d="M14 2H12V1C12 0.447715 11.5523 0 11 0C10.4477 0 10 0.447715 10 1V2H6V1C6 0.447715 5.55228 0 5 0C4.44772 0 4 0.447715 4 1V2H2C0.895431 2 0 2.89543 0 4V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V4C16 2.89543 15.1046 2 14 2ZM14 14H2V7H14V14ZM14 5H2V4H4V5C4 5.55228 4.44772 6 5 6C5.55228 6 6 5.55228 6 5V4H10V5C10 5.55228 10.4477 6 11 6C11.5523 6 12 5.55228 12 5V4H14V5Z" fill="currentColor"/>
            </svg>
            ${buttonText}
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 6px; vertical-align: middle;">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const menu = document.createElement('div');
        menu.className = 'add-to-calendar-menu';

        const options = [
            { label: 'Google Calendar', action: () => window.open(this.googleCalendar(), '_blank') },
            { label: 'Apple Calendar', action: () => this.downloadICS() },
            { label: 'Outlook.com', action: () => window.open(this.outlookCalendar(), '_blank') },
            { label: 'Yahoo Calendar', action: () => window.open(this.yahooCalendar(), '_blank') },
            { label: 'Download .ics file', action: () => this.downloadICS() }
        ];

        options.forEach(option => {
            const item = document.createElement('a');
            item.className = 'add-to-calendar-item';
            item.href = '#';
            item.textContent = option.label;
            item.addEventListener('click', (e) => {
                e.preventDefault();
                option.action();
                menu.classList.remove('show');
            });
            menu.appendChild(item);
        });

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('show');

            // Close other open dropdowns
            document.querySelectorAll('.add-to-calendar-menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            menu.classList.remove('show');
        });

        container.appendChild(button);
        container.appendChild(menu);

        return container;
    }
}

// Make it globally available
window.AddToCalendar = AddToCalendar;
