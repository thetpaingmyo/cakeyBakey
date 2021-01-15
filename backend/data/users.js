import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Phuu Phuu',
    email: 'love.newyear39@gmail.com',
    password: bcrypt.hashSync('haha1234', 10),
  },
]

export default users