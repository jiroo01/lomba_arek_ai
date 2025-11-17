import { useState } from 'react'
import reactLogo from './assets/react.svg'
import logoAbsen from '/logo_absen.png'
import Sidebar from './Sidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 p-6">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Welcome to your Dashboard</h1>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              Logout
            </button>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Total Users</h3>
              <p className="text-gray-600 text-3xl">1,234</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Revenue</h3>
              <p className="text-gray-600 text-3xl">$56,789</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">Orders</h3>
              <p className="text-gray-600 text-3xl">456</p>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
            <ul>
              <li className="border-b border-gray-200 py-2">User John Doe logged in.</li>
              <li className="border-b border-gray-200 py-2">New product added: Super Widget.</li>
              <li className="py-2">Report generated for Q3.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
