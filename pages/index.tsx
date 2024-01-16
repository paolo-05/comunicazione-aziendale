import DangerAlert from "@/components/alerts/dangerAlert";
import InfoAlert from "@/components/alerts/infoAlert";
import Header from "@/components/navbar/index";
import Container from "@/components/ui/container";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <Header session={session} />
        <section className="space-y-40 mb-40">
          <Container>
            <div className="relative pt-36">
              <InfoAlert show={true} message="Info Alert" onClose={() => {}} />
              <DangerAlert
                show={true}
                message="Danger Alert"
                onClose={() => {}}
              />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
