import Header from './components/Header';
import CreatePost from './components/CreatePost';
import Feed from './components/Feed';

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl">
      <Header />
      <div className="px-50">
        <CreatePost />
        <Feed />
      </div>
    </div>
  );
}
