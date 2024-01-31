import Navbar from "@/components/navbar";
import { useUnrestrictedSession } from "@/hooks/session/useUnrestrictedSession";
import useChangePassword from "@/hooks/user-hooks/useChangePassword";
import { Inter } from "next/font/google";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function ChangePassword() {
  const session = useUnrestrictedSession();

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    showPsw,
    handleShowPswChange,
    onSubmit,
  } = useChangePassword(session);

  return (
    <>
      <Head>
        <title>Cambiamento Password</title>
      </Head>
      <main className={inter.className}>
        <Navbar session={session} />
        <div className="min-h-screen flex items-center justify-center">
          <section className="mt-36">
            <div className="flex flex-col items-center justify-center px-6 py-8">
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Cambia Password
                </h2>
                <form
                  className="mt-4 space-y-4 lg:mt-5 md:space-y-5 md:w-96 xs:w-52"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      La tua Email
                    </label>
                    <input
                      id="email"
                      value={session?.user.email || ""}
                      type="text"
                      disabled
                      className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="oldPsw"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Vecchia Password (richiesto)
                    </label>
                    <input
                      id="oldPsw"
                      {...register("oldPsw")}
                      type={showPsw === 1 ? "text" : "password"}
                      placeholder={
                        showPsw ? "SuperSegretaPassword123" : "••••••••"
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.oldPsw && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.oldPsw.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="newPsw"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Nuova Password (richiesto)
                    </label>
                    <input
                      id="newPsw"
                      {...register("newPsw")}
                      type={showPsw === 1 ? "text" : "password"}
                      placeholder={
                        showPsw ? "SuperSegretaPassword123" : "••••••••"
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.newPsw && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.newPsw.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPsw"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Conferma Nuova Password (richiesto)
                    </label>
                    <input
                      id="confirmPsw"
                      {...register("confirmPsw")}
                      type={showPsw === 1 ? "text" : "password"}
                      placeholder={
                        showPsw ? "SuperSegretaPassword123" : "••••••••"
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                    {errors.confirmPsw && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        {errors.confirmPsw.message}
                      </p>
                    )}
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="show-psw"
                        aria-describedby="show-psw"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required={false}
                        value={showPsw}
                        onChange={handleShowPswChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="show-psw"
                        className="font-light text-gray-500 dark:text-gray-300 underline"
                      >
                        Mostra password
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isSubmitting ? "Caricamento..." : "Cambia Password!"}
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
