import "./App.css";

import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { publicRoutes } from './routes';
import UserDetail from './pages/UserDetail/index';
import { Provider } from "react-redux";
import { store } from "./redux/store";
function App() {
    return (
        <Provider store={store}>
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
        </Provider>       
    );
}

export default App;
