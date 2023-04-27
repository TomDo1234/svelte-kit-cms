export default 
{
  name: 'Post',
  fields: [
    {
      name: 'id',
      type: 'Int',
      id: true
    },
    {
      name: 'title',
      type: 'String',
    },
    {
      name: 'content',
      type: 'String',
    },
    {
      name: 'authorId',
      type: 'Int',
    },
  ],
}