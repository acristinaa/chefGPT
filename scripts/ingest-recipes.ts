import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";
import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/** Very naive splitter – 800-character chunks with 80-char overlap */
function split(text: string, size = 800, overlap = 80) {
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

async function processPdf(filePath: string) {
  const data = await fs.readFile(filePath);
  const { text } = await pdf(data);          // ↖︎ extracts raw string
  return split(text).map((content) => ({
    recipe_name: path.basename(filePath),
    content,
  }));
}

async function embedAndStore(chunks: { recipe_name: string; content: string }[]) {
  for (const chunk of chunks) {
    // 1. Get vector
    const [{ embedding }] = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: chunk.content.replace(/\n/g, " "),
    }).then(r => r.data);

    // 2. Insert row
    const { error } = await supabase.from("recipe_sections").insert({
      ...chunk,
      embedding,
    });
    if (error) console.error(error);
  }
}

(async () => {
  const pdfDir = path.resolve("public/pdfs");       // put files here
  const files = await fs.readdir(pdfDir);
  for (const file of files.filter(f => f.endsWith(".pdf"))) {
    const chunks = await processPdf(path.join(pdfDir, file));
    await embedAndStore(chunks);
    console.log(`✓ ${file} (${chunks.length} chunks)`);
  }
})();
