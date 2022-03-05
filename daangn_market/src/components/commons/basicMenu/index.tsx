import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import styled from "@emotion/styled"
import { useRouter } from "next/router"
import { DELETE_BOARD } from "./queries"
import { useMutation } from "@apollo/client"

import { useMoveToPage } from "../hooks/useMoveToPage"
import {
  IMutation,
  IMutationDeleteBoardArgs,
} from "../../../commons/types/generated/types"

const BasicMenuButton = styled(Button)`
  color: darkred;
`

export default function BasicMenu(props) {
  const router = useRouter()
  const { moveToPage } = useMoveToPage()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const [deleteBoard] = useMutation<
    Pick<IMutation, "deleteBoard">,
    IMutationDeleteBoardArgs
  >(DELETE_BOARD)

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const onClickMoveToEdit = () => {
    // moveToPage(`/${props.visitedPage}`)
    router.push(`/${props.location}/${router.query.id}/edit`)
  }

  const onClickDeleteBoard = async () => {
    try {
      await deleteBoard({
        variables: { boardId: String(router.query.id) },
      })
      alert("삭제가 완료되었습니다.")
      router.push(`/boards`)
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div>
      <BasicMenuButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        …
      </BasicMenuButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={onClickMoveToEdit}>수정하기</MenuItem>
        {router.pathname.includes("usedItems") ? (
          <MenuItem onClick={props.onClickDelete}>삭제하기</MenuItem>
        ) : (
          <MenuItem onClick={onClickDeleteBoard}>삭제하기</MenuItem>
        )}
      </Menu>
    </div>
  )
}
