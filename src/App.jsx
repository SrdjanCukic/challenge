import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";

import SearchArticles from "./components/SearchArticles";
import OnMountApi from "./components/OnMountApi";
import NewsFeedPersonalized from "./components/NewsFeedPersonalized";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<OnMountApi />} />
            <Route path="search/:query" element={<SearchArticles />} />
            <Route
              path="/personalized-news/:params"
              element={<NewsFeedPersonalized />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
