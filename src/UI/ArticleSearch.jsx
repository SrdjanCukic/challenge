import styled from "styled-components";

const NewsCard = styled.div`
  background-color: lightgrey;
  padding: 1.5rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  text-align: center;
`;
function ArticleSearch(props) {
  const getTitle = (props) => {
    if (!props) return "No Title Available";

    if (props.data.headline && props.data.headline.main) {
      return props.data.headline.main;
    } else if (props.data.title) {
      return props.data.title;
    } else {
      return "No Title Available";
    }
  };

  const getContent = (props) => {
    if (!props) return "No Article available by that search";

    if (props.data && props.data.abstract) {
      return props.data.abstract;
    } else if (props.data.content) {
      return props.data.content;
    } else {
      return "No Content Available";
    }
  };

  const getByLine = (props) => {
    if (!props) return "No Author available";

    if (props.data.byline && props.data.byline.original) {
      return props.data.byline.original;
    } else if (props.data.author) {
      return props.data.author;
    } else {
      return "There is no Author";
    }
  };

  const title = getTitle(props);
  const content = getContent(props);
  const author = getByLine(props);

  return (
    <NewsCard>
      <h1>{title}</h1>
      <p>{content}</p>
      <span>
        <p>{author}</p>
      </span>
    </NewsCard>
  );
}

export default ArticleSearch;
