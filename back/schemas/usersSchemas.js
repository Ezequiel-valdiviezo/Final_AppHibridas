import yup from 'yup'

const UsersSchema = yup.object({
  email: yup.string().email().min(4).required(),
  password: yup.string().min(4).required(),
  rol: yup.string().min(2).required()
});
const UsersSchema2 = yup.object({
  email: yup.string().email().min(4).required(),
  password: yup.string().min(4).required(),
});

export {
  UsersSchema,
  UsersSchema2
}

// export default {
//   AccountSchema,
//   AccountSchema2
// }