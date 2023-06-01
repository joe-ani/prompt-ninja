import Feed from "../components/Feed.jsx"

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="orange_gradient">AI-Powered prompts</span>
      </h1>
      <p className="desc text-center">
        Prompt ninja is an open source AI promption tool for creating and
        sharing creative AI prompts
      </p>

      {/* feed */}
      <Feed />
    </section>
  );
}
