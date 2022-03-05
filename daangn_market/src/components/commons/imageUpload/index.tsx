// import * as React from "react"
// import { styled } from "@mui/material/styles"
import IconButton from "@mui/material/IconButton"
import PhotoCamera from "@mui/icons-material/PhotoCamera"
import Stack from "@mui/material/Stack"
import styled from "@emotion/styled"
// import { checkFileValidation } from "../../../commons/libraries/util"

const Input = styled.input`
  display: none;
`

const Images = styled.div`
  width: 100%;
  /* height: 210px; */
  display: flex;
  flex-direction: row;
  /* justify-content: flex-start; */
  align-items: center;
  /* padding: 10px 30px 10px; */
  & div {
    width: calc(20% - 10px);
    /* height: 210px; */
    margin-right: 10px;
    background: #ffffff;
    border: 1px solid #dddddd;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  & div img {
    max-width: 100%;
    max-height: 100%;
  }
`

export default function UploadButtons(props) {
  return (
    <Stack
      display="flex"
      flexDirection="column"
      direction="row"
      //   alignItems="center"
      spacing={1}
    >
      <label htmlFor="icon-button-file">
        <Input
          accept="image/*"
          id="icon-button-file"
          type="file"
          onChange={props.onChangeFile}
        />
        이미지 업로드(최대 5장)
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
      {props.images.length === 0 || (
        <div style={{ width: "100%" }}>
          {/* <Image
            onClick={onClickBig}
            src={`https://storage.googleapis.com/${props.images}`}
            style={{
              width: "20%",
              // height: "100%",
              objectFit: "cover",
              cursor: "zoom-in",
            }}
          
          /> */}
          <Images>
            {props.images.map((el: string, index: number) => (
              <div key={index}>
                <img
                  src={`https://storage.googleapis.com/` + el}
                  alt={el}
                  onError={(e) => {
                    e.currentTarget.src = "/images/logo-basic.svg"
                  }}
                />
              </div>
            ))}
          </Images>
        </div>
      )}
    </Stack>
  )
}
