export default function CreatePost() {
  return (
    <form>
      <textarea className="rounded-2xl border-2 border-neutral-200 shadow-xl focus:outline-none focus:border-neutral-200 focus:shadow-xl/20 dark:border-neutral-400 dark:bg-neutral-200 w-full h-50 text-xl pt-3 pl-4 resize-none" placeholder="Post"></textarea>
      <div className="flex justify-between">
        <div>
        </div>
        <button className="justify-end rounded-full bg-neutral-950 py-3 px-6 mt-3 mx-1 text-neutral-200 font-bold">Post</button>
      </div>
    </form>
  );
}
