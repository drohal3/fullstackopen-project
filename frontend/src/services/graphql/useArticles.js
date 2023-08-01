import {gql, useMutation, useQuery} from "@apollo/client";

export const ALL_ARTICLES = gql`
  query AllArticles($authorId: ID!) {
    allArticles(authorId: $authorId) {
      author {
        nickName
        id
      }
      title
      abstract
      content
      id
    }
  }
`

export function useAllArticlesByUserId (authorId) {
  return useQuery(ALL_ARTICLES, {variables: {authorId}})
}

export const CREATE_ARTICLE = gql`
  mutation createArticle($title: String!, $abstract: String, $content: String!) {
    createArticle(
      title: $title
      abstract: $abstract
      content: $content
    )
    {
      title
      abstract
      content
      author {
        id
        nickName
      }
      id
    }
  }
`

export function useCreateArticle () {
  const [ createArticleMutationFunction ] = useMutation(CREATE_ARTICLE)

  return async (variables) => {
    const newArticle = await createArticleMutationFunction({
      variables,
      update: (cache, mutationResult) => {
        const newArticle = mutationResult.data.createArticle;
        const data = cache.readQuery({
          query: ALL_ARTICLES, variables: {authorId: newArticle.author.id}
        });
        cache.writeQuery({
          query: ALL_ARTICLES,
          variables: {authorId: newArticle.author.id},
          data: {
            allArticles: [...data.allArticles, newArticle]
          }
        })
      }
    })

    console.log(newArticle)

    return newArticle
  }
}

export function useDeleteArticle () {
//   TODO:
}

export function useUpdateArticle () {
//   TODO:
}

export function useGetArticleById () {
//   TODO:
}

