import { client } from '@/sanity/client'
import { PortableText } from '@portabletext/react'
import Link from 'next/link'

// Hent én spesifikk episode basert på slug
const SINGLE_EPISODE_QUERY = `*[_type == "episode" && slug.current == $slug][0]{
  title,
  pubDate,
  summary,
  audioUrl,
  youtubeId,
  showNotes,
  transcript
}`

export default async function EpisodePage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const episode = await client.fetch(SINGLE_EPISODE_QUERY, { slug })

    if (!episode) {
        return (
            <main className="max-w-3xl mx-auto px-4 py-12">
                <p>Fikk ikke funnet denne episoden.</p>
                <Link href="/" className="text-blue-600 underline">Tilbake til oversikten</Link>
            </main>
        )
    }

    return (
        <main className="max-w-3xl mx-auto px-4 py-12">
            <Link href="/" className="text-sm font-semibold text-blue-600 hover:underline mb-8 inline-block">
                ← Tilbake til alle episoder
            </Link>

            <article>
                <time className="text-sm font-medium text-gray-500">
                    {new Date(episode.pubDate).toLocaleDateString('no-NO', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })}
                </time>

                <h1 className="text-3xl sm:text-4xl font-extrabold mt-1 mb-4 tracking-tight">
                    {episode.title}
                </h1>

                <p className="text-lg text-gray-700 font-medium mb-8 leading-relaxed">
                    {episode.summary}
                </p>

                {/* Lydavspiller-lenke / spillerelement */}
                {episode.audioUrl && (
                    <div className="mb-10 p-6 bg-gray-50 rounded-xl border border-gray-200">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-2">Lyd</h2>
                        <a
                            href={episode.audioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center font-semibold text-blue-600 hover:underline"
                        >
                            Åpne eller last ned MP3-lydfil ↗
                        </a>
                    </div>
                )}

                {/* Show Notes */}
                {episode.showNotes && (
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-4">Show Notes</h2>
                        <div className="prose prose-gray max-w-none">
                            <PortableText value={episode.showNotes} />
                        </div>
                    </section>
                )}

                {/* Transkripsjon (Viktig for UU!) */}
                {episode.transcript && (
                    <section className="mb-12 p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                        <h2 className="text-2xl font-bold mb-4 text-blue-900">Transkripsjon</h2>
                        <div className="prose prose-blue max-w-none text-gray-800">
                            <PortableText value={episode.transcript} />
                        </div>
                    </section>
                )}
            </article>
        </main>
    )
}