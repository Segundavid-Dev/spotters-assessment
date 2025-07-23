import Header from "./Header";

export default function Travel() {
  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-8">
        <img src="/travel/travel-hero.svg" alt="Travel hero image" />
        <div className="mt-5">
          <h1 className="text-5xl">Travel</h1>
        </div>
      </div>
    </div>
  );
}
