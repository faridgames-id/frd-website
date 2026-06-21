import BorderGlow from './components/BorderGlow'
import { SplineSceneBasic } from './components/ui/demo'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <div className="ambient"></div>

      <main className="main-content">
        <section className="hero">
          <h1>Farid Shop Game</h1>
          <p>Pusat Akun Sultan Terpercaya</p>
          
          <SplineSceneBasic />
          
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#120F17"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1.6}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div style={{ padding: '2em' }}>
              <h2>Welcome to BorderGlow</h2>
              <p>Hover near the edges to see the glow effect.</p>
            </div>
          </BorderGlow>

          <BorderGlow
            edgeSensitivity={25}
            glowColor="220 100 60"
            backgroundColor="#0d1117"
            borderRadius={20}
            glowRadius={50}
            glowIntensity={2.0}
            coneSpread={20}
            animated={true}
            colors={['#4F8EF7', '#8BB8FF', '#F7C948']}
          >
            <div style={{ padding: '2.5em' }}>
              <h3>Animated Glow Card</h3>
              <p>This card has animation enabled!</p>
            </div>
          </BorderGlow>
        </section>
      </main>
    </div>
  )
}
