import Navbar from "@/components/navbar/index";
import Modal from "@/components/ui/modal";
import { Inter } from "next/font/google";
import Head from "next/head";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const handleConfirm = () => {
    return;
  };
  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={inter.className}>
        <div className="container">
          <h1 className="display-1">Homepage</h1>
          <Link href="/auth/signin">Login</Link>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#example"
          >
            Launch demo modal
          </button>
          <Modal
            id="example"
            title="Title"
            description="This is the description"
            discardText="Discard"
            saveText="Save"
            action={handleConfirm}
          />
        </div>
        <Navbar position="fixed-bottom" user={null} />
      </main>
    </>
  );
}
