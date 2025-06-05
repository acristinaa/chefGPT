import { ChefHat, Sparkles, Cookie } from "lucide-react"

export default function ChatHeader() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="relative">
          <ChefHat className="w-12 h-12 text-pink-500" />
          <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          ChefGPT
        </h1>
        <Cookie className="w-8 h-8 text-amber-500 animate-bounce" />
      </div>
      <p className="text-gray-600 text-lg font-medium">{"Ask me anything about cooking! ✨"}</p>
    </div>
  )
}