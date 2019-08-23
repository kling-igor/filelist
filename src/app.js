import React, { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from './style'
import SplitPane, { Pane } from './react-split'

import FileList from './filelist'
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
  /* background-color: magenta; */
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

const processedFiles = files.map(item => {
  const parts = item.path.split('/')
  const filename = parts.pop()
  const path = parts.join('/')

  return { filename, path, status: item.status }
})

const FilesPane = memo(({ setMainLayout, upperSize, lowerSize }) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <SplitPane split="horizontal" allowResize resizersSize={0} onResizeEnd={setMainLayout}>
        <Pane size={upperSize} minSize="50px" maxSize="100%">
          {/* <div style={{ height: '100%', backgroundColor: 'yellow' }} /> */}
          <FileList files={processedFiles} caption="STAGED" />
        </Pane>
        <Pane size={lowerSize} minSize="50px" maxSize="100%">
          {/* <CommitPane email={email} name={name} onChange={onChange} text={text} /> */}
          <FileList files={processedFiles} caption="CHANGES" />
        </Pane>
      </SplitPane>
    </div>
  )
})

export default ({
  name = 'Igor Kling',
  email = 'klingigor@gmail.com',
  layout: { primary = ['20000', '5000'], vertical = ['20000', '20000'] } = {},
  onLayoutChange = () => {}
}) => {
  const [mainLayout, setMainLayout] = useState(primary)
  const [verticalLayout, setVerticalLayout] = useState(vertical)
  const [text, setText] = useState('')

  const onChange = event => {
    setText(event.target.value)
  }

  useEffect(() => {
    const serialized = { primary: mainLayout, vertical: verticalLayout }
    console.log('serialized:', serialized)
    onLayoutChange(serialized)
  }, [mainLayout])

  const upperSize = +mainLayout[0] / 100
  const lowerSize = +mainLayout[1] / 100

  const leftSize = +verticalLayout[0] / 100
  const rightSize = +verticalLayout[1] / 100

  return (
    <>
      <GlobalStyle />
      <RootStyle>
        <SplitPane split="vertical" allowResize resizersSize={0} onResizeEnd={setVerticalLayout}>
          <Pane size={leftSize} minSize="100px" maxSize="100%">
            <FilesPane setMainLayout={setMainLayout} upperSize={upperSize} lowerSize={lowerSize} />
          </Pane>
          <Pane size={rightSize} minSize="100px" maxSize="100%">
            <div
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'yellow',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              DIFF
            </div>
          </Pane>
        </SplitPane>
      </RootStyle>
    </>
  )
}
