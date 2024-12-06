import { Navigation } from "@/components/navigation";

export default function ProcijeniVrijednost() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation />
      <div className="relative w-full max-w-2xl">
        <input
          className="shadow-sm appearance-none border rounded-full w-full py-4 px-6 text-main-text-black leading-tight focus:outline-none focus:shadow-outline placeholder-secondary-text-black"
          id="entry"
          type="text"
          placeholder="Zalijepi link"
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-light text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
        >
          <svg
            className="w-4 h-4 transform rotate-[-90deg]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </main>
  );
}