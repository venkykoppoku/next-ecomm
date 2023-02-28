import Link from 'next/link';

const { default: Head } = require('next/head');

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + '- Amazon' : 'Amazon'}</title>
        <meta name="description" content="Ecommerce Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex justify-between px-4 items-center h-12 shadow-md">
            <Link href="/" className="text-lg font-bold">
              Amazon
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4 ">{children}</main>
        <footer className="flex justify-center items-center h-10 shadow-inner">
          Copyright &#169; 2023 Amazon
        </footer>
      </div>
    </>
  );
};

export default Layout;
