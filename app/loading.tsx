export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 w-full h-screen absolute z-50">
        {/* Spinner Animation */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-primary-600 rounded-full animate-spin"></div>
        
        <p className="text-primary font-medium animate-pulse">
          Site is loading...
        </p>
      </div>
    );
  }