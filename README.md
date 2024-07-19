# Astra - Chatbot Website

![astra](https://github.com/user-attachments/assets/957764cf-79bb-4096-af23-dd372a1033d5)


## Overview

Astra is a sophisticated chatbot website designed to provide an engaging user experience through a feature-rich interface and advanced functionalities. The project leverages the Gemini API to offer robust chatbot capabilities and integrates various technologies to enhance performance and user interaction.

## Features

![image](https://github.com/user-attachments/assets/9c6d95e3-6ccf-403b-9745-614743579355)


- **Attractive UI**: Leveraged the Gemini API to create an appealing and user-friendly interface.
- **User Authentication**: Implemented secure user authentication using Clerk.
- **Chat History**: Users can view and manage their chat history.
- **Chat Sharing**: Enabled chat sharing functionality for users to share conversations.
- **Speech Recognition**: Integrated speech recognition for a hands-free user experience.
- **Optimized Performance**: Utilized Next.js for server-side rendering and MongoDB for efficient data management.

## Tech Stack

- **Next.js**: For server-side rendering and optimized performance.
- **TypeScript**: For static type checking and improved developer experience.
- **MongoDB**: As the database for storing chat data and user information.
- **Gemini API**: For chatbot functionalities.
- **Clerk**: For user authentication and security.

## Deployment

Astra is deployed and can be accessed through the following link:

[Visit Astra Chatbot Website](https://astra-seven-mu.vercel.app/)

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Clerk account
- Gemini API access

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/astra.git
   ```
2. Navigate to the project directory:
   ```bash
   cd astra
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables.
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=<your-clerk-frontend-api>
   CLERK_API_KEY=<your-clerk-api-key>
   MONGODB_URI=<your-mongodb-uri>
   GEMINI_API_KEY=<your-gemini-api-key>
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Usage

- **Chatbot Interaction**: Engage with the chatbot by typing or using speech recognition.
- **View Chat History**: Access past conversations from the chat history section.
- **Share Conversations**: Share interesting conversations using the chat sharing feature.
- **User Authentication**: Sign up or log in using Clerk for a personalized experience.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the creators of the Gemini API for providing robust chatbot functionalities.
- Special thanks to Clerk for secure and easy-to-use authentication services.

---
