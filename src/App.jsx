import TheHeader from "./components/TheHeader"
import TheFooter from "./components/TheFooter"
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <TheHeader />
        <main className="flex-1">
          <HomePage />
        </main>
        <TheFooter />
      </div>
    </>
  )
}

export default App
