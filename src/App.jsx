import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header'
import NavSection from './NavSection/NavSection'
import MainSection from './MainSection/MainSection'

export const UserContext = createContext();

function App() {
  const [data , setData] = useState([]);
  const [Navigator , setNavigator] = useState(false);

  return (
   <>
<UserContext.Provider value={{Navigator,setNavigator,data , setData}}>
     
   <Header />
   <NavSection />
   <MainSection />
</UserContext.Provider>
   </>
  )
}

export default App
