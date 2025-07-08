# Quiz App

A modern quiz application built with React, TypeScript, and Vite that allows users to create, take, and manage quizzes.

## Features

- 🔐 User Authentication
  - Login and Registration
  - Password Reset functionality
  - Protected Routes

- 📝 Quiz Management
  - Create custom quizzes
  - Add multiple questions
  - View quiz details
  - List all quizzes
  - Take quizzes
  - View results

- 👤 User Profile
  - Personal information management
  - Security settings
  - Dashboard with recent quizzes
  - Quick actions

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux
- **Styling**: Tailwind CSS
- **Backend**: Supabase
- **Routing**: React Router

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/NutanCoder/quiz-app.git
cd quiz-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env` file in the root directory and add the following:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
quiz-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── layouts/        # Page layouts and navigation
│   ├── features/       # Feature-based modules
│   │   └── quiz/
│   │       └── types/  # Quiz feature type definitions
│   │           ├── quiz.base.types.ts    # Core quiz interfaces
│   │           ├── question.types.ts     # Question-related types
│   │           ├── attempt.types.ts      # Quiz attempt types
│   │           └── stats.types.ts        # Quiz statistics types
│   ├── redux/          # Redux store and slices
│   ├── routes/         # Route configurations
│   ├── services/       # API services
│   └── utils/          # Utility functions
```

## Type Organization

The application uses a feature-based type organization, particularly in the quiz feature:

### Quiz Types
- `quiz.base.types.ts`: Core quiz interfaces (Quiz, CreateQuiz, QuizState)
- `question.types.ts`: Question-related interfaces (Question, QuestionOption, Answer)
- `attempt.types.ts`: Attempt-related interfaces (QuizAttempt, QuizProgress)
- `stats.types.ts`: Statistics interfaces (QuizStats)

All types are exported through their respective feature's `index.ts` file, making them easily importable from `@/features/quiz/types`.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
