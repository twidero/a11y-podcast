import { Heading, Link } from '@digdir/designsystemet-react';
import { client } from "@/sanity/client";

// GROQ-spørring skreddersydd for episode.ts
const EPISODES_QUERY = `*[_type == "episode"] | order(pubDate desc) {
  _id,
  title,
  "slug": slug.current,
  pubDate,
  summary
}`;

type Episode = {
  _id: string;
  title: string;
  slug: string | null;
  pubDate: string;
  summary: string;
};


export default async function Home() {
  // Henter alle publiserte episoder
  const episodes: Episode[] = await client.fetch(EPISODES_QUERY);
  return (
    <main>
      <Heading level={1} className="mb-8" data-size="lg">
        A11y Activists Podcast
      </Heading>
      <p>
        Welcome to our podcast about accessibility and digital inclusion. We, Pankhuri and Tom, 
        want to use this podcast to share our experiences in building accessible digital products
        from a product, UX and technical perspective.
      </p>
      <Heading level={2} className="mb-8" data-size="md" id="episodes-heading">
        Episodes ({episodes.length})
      </Heading>

      {episodes.length === 0 ? (
        <p>No episodes found.</p>
      ) : (
        <ul className="space-y-6 list-none p-0">
          {episodes.map((episode: Episode) => (
            <li key={episode._id} className="border-b border-subtle pb-6">
              <article>
                {/* Episodetittel som H2-lenke for god overskriftsstruktur */}
                <Heading level={2}>
                  {episode.slug ? (
                    <Link href={`/episodes/${episode.slug}`}>
                      {episode.title}
                    </Link>
                  ) : (
                    episode.title
                  )}
                </Heading>

                {/* Maskinlesbar publiseringsdato */}
                {episode.pubDate && (
                  <time
                    dateTime={episode.pubDate}
                    className="text-sm text-subtle block my-2"
                  >
                    {new Date(episode.pubDate).toLocaleDateString('no-NO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}

                {/* Kort sammendrag av episoden */}
                {episode.summary && (
                  <p className="mt-2 text-default leading-relaxed">
                    {episode.summary}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
