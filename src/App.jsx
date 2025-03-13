import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import UserDetail from './pages/UserDetail/index';
function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component />}
                    />
                    
                ))}
                <Route path="/user/:userId" element={<UserDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
