import { defineField, defineType } from 'sanity';

export const episodeType = defineType({
  name: 'episode',
  title: 'Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episodetittel',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pubDate',
      title: 'Publiseringsdato',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Kort sammendrag (Ingress)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'audioUrl',
      title: 'Lydfil URL (MP3 fra Spotify for Creators / RSS)',
      type: 'url',
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube Video ID (f.eks. dQw4w9WgXcQ)',
      type: 'string',
    }),
    defineField({
      name: 'showNotes',
      title: 'Show Notes / Beskrivelse',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'transcript',
      title: 'Transkripsjon',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});