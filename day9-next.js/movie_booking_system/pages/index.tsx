import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';


export default function Home() {
  return (
    <>
      <Head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.16/tailwind.min.css"
          rel="stylesheet"
        />
      </Head>
      <h1>Hello</h1>
      <div className="bg-black-300 w-500 border-green-500 border-4 p-12 m-5">
       
      </div>
    </>
  );
}
