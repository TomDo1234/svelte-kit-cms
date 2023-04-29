const user: Model = {
  name: 'User',
  fields: [
    {
      name: 'id',
      type: 'Int',
      id: true
    },
    {
      name: 'name',
      type: 'String',
    },
    {
      name: 'email',
      type: 'String',
    },
  ],
};

export default user;