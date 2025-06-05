export default function LoadingDots() {
    return (
      <div className="flex justify-center items-center gap-4 pt-4 opacity-60">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-200"></div>
        </div>
        <span className="text-sm text-gray-500 font-medium">Ready to help you cook!</span>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-indigo-300 rounded-full animate-pulse delay-200"></div>
          <div className="w-2 h-2 bg-purple-300 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-pink-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    )
  }