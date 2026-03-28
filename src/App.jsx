import { useState, useEffect } from 'react'
import './index.css'
import TopNavBar from './components/TopNavBar'
import SideNavBar from './components/SideNavBar'
import DashboardHeader from './components/DashboardHeader'
import DashboardWidgets from './components/DashboardWidgets'
import KeyEventsPanel from './components/KeyEventsPanel'
import MainChart from './components/MainChart'

function App() {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div className="flex h-full w-full">
      <TopNavBar />
      <SideNavBar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      <main className={`flex-1 p-8 pt-20 transition-all duration-300 min-h-screen ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-[4.5rem]'}`}>
        <DashboardHeader />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
          <div className="lg:col-span-9 flex flex-col gap-6">
            <MainChart />
            <DashboardWidgets />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-6">
            <KeyEventsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
