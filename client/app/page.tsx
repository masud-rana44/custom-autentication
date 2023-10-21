import Link from "next/link";

export default function Home() {
  return (
<main>
    <section className="bg-primary-600 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-extrabold">Welcome to Our Authentication App</h1>
        <p className="mt-4 text-lg">Secure your account and access amazing features.</p>
        <button className="bg-white text-primary-600 hover:bg-primary-700 text-lg font-semibold rounded-full py-2 px-6 mt-8">
          Get Started
        </button>
      </div>
    </section>
    </main>
  );
}
