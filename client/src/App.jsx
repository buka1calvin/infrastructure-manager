import { BrowserRouter as Router } from "react-router-dom";
import { Navigator } from "./routes/index";
import { Navbar } from "./components/navbar.jsx";
import { SelectedPage } from "./components/shared/variables";
import { useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";

function App() {
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Home);
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setIsTopOfPage(true);
        setSelectedPage(SelectedPage.Home);
      }
      if (window.scrollY !== 0) setIsTopOfPage(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <BounceLoader color="#5157E0" />
        </div>
      ) : (
        <Router>
          <Navbar
            isTopOfPage={isTopOfPage}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
          <Navigator />
        </Router>
      )}
    </div>
  );
}

export default App;
