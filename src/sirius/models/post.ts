
const post: Model = {
  name: 'Post',
  fields: [
    {
      name: 'id',
      type: 'Int',
      id: true,
    },
    {
      name: 'title',
      type: 'String',
      unique: true
    },
    {
      name: 'content',
      type: 'String',
    },
    {
      name: 'authorId',
      type: 'Int',
    },
    {
      name: 'createdAt',
      isCreatedAt: true,
    },
    {
      name: 'updatedAt',
      isUpdatedAt: true,
    }
  ],
}

export default post;