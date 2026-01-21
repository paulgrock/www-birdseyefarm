import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroLogo',
      title: 'Hero Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroBackground',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'welcomeTitle',
      title: 'Welcome Title',
      type: 'string',
      initialValue: 'Welcome to our farm',
    }),
    defineField({
      name: 'welcomeText',
      title: 'Welcome Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'familyPhoto',
      title: 'Family Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
        },
      ],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
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
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
      initialValue: 'https://instagram.com/birds_eye_farm',
    }),
    defineField({
      name: 'contactHeading',
      title: 'Contact Section Heading',
      type: 'string',
      initialValue: 'Contact Us',
    }),
  ],
  preview: {
    select: {
      title: 'welcomeTitle',
    },
    prepare({ title }) {
      return {
        title: title || 'Home Page',
        subtitle: 'Main site content',
      };
    },
  },
});
