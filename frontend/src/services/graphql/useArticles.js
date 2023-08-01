import {gql, useMutation, useQuery} from "@apollo/client";

export const ALL_ARTICLES = gql`
  query AllArticles($authorId: ID, $articleId: ID) {
    allArticles(authorId: $authorId, articleId: $articleId) {
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

export function useArticlesByUserId (authorId) {
  return useQuery(ALL_ARTICLES, {variables: {authorId}})
}

export function useArticleById (articleId) {
  return useQuery(ALL_ARTICLES, {variables: {articleId}})
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

// TODO:
export const DELETE_ARTICLE = gql`
  mutation deleteArticle($articleId: ID!) {
    deleteArticle(
      articleId: $articleId
    ) {
      id
      title
      abstract
      content
      author {
          id
          nickName
      }
    }
  }
`

export function useDeleteArticle () {
  const [ deleteArticleMutationFunction ] = useMutation(DELETE_ARTICLE)

  return async (articleId) => {
    const deletedArticle = await deleteArticleMutationFunction({
      variables: {articleId},
      update: (cache, mutationResult) => {
        const deletedArticle = mutationResult.data.deleteArticle
        cache.modify({
          fields: {
            allArticles(existingArticles, { readField }) {
              return existingArticles.filter(
                (articleRef) => deletedArticle.id !== readField('id', articleRef)
              )
            }
          }
        })
      }
    })

    console.log('deleted article', deletedArticle)

    return deletedArticle
  }
}

export function useUpdateArticle () {
//   TODO:
}

export function useGetArticleById () {
//   TODO:
}

