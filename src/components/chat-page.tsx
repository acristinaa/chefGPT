"use client"

import ChatHeader from "./chat-header"
import ChatInput from "./chat-input"
import LoadingDots from "./loading-dots"
import ChatFooter from "./chat-footer"

export default function Component() {
  const handleSubmit = (question: string) => {
    console.log("Submitted question:", question)
    // You can add your chat logic here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <ChatHeader />
        
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-lg">
          <div className="p-8">
            <ChatInput onSubmit={handleSubmit} />
            <LoadingDots />
          </div>
        </div>

        <ChatFooter />
      </div>
    </div>
  )
}
