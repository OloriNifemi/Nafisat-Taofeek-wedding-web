import Landing from "./components/Landing/Landing";

import { useEffect } from "react";

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Landing />;
}

export default App;
