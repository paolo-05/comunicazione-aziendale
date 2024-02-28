import { PostManager } from "@/components/dashboardActions";
import Header from "@/components/navbar/";
import Container from "@/components/ui/container";
import { PostType } from "@/types/post";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  const [posts, setPosts] = useState<Array<PostType>>([]);

  useEffect(() => {
    axios
      .get("/api/post/get-next-five-sum")
      .then((res) => setPosts(res.data.message))
      .catch((err) => console.log(err));
  }, []);

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
              <PostManager posts={posts} session={session} />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
