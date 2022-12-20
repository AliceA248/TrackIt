import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Registerr from './Pages/Registerr';
import TodayCounter from './Pages/TodayCounter';
import CreateHabit from './Pages/CreateHabit';
import Historic from './Pages/Historic';
import AuthProvider from './AuthContext';


function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/cadastro" element={<Registerr />} />
					<Route path="/hoje" element={<TodayCounter />} />
					<Route path="/habitos" element={<CreateHabit />} />
					<Route path="/historico" element={<Historic />} />
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;