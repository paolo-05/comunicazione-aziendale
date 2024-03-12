import { PostItemProps } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import DeletePostButton from "./deletePostButton";

export const Item = ({ post, session }: PostItemProps) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-6 lg:py-12 rounded-lg">
      <div className="container px-4 md:px-6">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_900px]">
          <div className="hidden lg:block">
            <Image
              alt="Cover Image"
              className="xs:mt-3 max-h-64 rounded-lg h-32 md:h-64"
              height={500}
              src={post.imageURL}
              width={500}
            />
          </div>
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl">
              {post.title}
            </h1>
          </div>
          <div className="flex justify-center items-center">
            <div className="grid gap-4">
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-6 h-6 mr-2" />
                  <span className="text-sm font-medium">
                    {new Date(post?.actualDate || "").toLocaleString("it-IT", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
              {/* TO DO */}
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-6 h-6 mr-2" />
                  <span className="text-sm font-medium">
                    Developers, Designers, and Business Leaders
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center lg:text-left">
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
            {session?.user && (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/post/edit?id=${post.id}`}
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
        </div>
      </div>
    </div>
  );
};

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function UsersIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
