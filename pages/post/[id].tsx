import Header from "@/components/navbar";
import DeletePostButton from "@/components/postComponents/deletePostButton";
import Container from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";
import { usePost } from "@/hooks/post";
import { useSession } from "next-auth/react";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Post() {
  // since this page is used for both
  // authenticated users and not, we just use
  // the session from `next-auth`
  const { data: session } = useSession();

  const router = useRouter();
  const id = router.query.id;

  const { post } = usePost(id);

  return (
    <>
      <Head>
        <title>{post?.title || "Titolo Post"}</title>
      </Head>

      <main className={inter.className}>
        <Header session={session} />
        <div className="relative py-16 space-y-40">
          <div
            aria-hidden="true"
            className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
          >
            <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
            <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
          </div>
          <Container>
            <div className="relative">
              <div className="absolute left-2 top-0">
                <Link
                  className="ml-3"
                  href={session?.user ? "/dashboard" : "/"}
                >
                  <svg
                    className="w-10 h-10 text-gray-800 dark:text-white hover:text-secondary"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14M5 12l4-4m-4 4 4 4"
                    />
                  </svg>
                </Link>
              </div>
              <section className="bg-white dark:bg-gray-900 rounded-lg">
                {!post ? (
                  <Skeleton />
                ) : (
                  <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <Image
                      className="mx-auto my-3 xs:mt-3 max-h-64 max-w-fit rounded-lg h-32 md:h-64"
                      alt="logo"
                      src={post.imageURL}
                      width={512}
                      height={512}
                      loading="lazy"
                      priority={false}
                      placeholder="data:image/svg;base64,L3BsYWNlaG9sZGVyLnN2Zw=="
                    />
                    <h2 className="mb-2 text-xl font-semibold leading-none text-gray-900 md:text-2xl dark:text-white">
                      {post?.title || "Titolo post"}
                    </h2>
                    <p className="mb-4 text-sm font-light leading-none text-gray-900 dark:text-white">
                      Accade il{" "}
                      {new Date(post?.actualDate || "").toLocaleString(
                        "it-IT",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>
                    <dl>
                      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Descrzione
                      </dt>
                      <dt
                        className="mb-4 sm:mb-5 prose data-from-editor"
                        dangerouslySetInnerHTML={{
                          __html: post?.description || "",
                        }}
                      ></dt>
                    </dl>
                    {/* <dl className="flex items-center space-x-6">
                    <div>
                      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Category
                      </dt>
                      <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                        Electronics/PC
                      </dd>
                    </div>
                    <div>
                      <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                        Item weight
                      </dt>
                      <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
                        12kg
                      </dd>
                    </div>
                  </dl> */}
                    {session?.user && (
                      <div className="flex items-center space-x-4">
                        <Link
                          href={`/post/edit?id=${id}`}
                          className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          <svg
                            aria-hidden="true"
                            className="mr-1 -ml-1 w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                            <path
                              fillRule="evenodd"
                              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          Modifica
                        </Link>
                        <DeletePostButton session={session} post={post!} />
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          </Container>
        </div>
      </main>
    </>
  );
}
