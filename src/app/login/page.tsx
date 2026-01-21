"use client";

import { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setEmail,
  setPassword,
  setError,
  setLoading,
  resetForm,
} from "@/store/slices/loginSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email, password, error, loading } = useAppSelector((state) => state.login);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setError(""));
    dispatch(setLoading(true));

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        dispatch(setError("Email veya şifre hatalı!"));
      } else {
        dispatch(resetForm());
        router.push("/collection");
        router.refresh();
      }
    } catch (error) {
      dispatch(setError("Bir hata oluştu. Lütfen tekrar deneyin."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-zinc-900 p-8 shadow-lg border border-gray-800">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Giriş Yap
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
              className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Şifre
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
              className="w-full rounded-md border border-gray-700 bg-zinc-800 px-4 py-2 text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Şifrenizi girin"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-900/20 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-6 rounded-md bg-zinc-800 border border-gray-700 p-4 text-sm text-gray-400">
          <p className="font-semibold mb-2">Test Kullanıcıları:</p>
          <ul className="space-y-1">
            <li>Email: basri@info.com | Şifre: 123456</li>
            <li>Email: test@example.com | Şifre: 123456</li>
            <li>Email: admin@example.com | Şifre: admin123</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
