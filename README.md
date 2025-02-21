# Lesson Planner App

An AI-powered Lesson Planner web application built using **Vite**, **React**, **TailwindCSS**, and **ShadCN UI components**. The app integrates the **Google Gemini API** to dynamically generate detailed lesson plans, including editable content and PDF download functionality. Features like dark mode and local storage persistence are also included.

---

## 🚀 Features

- ✅ **Dummy Authentication** (Frontend-only)
- ✅ **Structured Lesson Plan Form** with real-time user inputs
- ✅ **AI-Generated Lesson Plans** using **Google Gemini API**
- ✅ **Editable Lesson Plan Preview**
- ✅ **Download as PDF** with `react-to-print`
- ✅ **Dark Mode Support** with local storage persistence
- ✅ **Persistent Form Data and Generated Content** via local storage

---
## ⚡ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shivam-knight-owl/Gradesway-lesson-planner-asssignment.git
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Set up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

> 💡 Replace `your_gemini_api_key_here` with your actual Google Gemini API key.

### 4️⃣ Run the Application

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

## 🔗 Google Gemini API Integration

- The Gemini API is integrated via the `@google/generative-ai` package.
- Configuration is set using a `.env` variable for the API key.

### ✅ **Key Integration Steps:**

```ts
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
export const chatSession = model.startChat({
  generationConfig,
  history: [
  ],
});
```

---

📄 PDF Download Functionality

- Utilizes `jsPDF` for PDF generation.
- Ensure `jspdf` is installed:

```bash
npm install jspdf
```

### 💡 **PDF Download Trigger:**

```tsx
import jsPDF from "jspdf";

const handleDownloadPDF = (generatedContent: string) => {
  const pdf = new jsPDF();
  const lines = pdf.splitTextToSize(generatedContent, 180);
  pdf.text(lines, 10, 10);
  pdf.save("lesson_plan.pdf");
};
```

---

## 🌙 Dark Mode & Persistence

- **Dark Mode** toggle with local storage persistence.
- **Form Data** and **Generated Content** are saved in local storage to persist across refreshes.

---

## 💎 Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Google Gemini API](https://ai.google.dev/)
- [jsPDF](https://github.com/parallax/jsPDF)

---

## 🎉 Acknowledgments

- Thanks to [Google AI](https://ai.google.dev/) for providing the Gemini API.
- Inspired by modern educational tools to enhance lesson planning.
