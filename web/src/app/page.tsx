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
    <div>
      <header>
        <Heading level={1} className="mb-8">
          A11y Activist Podkast
        </Heading>
        <p>
          En podkast om universell utforming, digital tilgjengelighet og
          rettferdig teknologi.
        </p>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <Heading level={2} className="mb-8" id="episodes-heading">
          Episoder ({episodes.length})
        </Heading>

        {episodes.length === 0 ? (
          <p>Ingen episoder publisert ennå.</p>
        ) : (
          <ul className="pace-y-6 list-none p-0">
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
    </div>
  )
}
