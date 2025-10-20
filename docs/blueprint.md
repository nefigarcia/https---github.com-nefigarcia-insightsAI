# **App Name**: Feedback Insights Dashboard

## Core Features:

- Fetch Feedback Messages: Fetch feedback messages from the backend API (https://feedback-ai-git-main-nefigarcias-projects.vercel.app/api/feedback) on button click.
- Display Message List: Display a list of feedback messages with key details (e.g., message snippet, scores) on the main page.
- Message Detail View: When a user clicks on a message, display all fields from the MySQL database (id, message, doctor_score, nurse_score, hospital_score, notes_analysis, created_at).
- Statistical Charts: Generate charts (e.g., bar charts, pie charts) to visualize the aggregated feedback scores (doctor, nurse, hospital).
- Environment Variables Setup: Set up .env file to use DATABASE_URL=mysql://u567466917_surveyaiadmin:Avarici@971@193.203.166.105:3306/u567466917_surveyai.

## Style Guidelines:

- Primary color: Deep Indigo (#3F51B5) for a sense of trust and professionalism.
- Background color: Very light gray (#F5F5F5), almost white, for a clean, neutral backdrop.
- Accent color: Amber (#FFC107) to highlight key data points and interactive elements.
- Font pairing: 'Inter' (sans-serif) for body text, 'Space Grotesk' (sans-serif) for headlines.
- Use minimalist icons to represent data types and actions.
- Dashboard-style layout with clear sections for message list, detail view, and charts.
- Subtle transitions and animations when loading data or displaying new charts.