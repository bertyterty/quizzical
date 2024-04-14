import './App.module.css';
import Start from './Components/Start';
import Questions from './Components/Questions';
import { useState } from 'react'

function App() {

  const [position, setPosition] = useState(1)
  const [settings, setSettings] = useState({
    category: 'all',
    difficulty: 'any'
  })

  const handleStart = () => {
    setPosition(2)
  }

  const handleReset = () => {
    setPosition(1)
  }

  const handleSettings = (event) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <main>
      {
        position === 2 ?
          <Questions
            handleReset={handleReset}
            settings={settings} /> :
          <Start
            handleStart={handleStart}
            settings={settings}
            handleSettings={handleSettings} />
      }
    </main>
  );
}

export default App;
