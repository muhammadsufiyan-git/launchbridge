import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ImmersiveScene from './components/ImmersiveScene'
import ScrollTextReveal from './components/ScrollTextReveal'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Roadmap from './pages/Roadmap'
import Costs from './pages/Costs'
import Stories from './pages/Stories'
import Forum from './pages/Forum'
import About from './pages/About'
import './App.css'

function Layout() {
  return (
    <div className="page">
      <ImmersiveScene />
      <ScrollTextReveal />
      <Navbar />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/costs" element={<Costs />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
