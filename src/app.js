import React, { useCallback, useMemo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
import { GlobalStyle } from './style'
import SplitPane, { Pane } from './react-split'

import CommitPane from './commit-pane'

const RootStyle = styled.div`
  /* position: absolute; */
  width: 100%;
  /* top: 0px; */
  /* bottom: 0px; */
  /* left: 0px; */
  /* right: 0px; */
  /* height: 200px; */
  height: 100%;
  background-color: magenta;
  display: flex;
  flex-direction: row;
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

export default ({
  name = 'Igor Kling',
  email = '111klingigor@gmail.com',
  layout: { primary = ['200', '50'] } = {},
  onLayoutChange = () => {}
}) => {
  const [mainLayout, setMainLayout] = useState(primary)
  const [text, setText] = useState('')

  const onChange = event => {
    setText(event.target.value)
  }

  useEffect(() => {
    const serialized = { primary: mainLayout }
    console.log('serialized:', serialized)
    onLayoutChange(serialized)
  }, [mainLayout])

  const upperSize = +mainLayout[0] / 100
  const lowerSize = +mainLayout[1] / 100

  return (
    <>
      <GlobalStyle />
      <RootStyle>
        <SplitPane split="horizontal" allowResize resizersSize={0} onResizeEnd={setMainLayout}>
          <Pane size={upperSize} minSize="100px" maxSize="100%">
            <div style={{ height: '100%', backgroundColor: 'yellow' }} />
          </Pane>
          <Pane size={lowerSize} minSize="112px" maxSize="100%">
            <CommitPane email={email} name={name} onChange={onChange} text={text} />
          </Pane>
        </SplitPane>
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
