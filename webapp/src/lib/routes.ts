export type IdeaNickParams = { ideaNick: string };

export const routes = {
  pages: {
    allIdeas: '/',
    idea: ({ ideaNick }: IdeaNickParams) => `/idea/${ideaNick}`,
    newIdea: '/idea/new',
    singUp: '/sign-up',
  },
};
