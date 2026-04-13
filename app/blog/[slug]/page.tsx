import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/site-shell";
import { blogPosts } from "../../lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <div id="top" className="border-b border-slate-200 bg-slate-100/70">
        <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center gap-2 px-4 py-3 text-sm text-slate-600 sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:text-slate-900">
            Главная
          </Link>
          <span>→</span>
          <Link href="/blog" className="transition hover:text-slate-900">
            Блог
          </Link>
          <span>→</span>
          <span className="text-slate-800">{post.title}</span>
        </div>
      </div>

      <article className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-wide text-slate-500">
          {post.publishedAt} • {post.readTime}
        </p>
        <h1 className="mt-2 text-4xl font-bold text-slate-900">{post.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>
        <div className="mt-8 space-y-5 text-slate-700">
          {post.content.map((paragraph, idx) => (
            <p key={`${post.slug}-${idx}`}>{paragraph}</p>
          ))}
        </div>
        <div className="mt-10 flex justify-end">
          <a
            href="#top"
            aria-label="Вернуться наверх"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100 hover:text-slate-900"
            title="Наверх"
          >
            ↑
          </a>
        </div>
      </article>
    </SiteShell>
  );
}
