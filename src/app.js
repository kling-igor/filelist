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
// данные, полученные через STATUS
// нужно разделить возможно на 2 набора, в STAGED попадают те, что с буквой I
const files = [
  { path: 'src/common/file1.js', status: 'M' },
  { path: 'src/common/file2.js', status: 'MI' },
  { path: 'src/common/file3.js', status: 'M' },
  { path: 'src/common/file4.js', status: 'D' }
  // { path: 'src/common/file5.js', status: 'M' },
  // { path: 'src/common/file6.js', status: 'M' },
  // { path: 'src/common/file7.js', status: 'A' },
  // { path: 'src/common/file8.js', status: 'M' },
  // { path: 'src/common/file9.js', status: 'M' },
  // { path: 'src/common/file10.js', status: 'U' },
  // { path: 'src/common/file11.js', status: 'M' },
  // { path: 'src/common/file12.js', status: 'M' },
  // { path: 'src/common/file13.js', status: 'A' },
  // { path: 'src/common/file14.js', status: 'M' },
  // { path: 'src/common/file15.js', status: 'M' }
]

// const changedFiles = files.map(item => {
//   const parts = item.path.split('/')
//   const filename = parts.pop()
//   const path = parts.join('/')

//   return { filename, path, status: item.status }
// })

const FilesPane = memo(
  ({ setMainLayout, upperSize, lowerSize, changedFiles, stagedFiles, onStagedFilesChanged, onChangedFilesChanged }) => {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <SplitPane split="horizontal" allowResize resizersSize={0} onResizeEnd={setMainLayout}>
          <Pane size={upperSize} minSize="50px" maxSize="100%">
            <FileList files={stagedFiles} onSelectionChanged={onStagedFilesChanged} caption="STAGED" />
          </Pane>
          <Pane size={lowerSize} minSize="50px" maxSize="100%">
            <FileList files={changedFiles} onSelectionChanged={onChangedFilesChanged} caption="CHANGES" />
          </Pane>
        </SplitPane>
      </div>
    )
  }
)

// {/* <CommitPane email={email} name={name} onChange={onChange} text={text} /> */}
//

export default ({
  name = 'Igor Kling',
  email = 'klingigor@gmail.com',
  layout: { primary = ['20000', '5000'], vertical = ['20000', '20000'] } = {},
  onLayoutChange = () => {}
}) => {
  const [changedFiles, setChangedFiles] = useState([])
  const [stagedFiles, setStagedFiles] = useState([])

  const [selectedChangedFiles, setSelectedChangedFiles] = useState([])
  const [selectedStagedFiles, setSelectedStagedFiles] = useState([])

  useEffect(() => {
    const changed = []
    const staged = []

    // тут нужно сформировать 2 набора данных
    files.forEach(item => {
      const parts = item.path.split('/')
      const filename = parts.pop()
      const path = parts.join('/')

      if (item.status.includes('I')) {
        staged.push({ filename, path, status: item.status.replace('I', '') })
      } else {
        changed.push({ filename, path, status: item.status })
      }
    })

    setChangedFiles(changed)
    setStagedFiles(staged)
  }, [])

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

  const addSelectedToIndex = useCallback(() => {
    if (selectedChangedFiles.length === 0) {
      return
    }

    let selected = selectedChangedFiles.slice()

    const [filtered, remained] = changedFiles.reduce(
      (acc, item) => {
        const fullPath = `${item.path}/${item.filename}`
        const index = selected.findIndex(i => i === fullPath)
        if (index !== -1) {
          acc[0].push(item)
          selected = [...selected.slice(0, index), ...selected.slice(index + 1)]
        } else {
          acc[1].push(item)
        }

        return acc
      },
      [[], []]
    )

    setStagedFiles([...new Set([...stagedFiles, ...filtered])])
    setChangedFiles(remained)
  })

  const removeSelectedFromIndex = useCallback(() => {
    if (selectedStagedFiles.length === 0) {
      return
    }

    let selected = selectedStagedFiles.slice()

    const [filtered, remained] = stagedFiles.reduce(
      (acc, item) => {
        const fullPath = `${item.path}/${item.filename}`
        const index = selected.findIndex(i => i === fullPath)
        if (index !== -1) {
          acc[0].push(item)
          selected = [...selected.slice(0, index), ...selected.slice(index + 1)]
        } else {
          acc[1].push(item)
        }

        return acc
      },
      [[], []]
    )

    setChangedFiles([...new Set([...changedFiles, ...filtered])])
    setStagedFiles(remained)
  })

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
            <FilesPane
              setMainLayout={setMainLayout}
              upperSize={upperSize}
              lowerSize={lowerSize}
              changedFiles={changedFiles}
              stagedFiles={stagedFiles}
              onStagedFilesChanged={setSelectedStagedFiles}
              onChangedFilesChanged={setSelectedChangedFiles}
            />
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
              <button onClick={addSelectedToIndex}>ADD SELECTED TO INDEX</button>
              <button onClick={removeSelectedFromIndex}>REMOVE SELECTED FROM INDEX</button>
            </div>
          </Pane>
        </SplitPane>
      </RootStyle>
    </>
  )
}
