import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Button, TextArea } from '@blueprintjs/core'
import TextareaAutosize from 'react-textarea-autosize'

import { Scrollbars } from 'react-custom-scrollbars'
import { GlobalStyle } from './style'

const ButtonsContainerStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
  align-self: flex-end;
  margin: 8px;
  margin-top: 4px;
`

const GravatarStyle = styled.img`
  border-radius: 50%;
  padding: 8px;
`

const NameEmailStyle = styled.span`
  margin: 8px;
  margin-bottom: 0px;
  margin-left: 0px;
`

const VerticalContainerStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const HorizontalConatiner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`

const RootStyle = styled.div`
  position: absolute;
  width: 100%;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  height: 200px;
  background-color: yellow;
  display: flex;
  flex-direction: row;
`

const CommitAreaStyle = styled.textarea`
  margin: 8px;
  margin-left: 0px;
  margin-bottom: 4px;
  overflow: auto;
  max-width: calc(100% - 8px);
  min-width: calc(100% - 8px);
  max-height: calc(100% - 74px);
  min-height: calc(100% - 74px);
`

const files = [
  { path: 'src/common/file1.js', status: 'M' },
  { path: 'src/common/file2.js', status: 'M' },
  { path: 'src/common/file3.js', status: 'M' },
  { path: 'src/common/file4.js', status: 'D' },
  { path: 'src/common/file5.js', status: 'M' },
  { path: 'src/common/file6.js', status: 'M' },
  { path: 'src/common/file7.js', status: 'A' },
  { path: 'src/common/file8.js', status: 'M' },
  { path: 'src/common/file9.js', status: 'M' },
  { path: 'src/common/file10.js', status: 'U' },
  { path: 'src/common/file11.js', status: 'M' },
  { path: 'src/common/file12.js', status: 'M' },
  { path: 'src/common/file13.js', status: 'A' },
  { path: 'src/common/file14.js', status: 'M' },
  { path: 'src/common/file15.js', status: 'M' }
]

const FileList = ({ files }) => {
  return (
    <ul>
      {files.map(({ path, status }) => (
        <li key={path}>{path}</li>
      ))}
    </ul>
  )
}

const commitButtonStyle = { paddingLeft: 16, paddingRight: 16 }
const cancelButtonStyle = { ...commitButtonStyle, marginRight: 8 }

export default () => {
  const [text, setText] = useState('')

  const onChange = event => {
    setText(event.target.value)
  }

  return (
    <>
      <GlobalStyle />
      <RootStyle>
        <HorizontalConatiner>
          <GravatarStyle
            src="https://www.gravatar.com/avatar/d14ac9251c918bfe96eb4c2119284986?s=100&d=monsterid"
            width={50}
            height={50}
          />
          <VerticalContainerStyle>
            <NameEmailStyle>{`Igor Kling <kling.igor@gmail.com>`}</NameEmailStyle>
            <CommitAreaStyle onChange={onChange} value={text} />
            <ButtonsContainerStyle>
              <Button small style={cancelButtonStyle}>
                Cancel
              </Button>
              <Button small intent="primary" style={commitButtonStyle}>
                Commit
              </Button>
            </ButtonsContainerStyle>
          </VerticalContainerStyle>
        </HorizontalConatiner>
      </RootStyle>
    </>
  )
}

{
  /* <Scrollbars
  style={{ width: 200, height: '100%' }}
  thumbMinSize={30}
  autoHide
  autoHideTimeout={1000}
  autoHideDuration={200}
> */
}
{
  /* <FileList files={files} /> */
}
{
  /* </Scrollbars> */
}
