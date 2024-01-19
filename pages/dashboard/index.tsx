import Header from "@/components/navbar/";
import { signIn, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      signIn();
    },
  });

  return (
    <>
      <main>
        <Header session={session} />
        <div className="container mt-3">
          <h1>Dashboard</h1>
          Id: {session?.user.id}
          <br />
          Name: {session?.user.name}
          <br />
          User role level: {session?.user.role}
          <br />
          Email: {session?.user.email}
        </div>
      </main>
    </>
  );
}
