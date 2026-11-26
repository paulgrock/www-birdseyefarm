import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'goat',
  title: 'Goat',
  type: 'document',
  fieldsets: [
    {
      name: 'records',
      title: 'Herd records',
      description: 'Filled in from Milk Manager. Not shown on the website.',
      options: { collapsible: true, collapsed: true },
    },
  ],
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
      name: 'goatType',
      title: 'Type',
      type: 'string',
      initialValue: 'doe',
      options: {
        list: [
          { title: 'Doe', value: 'doe' },
          { title: 'Buck', value: 'buck' },
          { title: 'Wether', value: 'wether' },
          { title: 'Reference', value: 'reference' },
        ],
        layout: 'radio',
      },
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
      name: 'displayOrder',
      title: 'Display Order (Main Page)',
      type: 'number',
      description:
        'Order for displaying goats on the main goats page (lower numbers appear first)',
      validation: (Rule) => Rule.integer().min(0),
    }),
    defineField({
      name: 'kiddingScheduleOrder',
      title: 'Kidding Schedule Order',
      type: 'number',
      description:
        'Order for displaying goats on the kidding schedule page (lower numbers appear first)',
      validation: (Rule) => Rule.integer().min(0),
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
        {
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: (Rule) => Rule.required(),
        },
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
        {
          name: 'name',
          type: 'string',
          title: 'Name',
          validation: (Rule) => Rule.required(),
        },
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
    defineField({
      name: 'breed',
      title: 'Breed',
      type: 'string',
      fieldset: 'records',
    }),
    defineField({
      name: 'breedCategory',
      title: 'Breed Category',
      type: 'string',
      fieldset: 'records',
      options: {
        list: [
          { title: 'Purebred', value: 'purebred' },
          { title: 'American', value: 'american' },
          { title: 'Experimental', value: 'experimental' },
          { title: 'Recorded Grade', value: 'recorded_grade' },
        ],
      },
    }),
    defineField({
      name: 'registry',
      title: 'Registry',
      type: 'string',
      fieldset: 'records',
    }),
    defineField({
      name: 'registrationNumber',
      title: 'Registration Number',
      type: 'string',
      fieldset: 'records',
    }),
    defineField({
      name: 'colorMarkings',
      title: 'Color and Markings',
      type: 'string',
      fieldset: 'records',
    }),
    defineField({
      name: 'hornStatus',
      title: 'Horns',
      type: 'string',
      fieldset: 'records',
      options: {
        list: [
          { title: 'Disbudded', value: 'disbudded' },
          { title: 'Polled', value: 'polled' },
          { title: 'Horned', value: 'horned' },
        ],
      },
    }),
    defineField({
      name: 'tattooRight',
      title: 'Tattoo, Right Ear',
      type: 'string',
      fieldset: 'records',
      description: 'Herd letters',
    }),
    defineField({
      name: 'tattooLeft',
      title: 'Tattoo, Left Ear',
      type: 'string',
      fieldset: 'records',
      description: 'Year letter + number',
    }),
    defineField({
      name: 'scrapieTag',
      title: 'Scrapie Tag',
      type: 'string',
      fieldset: 'records',
    }),
    defineField({
      name: 'microchip',
      title: 'Microchip',
      type: 'string',
      fieldset: 'records',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'aka',
      media: 'images.0',
    },
  },
})
