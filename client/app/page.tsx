import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-between items-center container mx-auto">
      <div className="flex-1 text-center font-bold text-5xl text-indigo-700">
        Home Page
      </div>
      <div>
        <Link href="/login" className="bg-indigo-500 text-white text-lg py-2 px-6 rounded-md hover:border-2 hover:border-indigo-900 hover:bg-indigo-700">LogIn</Link>
      </div>
    </div>

  );
}
