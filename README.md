# PrePresent 🎓🤖

PrePresent is an AI-powered presentation preparation tool designed specifically for students. It helps you transition from rote memorization to true project understanding by generating structured scripts, explaining technical prerequisites, and preparing you for viva questions.

## 🚀 Features

- **AI Presentation Script:** Generates a clear, 2-3 minute structured script tailored to your project details.
- **Prerequisite Mapping:** Identifies technical keywords and provides simple, easy-to-understand explanations so you can explain the *why* and *how* of your tech choices.
- **Viva Preparation:** Predicts potential viva questions based on your project and provides concise, accurate answers.
- **Free & Fast:** Powered by the Groq API (using Llama 3.3 70B) for instant results at zero cost.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **AI Engine:** [Groq SDK](https://groq.com/) (Llama 3.3 70B)

## ⚙️ How It Works

PrePresent follows a structured 4-step workflow to prepare you for your presentation:

1.  **Project Input:** You provide a description of your project, including the technologies used, features, and core problem it solves.
2.  **Conceptual Audit:** The system uses AI to perform a "conceptual audit" of your project. It identifies high-level technical terms (e.g., "React," "TensorFlow.js," "One-Hot Encoding").
3.  **Content Generation:**
    *   **Script:** Creates a narrative flow (Introduction -> Problem -> Solution -> Tech Stack -> Demo -> Conclusion).
    *   **Explanations:** Maps identified keywords to fundamental concepts, ensuring you understand the building blocks.
    *   **Viva Q&A:** Simulates an examiner's perspective to generate tough technical questions you might face.
4.  **Interactive Review:** Results are displayed in a clean dashboard where you can read your script, study the concept cards, and practice your viva answers.

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- A free Groq API Key from [console.groq.com](https://console.groq.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Sharawil/prepresent.git
    cd prepresent
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    Create a `.env` file in the root directory and add your Groq API key:
    ```env
    GROQ_API_KEY=gsk_your_key_here
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

5.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to start preparing!

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
