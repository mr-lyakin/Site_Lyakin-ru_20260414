import Link from "next/link";
import Image from "next/image";
import { SiteShell } from "../components/site-shell";
import { getBlogPosts } from "../lib/blog-store";

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  return (
    <SiteShell>
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900">Блог</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Здесь собраны статьи и лонгриды по управлению проектами, системному развитию организаций
          и современным подходам к управлению.
        </p>
        <div className="mt-6 overflow-hidden rounded-2xl">
          <Image
            src="/blog-top-hero.png"
            alt="Обложка раздела Блог"
            width={1904}
            height={655}
            className="h-auto w-full object-cover"
            priority
          />
        </div>
        <div className="mt-8 space-y-4">
          {blogPosts.map((post) => (
            <article key={post.slug} className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              {post.coverImageUrl && (
                <div className="mb-4 overflow-hidden rounded-xl">
                  <Image src={post.coverImageUrl} alt={post.title} width={1200} height={630} className="h-48 w-full object-cover" />
                </div>
              )}
              <p className="text-xs uppercase tracking-wide text-slate-500">
                {post.publishedAt} • {post.readTime}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">{post.title}</h2>
              <p className="mt-3 text-slate-600">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Читать полностью
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}
