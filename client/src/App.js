import Landingpage from '../src/components/LandingPage';
import Dashboard from './components/Dashboard';
import BlueprintForm from './components/BlueprintForm';
import QuestionManagement from './components/QuestionManagement';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Landingpage/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/create-paper" element={<BlueprintForm/>} />
        <Route path="/manage-questions" element={<QuestionManagement/>} />
     </Routes>
    </Router>
  );
}

export default App;
