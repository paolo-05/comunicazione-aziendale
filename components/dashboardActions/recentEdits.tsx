import { RecentPostEdit } from "@/types/post";
import { Skeleton } from "../ui/skeleton";

type RecentEditsProps = { lastEdits: Array<RecentPostEdit> };

export const RecentEdits = ({ lastEdits }: RecentEditsProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">
          Modifiche recenti agli annunci
        </h2>
        <div className="flex flex-col gap-4">
          {lastEdits && lastEdits.length > 0 ? (
            lastEdits.map((edit, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-4 rounded-md border dark:border-gray-600"
              >
                <div>
                  <h3 className="font-semibold">{edit.title}</h3>
                  <p className="text-sm text-gray-400">
                    Modificato da {edit.name} {edit.lastName}
                  </p>
                </div>
                <time className="text-sm">
                  {new Date(edit.updated_at).toLocaleString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit",
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </time>
              </div>
            ))
          ) : (
            <Skeleton />
          )}
        </div>
      </div>
    </section>
  );
};
