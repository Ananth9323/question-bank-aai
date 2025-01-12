import Landingpage from '../src/components/LandingPage';
import Dashboard from './components/Dashboard';
import BlueprintForm from './components/BlueprintForm';
import QuestionManagement from './components/QuestionManagement';
import QuestionPreview from './components/QuestionPreview';
import AddQuestion from './components/AddQuestion';
import EditQuestion from './components/EditQuestion';
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
        <Route path="/question-preview" element={<QuestionPreview/>} />
        <Route path="/add-question" element={<AddQuestion/>} />
        <Route path="/edit-question" element={<EditQuestion/>} />
     </Routes>
    </Router>
  );
}

export default App;
