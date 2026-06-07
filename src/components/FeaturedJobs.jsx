import { getAllJobs } from "@/lib/api/job";
import JobCard from "./JobCard";

export default async function FeaturedJobs() {
    const data=await getAllJobs();
    console.log(data);
    
  return (
    <section className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-primary">
            Smart Job Discovery
          </p>

          <h2 className="mt-5 text-5xl font-semibold">
            The roles you'd never
            <br />
            find by searching
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {
            data.map(cardData=>(
                <JobCard key={cardData._id} cardData={cardData}/>
            ))
          }
        </div>
      </div>
    </section>
  );
}