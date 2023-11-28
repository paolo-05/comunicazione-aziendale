import Navbar from "@/components/navbar/index";

export default function Dashboard() {
  return (
    <div>
      <Navbar position={"sticky-top"} shouldFetch={true} />
      <div className="container mt-3">
        <h1>Dashboard</h1>
      </div>
    </div>
  );
}
