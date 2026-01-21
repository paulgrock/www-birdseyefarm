import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'goat',
  title: 'Goat',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'aka',
      title: 'Nickname (AKA)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Birth Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'adgaPedigree',
      title: 'ADGA Pedigree URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pedigree',
      title: 'Pedigree URL',
      type: 'url',
    }),
    defineField({
      name: 'kiddingDate',
      title: 'Kidding Date',
      type: 'date',
    }),
    defineField({
      name: 'sire',
      title: 'Sire',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
        { name: 'link', type: 'url', title: 'Link' },
        {
          name: 'sire',
          type: 'object',
          title: 'Sire',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'link', type: 'url', title: 'Link' },
          ],
        },
        {
          name: 'dam',
          type: 'object',
          title: 'Dam',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'link', type: 'url', title: 'Link' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dam',
      title: 'Dam',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
        { name: 'link', type: 'url', title: 'Link' },
        {
          name: 'sire',
          type: 'object',
          title: 'Sire',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'link', type: 'url', title: 'Link' },
          ],
        },
        {
          name: 'dam',
          type: 'object',
          title: 'Dam',
          fields: [
            { name: 'name', type: 'string', title: 'Name' },
            { name: 'link', type: 'url', title: 'Link' },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mate',
      title: 'Mate',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name' },
        { name: 'slug', type: 'string', title: 'Slug' },
        { name: 'link', type: 'url', title: 'Link' },
      ],
    }),
    defineField({
      name: 'copy',
      title: 'Description',
      type: 'array',
      of: [{ type: 'text' }],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'prices',
      title: 'Prices',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'aka',
      media: 'images.0',
    },
  },
});
