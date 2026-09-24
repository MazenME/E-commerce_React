import { useState, useEffect, useCallback, Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import Footer from "@/components/common/Footer/Footer";
import Header from "@/components/common/Header/Header";
import SideBar from "@/components/common/SideBar/SideBar";

const MainTemplate = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const showSideBar =
    location.pathname.startsWith("/products") ||
    location.pathname.startsWith("/categories");

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  const handleOpenSidebar = useCallback(() => {
    setIsSidebarOpen(true);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 mt-0">
      <Header />
      <main className="flex flex-col md:flex-row gap-6 flex-1 relative">
        {/* Mobile Sidebar Overlay Backdrop */}
        {showSideBar && isSidebarOpen && (
          <div
            onClick={handleCloseSidebar}
            className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          />
        )}

        {showSideBar && <SideBar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />}
        
        <div className="flex-1 flex flex-col">
          {showSideBar && (
            <div className="md:hidden w-full flex justify-end px-5 pt-4">
              <button
                onClick={handleOpenSidebar}
                className="flex items-center gap-2 bg-gray-900 border border-gray-800 text-gray-200 py-2.5 px-5 rounded-xl text-sm font-semibold active:scale-95 transition-all shadow-md cursor-pointer hover:bg-gray-800"
              >
                <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
                Filters
              </button>
            </div>
          )}
          <Suspense
            fallback={
              <div className="flex-1 flex items-center justify-center min-h-[50vh]">
                <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainTemplate;
