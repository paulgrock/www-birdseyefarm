import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'deliveriesPage',
  title: 'Deliveries Page',
  type: 'document',
  fields: [
    defineField({
      name: 'options',
      title: 'Delivery Options',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Checkbox options shown on the deliveries form. Drag to reorder. The text here is also the value recorded in form submissions.',
      initialValue: [
        'Dozen-A-Week 🍳 Subscription ($24/month)',
        'Now-and-Then Eggs ($8/doz)',
        'Honey',
        'Seasonal fruit & veggies',
        'Other',
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Deliveries Page',
        subtitle: 'Delivery form options',
      };
    },
  },
});
