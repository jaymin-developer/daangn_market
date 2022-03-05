import InfiniteScroll from "react-infinite-scroller"
import UsedItemQuestionAnswerListItemUI from "./UsdeItemQuestionAnswerListItem.presenter"

export default function UsedItemQuestionAnswerListItem(props) {
  if (!props.data) return <div />

  return (
    <InfiniteScroll pageStart={0} loadMore={props.onLoadMore} hasMore={true}>
      {props.data?.fetchUseditemQuestionAnswers.map((el) => (
        <UsedItemQuestionAnswerListItemUI
          key={el._id}
          el2={el}
          // fetchUseditemQuestionAnswers
          el={props.el}
        />
      ))}
    </InfiniteScroll>
  )
}
