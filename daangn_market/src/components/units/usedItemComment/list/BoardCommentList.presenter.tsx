import BoardCommentListItemUI from "./BoardCommentList.presenterItem"
// import { IBoardCommentListUIProps } from "./BoardCommentList.types";
import InfiniteScroll from "react-infinite-scroller"

export default function BoardCommentListUI(props) {
  if (!props.data) return <div />
  return (
    <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
      {props.data?.fetchUseditemQuestions.map((el) => (
        <BoardCommentListItemUI key={el._id} el={el} />
      ))}
    </InfiniteScroll>
  )
}
