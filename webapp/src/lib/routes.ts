export type IdeaNickParams = { ideaNick: string };

export const routes = {
  pages: {
    allIdeas: '/',
    idea: ({ ideaNick }: IdeaNickParams) => `/idea/${ideaNick}`,
    newIdea: '/idea/new',
    editIdea: ({ ideaNick }: IdeaNickParams) => `/idea/${ideaNick}/edit`,
    singUp: '/sign-up',
    signIn: '/sign-in',
    signOut: '/sign-out',
  },
};
