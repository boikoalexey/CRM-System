import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './layouts/MainLayout'
import { TodoList } from './pages/TodoList'
import { Profile } from './pages/Profile'
import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="todo" replace />} />
          <Route path="todo" element={<TodoList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="todo" replace />} />
        </Route>
      </Routes>
    </Router>
  )
}
