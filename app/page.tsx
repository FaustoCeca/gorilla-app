import BranchCard from "./components/Home/BranchCard";
import StartFilters from "./components/Home/StartFilters";
import { getBranches } from "./helpers/getBranches";


export default async function Home() {

  const branches = await getBranches();

  return (
    <main>
      <StartFilters />
      <h2 className="w-full py-2 bg-yellow-200 text-center mb-10 uppercase">
        Sucursales
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 px-10 lg:px-32">
        {
          branches.map((branch) => (
            <BranchCard 
              key={branch.id} 
              title={branch.name}
              address={branch.address}
              id={branch.id}
            />
          ))
        }
      </div>
    </main>
  )
}
