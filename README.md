# ChefGPT 🍳 — RAG Chatbot for Recipes

A simple **Retrieval-Augmented Generation (RAG)** chatbot built with:

- 🧑‍💻 [Next.js](https://nextjs.org/) (TypeScript, App Router)
- 🗄️ [Supabase](https://supabase.com/) (Postgres + pgvector)
- 🤖 [OpenAI](https://platform.openai.com/) API (embeddings + chat)
- 📄 PDF recipes as knowledge base

## ✨ Features

✅ Upload PDF recipes  
✅ Chunk text + generate embeddings  
✅ Store embeddings in Supabase  
✅ Vector similarity search with pgvector  
✅ Ask questions → chatbot finds relevant recipe chunks  
✅ GPT generates answers based on your own data

## ⚙️ Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/yourusername/chefgpt.git
cd chefgpt
