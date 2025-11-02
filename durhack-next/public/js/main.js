document.addEventListener('DOMContentLoaded', () => {

    // --- Feature 1: Live Clock (index.html) ---
    const dateElement = document.getElementById('current-date');
    const clockElement = document.getElementById('current-clock');

    function updateTime() {
        const now = new Date();
        
        // Format Date
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        if (dateElement) {
            dateElement.innerText = now.toLocaleDateString('en-US', dateOptions);
        }

        // Format Time
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        if (clockElement) {
            clockElement.innerText = now.toLocaleTimeString('en-US', timeOptions);
        }
    }

    // Update the time immediately on load, then every second
    if (dateElement || clockElement) {
        updateTime();
        setInterval(updateTime, 1000);
    }

    // --- Feature 2: Dashboard Chat (index.html) ---
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatBox = document.getElementById('chat-box');

    if (chatForm) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const messageText = chatInput.value.trim();

            if (messageText) {
                // 1. Display the user's message
                appendMessage(messageText, 'user');
                chatInput.value = '';

                // 2. Show a "typing" indicator
                const typingIndicator = appendMessage("Donna is typing...", 'ai-typing');

                // 3. [BACKEND HOOK] Send 'messageText' to the backend API
                // fetch('/api/chat', { ... })
                
                // --- Placeholder for AI response ---
                // This simulates a network delay
                setTimeout(() => {
                    // Remove typing indicator
                    typingIndicator.remove(); 
                    
                    // Create a more realistic placeholder response
                    let aiReply = "I've received your message: '" + messageText + "'. I am a frontend demo and cannot process this, but a backend API would handle it.";
                    
                    if (messageText.toLowerCase().includes('meeting')) {
                        aiReply = "Your first meeting is with the Morrison case team at 10:30 AM in Conference Room A. (This is a hardcoded frontend response)";
                    } else if (messageText.toLowerCase().includes('schedule')) {
                        aiReply = "Here is your schedule: 10:30 AM - Morrison case review. 2:00 PM - Client presentation. (This is a hardcoded frontend response)";
                    }
                    
                    // 4. Display the AI's response
                    appendMessage(aiReply, 'ai');
                }, 1500);
                // --- End Placeholder ---
            }
        });
    }

    // Function to add a message to the chat box
    function appendMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageElement.innerHTML = `
            <p>${text}</p>
            <span class="timestamp">${timestamp}</span>
        `;
        if (chatBox) {
            chatBox.appendChild(messageElement);
            // Scroll to bottom
            chatBox.scrollTop = chatBox.scrollHeight;
        }
        return messageElement; // Return the element so we can remove it (for typing)
    }

    // --- Feature 3: Interactive Calendar (calendar.html) ---
    const calendarContainer = document.querySelector('.calendar-container');
    const monthYearElement = document.getElementById('calendar-month-year');
    const scheduleTitle = document.getElementById('schedule-title');
    const scheduleBody = document.getElementById('schedule-body');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // We'll use a date object to keep track of the current month being viewed
    let currentDate = new Date(2025, 10, 1); // November 2025 (months are 0-indexed)

    function renderCalendar() {
        if (!calendarContainer) return; // Only run on calendar page

        // --- 1. Set up date variables ---
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        // Update calendar header
        monthYearElement.innerText = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        
        // Find first day of the month (0=Sun, 1=Mon, ...)
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // Find last day of the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // --- 2. Clear old calendar days ---
        // (Select all children except the first 7, which are headers)
        const daysToRemove = calendarContainer.querySelectorAll('.calendar-day, .other-month');
        daysToRemove.forEach(day => day.remove());

        // --- 3. Render blank days for previous month ---
        for (let i = 0; i < firstDayOfMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day', 'other-month');
            calendarContainer.appendChild(dayElement);
        }

        // --- 4. Render days for current month ---
        const today = new Date();
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.classList.add('calendar-day');
            dayElement.innerText = i;
            
            // Highlight today's date
            if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayElement.classList.add('today');
                // Set default schedule to today
                updateSchedule(i, 'Today\'s Schedule');
            }

            // Add click event
            dayElement.addEventListener('click', (e) => {
                // Ignore clicks on other-month placeholders
                if (e.currentTarget.classList.contains('other-month')) return;

                // Remove 'selected' from any other day
                const selectedDay = document.querySelector('.calendar-day.selected');
                if (selectedDay) {
                    selectedDay.classList.remove('selected');
                }
                // Add 'selected' to clicked day
                e.currentTarget.classList.add('selected');
                
                // Update the sidebar
                const dayNum = e.currentTarget.innerText;
                const monthName = currentDate.toLocaleDateString('en-US', { month: 'long' });
                updateSchedule(dayNum, `Schedule for ${monthName} ${dayNum}`);
            });

            calendarContainer.appendChild(dayElement);
        }
    }

    // Function to update the schedule sidebar
    function updateSchedule(day, title) {
        if (!scheduleTitle || !scheduleBody) return;

        scheduleTitle.innerText = title;
        
        // [BACKEND HOOK] Here you would fetch events for the selected day
        // fetch(`/api/schedule?year=${currentDate.getFullYear()}&month=${currentDate.getMonth()+1}&day=${day}`)
        // .then(res => res.json())
        // .then(data => {
        //     if (data.events.length > 0) {
        //         let html = '<ul class="priority-list">';
        //         data.events.forEach(event => {
        //             html += `<li><span class="priority-dot"></span> ${event.title} - <strong>${event.time}</strong></li>`;
        //         });
        //         html += '</ul>';
        //         scheduleBody.innerHTML = html;
        //     } else {
        //         scheduleBody.innerHTML = '<p class="empty-state">No events scheduled for this day.</p>';
        //     }
        // });
        
        // --- Placeholder for schedule ---
        // Using parseInt just in case
        const dayNumber = parseInt(day, 10);
        
        if (dayNumber === 2) { // Demo event for Nov 2
             scheduleBody.innerHTML = `
                <ul class="priority-list">
                    <li>
                        <span class="priority-dot"></span>
                        Client presentation - <strong>2:00 PM</strong>
                    </li>
                </ul>`;
        } else if (dayNumber === 1) { // Demo event for Nov 1
            scheduleBody.innerHTML = `
                <ul class="priority-list">
                    <li>
                        <span class="priority-dot"></span>
                        Morrison case review - <strong>10:30 AM</strong>
                    </li>
                    <li>
                        <span class="priority-dot"></span>
                        Client presentation - <strong>2:00 PM</strong>
                    </li>
                </ul>`;
        } else {
             scheduleBody.innerHTML = '<p class="empty-state">No events scheduled for this day.</p>';
        }
        // --- End Placeholder ---
    }

    // Event listeners for month buttons
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    }
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
    }

    // Initial render
    renderCalendar();

    // --- Other Button Placeholders ---
    // (These just show an alert to prove the button is wired up)
    
    const markAllReadBtn = document.getElementById('mark-all-read-btn');
    if (markAllReadBtn) {
        markAllReadBtn.addEventListener('click', () => {
            alert('This would send an API request to mark all notifications as read.');
        });
    }

    const newMeetingBtn = document.getElementById('new-meeting-btn');
    if (newMeetingBtn) {
        newMeetingBtn.addEventListener('click', () => {
            alert('This would open a "New Meeting" modal popup.');
        });
    }

});