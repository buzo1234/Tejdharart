export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Default Price',
      name: 'defaultPrice',
      type: 'number',
    },
    {
      title: 'Is it Coustomizable?',
      name: 'custom',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'productImage',
      title: 'Product Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      title: 'Color Variants',
      name: 'colorVariants',
      type: 'array',
      of: [
        {
          title: 'Colors',
          type: 'productVariant',
        },
      ],
    },

    {
      title: 'Size Variants',
      name: 'sizeVariants',
      type: 'array',
      of: [
        {
          title: 'Sizes',
          type: 'sizeVariant',
        },
      ],
    },
    {
      title: 'Tags',
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'category' },
    },
    {
      name: 'body',
      title: 'Body',
      type: 'localeBlockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      manufactor: 'manufactor.title',
      media: 'defaultProductVariant.images[0]',
    },
  },
};
