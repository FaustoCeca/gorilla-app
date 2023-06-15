import BranchCard from "./components/Home/BranchCard";
import StartFilters from "./components/Home/StartFilters";


export default function Home() {
  return (
    <main>
      <StartFilters />
      <h2 className="w-full py-2 bg-yellow-200 text-center mb-10 uppercase">
        Sucursales
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-10 lg:px-32">

        <BranchCard 
          title="Gorilla house funes" 
          address="Funes 1234"
        />
        <BranchCard 
          title="Gorilla house centro" 
          address="Funes 1234"
        />
      </div>
    </main>
  )
}
