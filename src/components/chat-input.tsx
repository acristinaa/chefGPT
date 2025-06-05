import { useState } from "react"
import { ChefHat, Sparkles, Heart } from "lucide-react"

interface ChatInputProps {
  onSubmit?: (question: string) => void
}

export default function ChatInput({ onSubmit }: ChatInputProps) {
  const [question, setQuestion] = useState("")

  const handleSubmit = () => {
    if (onSubmit && question.trim()) {
      onSubmit(question.trim())
    }
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <label
          htmlFor="recipe-input"
          className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"
        >
          <Heart className="w-4 h-4 text-pink-400" />
          {"What would you like to cook today?"}
        </label>
        <div className="relative">
          <textarea
            id="recipe-input"
            placeholder="Ask me how to cook... 🍳"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full min-h-[120px] text-lg border-2 border-pink-200 focus:border-pink-400 rounded-2xl resize-none bg-gradient-to-br from-white to-pink-50/30 placeholder:text-gray-400 transition-all duration-300 focus:shadow-lg focus:shadow-pink-200/50 p-4"
            rows={4}
          />
          <div className="absolute bottom-3 right-3 opacity-30">
            <ChefHat className="w-6 h-6 text-pink-300" />
          </div>
        </div>
      </div>

     
      <div className="flex justify-center">
        <button 
          onClick={handleSubmit}
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          {"Let's Cook!"}
          <Heart className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}