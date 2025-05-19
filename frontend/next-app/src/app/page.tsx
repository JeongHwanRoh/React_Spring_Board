"use client"; // 로그인 페이지는 통상 CSR로 처리함.

import Image from "next/image";
import { useEffect, useState } from "react";
import InputField from "@/components/common/InputField";
import Link from "next/link";

import { login } from "@/lib/services/authService";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log('Current password value:', password);
  }, [password]);

  // 라우터. CSR페이지이기 때문에 라우터 처리 해줘야함.
  const router = useRouter();


  // 로그인 핸들러
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    console.log(email, password)

    try {
      const { accessToken, refreshToken } = await login({ email, password });

      console.log("로그인 요청")
      // 성공했으면 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // 로그인 후 이동
      router.push("/dashboard");

    } catch (err : unknown) {
      console.error(err);
      if(axios.isAxiosError(err) &&err.response){
        alert('로그인 실패 : ' + err.response.data);
      }else{
        alert('로그인 중 알 수 없는 에러가 발생했습니다.');

      }

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center justify-center gap-20 max-w-6xl w-full">
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <Image
            src="/images/TASKCO.png"
            alt="Taskco Logo"
            width={1280}
            height={800}
            className="w-64 md:w-80 object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 max-w-md bg-white p-10 rounded-xl shadow-lg border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">
            로그인
          </h1>

          <form className="space-y-5" onSubmit={handleLogin}>
            <InputField
              id="email"
              label="이메일"
              type="email"
              value={email}
              placeholder="이메일을 입력하세요"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              id="password"
              label="패스워드"
              type="password"
              value={password}
              placeholder="패스워드를 입력하세요"
              onChange={(e) => {
                console.log('Password input changed:', e.target.value);
                setPassword(e.target.value);
              }}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            >
              로그인
            </button>
          </form>

          <form className="mt-4" action="goJoin" method="post">
            {/* 클래스에 block 추가해줘야함. */}
            <Link
              href="/signup"
              className="block w-full text-center bg-purple-500 text-white py-2 rounded hover:bg-gray-400 transition-colors"
            >
              회원가입
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
