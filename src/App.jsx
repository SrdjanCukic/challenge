import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AppLayout from "./UI/AppLayout";
import GlobalStyles from "./styles/GlobalStyles";

import FilterAndFind from "./components/FilterAndFind";
import OnMountApi from "./components/OnMountApi";
import NewsFeedPersonalized from "./components/NewsFeedPersonalized";

function App() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate replace to="starter" />} />
            <Route path="starter" element={<OnMountApi />} />
            <Route path="filter-and-find/:query" element={<FilterAndFind />} />
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
