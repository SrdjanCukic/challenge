import styled from "styled-components";

const NewsCard = styled.div`
  background-color: lightgrey;
  padding: 1.5rem;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  text-align: center;
`;
function Article(props) {
  const { title, byline } = props.props;
  const content = props.props.abstract || props.props.content;

  return (
    <NewsCard>
      <h1>{title}</h1>
      <p>{content}</p>
      <span>
        <p>{byline}</p>
      </span>
    </NewsCard>
  );
}

export default Article;
