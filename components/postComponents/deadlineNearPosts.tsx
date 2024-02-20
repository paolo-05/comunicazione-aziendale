import { useRouter } from "next/router";

const posts = [
  {
    id: 1,
    title: "Gita aziendale",
    deadline: "24/2/2024",
    createdAt: "19/1/2024",
    endDate: "23/2/2024",
  },
  {
    id: 2,
    title: "Gita aziendale",
    deadline: "24/2/2024",
    createdAt: "19/1/2024",
    endDate: "23/2/2024",
  },
  {
    id: 3,
    title: "Gita aziendale",
    deadline: "24/2/2024",
    createdAt: "19/1/2024",
    endDate: "23/2/2024",
  },
];

export const DeadlineNearPosts = () => {
  const router = useRouter();

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Titolo
            </th>
            <th scope="col" className="px-6 py-3">
              Data di pubblicazione
            </th>
            <th scope="col" className="px-6 py-3">
              Data effettiva
            </th>
            <th scope="col" className="px-6 py-3">
              Visibile fino al
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              onClick={() => router.push(`/posts/${post.id}`)}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {post.title}
              </th>
              <td className="px-6 py-4">{post.createdAt}</td>
              <td className="px-6 py-4">{post.deadline}</td>
              <td className="px-6 py-4">{post.endDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
