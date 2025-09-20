import { Outlet } from "react-router-dom";
import ListingsHeader from "./Headers";

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Sticky responsive header */}
      <ListingsHeader />

      {/* Main content */}
      <main className="flex-1 w-full max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 py-4">
        <Outlet /> {/* Renders the matched child route */}
      </main>
    </div>
  );
};
