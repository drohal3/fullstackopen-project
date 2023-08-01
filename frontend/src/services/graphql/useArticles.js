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
  const articlesResult = useQuery(ALL_ARTICLES, {variables: {articleId}})
  return !articlesResult || articlesResult.loading || !articlesResult.data || articlesResult.data.allArticles.length < 1 ? null : articlesResult.data.allArticles[0]
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

export const UPDATE_ARTICLE = gql`
  mutation updateArticle($id: ID!, $title: String, $abstract: String, $content: String) {
    updateArticle(
      id: $id
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

export function useUpdateArticle () {
  const [ updateArticleMutationFunction ] = useMutation(UPDATE_ARTICLE)

  return async (aricleData) => {
  //   TODO: article must belong to user
    const updatedArticle = await updateArticleMutationFunction({
      variables: aricleData
    })

    return updatedArticle
  }
}


