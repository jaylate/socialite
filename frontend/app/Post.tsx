export default function Post({ fullname, username, content, likesCount }) {
  return (
    <div className="flex-col">
      <div className="flex">
        <span className="font-bold text-xl py-1 dark:text-neutral-100">{fullname}</span>
        <span className="text-gray-600 text-md ml-4 py-1.5 dark:text-neutral-300">@{username}</span>
      </div>
      <div className="my-1 mb-3 px-2 text-[18px] dark:text-neutral-300">{content}</div>
      <div className="flex">
        <div className="flex">
          <div className="py-1">
	    <svg className="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
            </svg>
          </div>
          <span className="ml-2 text-gray-600 dark:text-neutral-200 py-0.5">{likesCount}</span>
        </div>
      </div>
    </div>
  );
};
