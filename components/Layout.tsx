import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export const Layout = (props: any) => {
  const { children, title = 'Default title' } = props;
  return (
    <div className="flex justify-center items-center flex-col min-h-screen text-white text-sm font-mono bg-gray-800">
      <Head>
        <title>{title}</title>
      </Head>
      {/* <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex items-center pl-8 h-14">
            <div className="flex space-x-4">
              <Link href="/">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                  Home
                </a>
              </Link>
              <Link href="/blog">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                  Blog
                </a>
              </Link>
              <Link href="/contact">
                <a className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">
                  Contact
                </a>
              </Link>
            </div>
          </div>
        </nav>
      </header> */}
      <main className="flex flex-1 justify-center items-center flex-col w-screen">{children}</main>
      <footer className="w-full h-6 flex justify-center items-center text-sm text-gray-500">@takemalBlog@2022</footer>
    </div>
  );
};
