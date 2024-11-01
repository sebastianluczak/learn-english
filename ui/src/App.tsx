import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LearnEnglish from './LearnEnglish';
import Dashboard from './Dashboard';
import SimpleMath from "./SimpleMath.tsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn-english" element={<LearnEnglish />} />
          <Route path="/simple-math" element={<SimpleMath />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
