'use client'
import dynamic from 'next/dynamic';
import { Header } from "@/components/custom/header";
import { Skeleton } from '@/components/ui/skeleton';


// versão dinâmica do componente Main
const DynamicMain = dynamic(
  () => import('@/components/custom/main').then((mod) => mod.Main),
  {
    // desabilita a renderização no lado do servidor
    ssr: false,
    loading: () => (
      <section className="h-full flex flex-col lg:flex-row justify-around items-start gap-8 grow p-4">
        <div className="w-full lg:w-1/2 flex justify-center">
            <Skeleton className="w-full max-w-2xl h-[460px] rounded-lg" />
        </div>
        <div className="w-full lg:w-1/2 flex justify-center">
            <Skeleton className="w-full max-w-2xl h-[460px] rounded-lg" />
        </div>
      </section>
    ),
  }
);


export default function Home() {
  return (
    <main className="flex flex-col w-full h-screen">
      <section>
        <Header/>
      </section>
      <section className="h-full">
        <DynamicMain />
      </section>
    </main>
  );
}