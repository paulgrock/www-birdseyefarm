import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'deliveriesPage',
  title: 'Deliveries Page',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Delivery Items',
      type: 'array',
      description:
        'Items customers can order. Drag to reorder. Turn off "Available" to hide an item without deleting it.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'deliveryItem',
          title: 'Item',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'price',
              title: 'Price ($)',
              type: 'number',
              description:
                'Price for one unit, in dollars (e.g. 8 or 4.50). Leave blank if the price varies: customers can still request it, but it is not added to their total.',
              validation: (Rule) => Rule.min(0).precision(2),
            }),
            defineField({
              name: 'unit',
              title: 'Unit',
              type: 'string',
              description: 'What one unit is, e.g. "dozen", "jar", "month". Optional.',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'Short extra detail shown under the name. Optional.',
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
              name: 'name',
              price: 'price',
              unit: 'unit',
              available: 'available',
            },
            prepare({ name, price, unit, available }) {
              const priceText =
                typeof price === 'number'
                  ? `$${price}${unit ? ` / ${unit}` : ''}`
                  : 'Price varies';
              return {
                title: name,
                subtitle:
                  available === false
                    ? `${priceText} · Hidden (not available)`
                    : priceText,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: 'venmoUsername',
      title: 'Venmo Username',
      type: 'string',
      description:
        'Venmo username to receive payments, without the @ (e.g. "Birds-Eye-Farm"). Leave blank to hide the Venmo button.',
      validation: (Rule) =>
        Rule.custom((value) =>
          value && value.startsWith('@') ? 'Leave off the leading @' : true
        ),
    }),
    defineField({
      name: 'paymentNote',
      title: 'Payment Note',
      type: 'string',
      description: 'Line shown under the page title.',
      initialValue: 'Select items for your order here. Pay by Venmo or cash.',
    }),
    defineField({
      name: 'options',
      title: 'Delivery Options (old)',
      type: 'array',
      of: [{ type: 'string' }],
      description:
        'Old text-only list. Only used if "Delivery Items" is empty. Move these into Delivery Items, then clear this list.',
      hidden: ({ document }) =>
        Array.isArray(document?.items) && document.items.length > 0,
      deprecated: { reason: 'Use "Delivery Items" instead.' },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Deliveries Page',
        subtitle: 'Delivery items and payment',
      };
    },
  },
});
