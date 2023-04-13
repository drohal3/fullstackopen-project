import { useParams } from 'react-router';
import articles from "../../services/articles";
import {useEffect, useState} from "react";
import TopNav from "../Layout/TopNav";

function View() {
  const [article, setArticle] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    const article = articles.get(id)
  })

  if (!article) {
    return (<p>loading...</p>)
  }

  return (
    <>
      <TopNav />

    </>
  )
}

export default View