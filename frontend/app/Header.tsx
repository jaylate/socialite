export default function Header() {
  return (
    <header className="">
      <div className="">
        <nav aria-label="Global" className="flex items-center justify-between pt-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a className="-m-1.5 p-1.5">
              <span className="text-3xl font-bold dark:text-white">Feed</span>
            </a>
          </div>
          <div className="">
            <a href="#" className="bg-neutral-800 dark:bg-neutral-600 text-white font-bold rounded-full py-3 px-7 mx-6">Login</a>
            <a href="#" className="bg-neutral-800 dark:bg-neutral-600 text-white font-bold rounded-full py-3 px-7">Sign up</a>
          </div>
        </nav>
        <hr className="h-px my-8 bg-gray-200 dark:bg-neutral-700 border-0"/>
      </div>
    </header>
  );
};
