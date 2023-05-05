import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShowPage } from './component/ShowPage';
import { HomePage } from './component/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<HomePage/>} />
        <Route path="/show/:id" element={<ShowPage/>} />
      </Routes>
    </Router>
  );
}
export default App;
