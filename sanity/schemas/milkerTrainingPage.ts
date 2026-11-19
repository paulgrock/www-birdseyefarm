import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'milkerTrainingPage',
  title: 'Milker Training Page',
  type: 'document',
  fields: [
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'string',
      description: 'Line shown under the page title.',
      initialValue: "Pick every time that works for you and we'll confirm one.",
    }),
    defineField({
      name: 'slots',
      title: 'Training Times',
      type: 'array',
      description:
        'Times people can choose from. Times that have passed are hidden automatically. Turn off "Available" to hide a time without deleting it.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'trainingSlot',
          title: 'Time',
          fields: [
            defineField({
              name: 'start',
              title: 'Start',
              type: 'datetime',
              options: { timeStep: 15 },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'lengthHours',
              title: 'Length (hours)',
              type: 'number',
              description: 'How long the session runs, e.g. 2 or 1.5. Optional.',
              validation: (Rule) => Rule.positive(),
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'string',
              description: 'Short extra detail, e.g. "evening milking". Optional.',
            }),
            defineField({
              name: 'available',
              title: 'Available',
              type: 'boolean',
              initialValue: true,
            }),
          ],
          preview: {
            select: {
              start: 'start',
              lengthHours: 'lengthHours',
              note: 'note',
              available: 'available',
            },
            prepare({ start, lengthHours, note, available }) {
              const title = start
                ? new Date(start).toLocaleString('en-US', {
                    timeZone: 'America/Los_Angeles',
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })
                : 'No start time';
              const details = [
                typeof lengthHours === 'number' ? `${lengthHours} hrs` : null,
                note,
                available === false ? 'Hidden (not available)' : null,
              ].filter(Boolean);
              return { title, subtitle: details.join(' · ') };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Milker Training Page',
        subtitle: 'Training times',
      };
    },
  },
});
