const zod = require("zod");

const signupSchema = zod.object({
    username: zod.email(),
    password: zod.string()
});

const todoSchema = zod.object({
    title: zod.string(),
    description: zod.string(),

})
module.exports = {
    signupSchema,
    todoSchema
};
