import styled, { css } from "styled-components";
import { Category } from "@/models/Category";
import CommentBox from "./CommentBox";


const StyledCommentsGridCss = css`
  display: block;
  gap: 10px;



`;

const StyledCommentsGrid = styled.div`
   ${StyledCommentsGridCss}
`;
 
export default function CommentsGrid({comments,...rest}) {

  return (
    <StyledCommentsGrid {...rest}>
      {comments?.length > 0 && comments.map((comm) => (

        <CommentBox key={comm._id} {...comm} />
      ))}
    </StyledCommentsGrid>
  );
}