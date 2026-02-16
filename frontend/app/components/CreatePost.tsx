export default function CreatePost() {
  return (
    <form>
      <textarea
        className="h-50 w-full resize-none rounded-2xl border-2 border-neutral-200 pt-3 pl-4 text-xl shadow-xl focus:border-neutral-200 focus:shadow-xl/20 focus:outline-none dark:border-neutral-400 dark:bg-neutral-200"
        placeholder="Post"
      ></textarea>
      <div className="flex justify-between">
        <div></div>
        <button className="mx-1 mt-3 justify-end rounded-full bg-neutral-950 px-6 py-3 font-bold text-neutral-200">
          Post
        </button>
      </div>
    </form>
  );
}
