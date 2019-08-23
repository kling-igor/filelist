import React, { memo, useCallback, useMemo, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'
// import { Checkbox } from '@blueprintjs/core'
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

const ListItemContainerStyle = styled.li`
  padding: 0;
  padding-left: 4px;
  padding-right: 4px;
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
  user-select: none;
  :hover {
    background-color: blue;
    color: white;
  }
`

const ListItemLeftGroupStyle = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: baseline;
`

const ListItemFilenameStyle = styled.span`
  white-space: nowrap;
`

const ListItemPathStyle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin-left: 1em;
  opacity: 0.8;
`

const ListStyle = styled.ul`
  font-size: 13px;
  font-family: 'Open Sans', sans-serif;
  white-space: nowrap;
  padding: 0;
  margin: 0px;
  margin-top: 0px;
`

const CaptionStyle = styled.div`
  padding: 0;
  margin: 0;
  padding-left: 4px;
`

const CaptionText = styled.b`
  user-select: none;
`

const Checkbox = memo(({ indeterminate, ...props }) => {
  const ref = useRef(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  return <input ref={ref} type="checkbox" {...props} />
})

// https://www.git-scm.com/docs/git-status#_short_format

const FileList = ({ files, caption }) => {
  const [checkboxes, setCheckboxes] = useState({})
  const [allChecked, setAllChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)

  useEffect(() => {
    // первоначальное заполнение checkboxes (все false)
    setCheckboxes(
      files.reduce((obj, { filename, path }) => {
        obj[`${path}/${filename}`] = false
        return obj
      }, {})
    )
  }, [])

  const handleInputChange = useCallback(
    event => {
      const key = event.currentTarget.dataset.path
      setCheckboxes(old => {
        return { ...old, [key]: !old[key] }
      })
    },
    [checkboxes]
  )

  useEffect(() => {
    const values = Object.values(checkboxes)
    const isAllChecked = values.length > 0 && values.every(item => !!item)
    const isNoOneChecked = values.length > 0 && values.every(item => !item)
    setAllChecked(isAllChecked)
    const isPartiallyChecked = !isAllChecked && !isNoOneChecked
    setIndeterminate(isPartiallyChecked)
  }, [checkboxes])

  const handleCaptionInputChange = useCallback(event => {
    const { checked } = event.target

    setCheckboxes(prev =>
      Object.keys(prev).reduce((obj, key) => {
        obj[key] = checked
        return obj
      }, {})
    )
  })

  return (
    <>
      <CaptionStyle>
        <Checkbox indeterminate={indeterminate} checked={allChecked || false} onChange={handleCaptionInputChange} />
        <CaptionText>{caption}</CaptionText>
      </CaptionStyle>
      <ListStyle>
        {files.map(({ filename, path, status }) => (
          <ListItemContainerStyle key={`${path}/${filename}`}>
            <ListItemLeftGroupStyle>
              <input
                type="checkbox"
                checked={checkboxes[`${path}/${filename}`] || false}
                onChange={handleInputChange}
                data-path={`${path}/${filename}`}
              />
              <ListItemFilenameStyle>{filename}</ListItemFilenameStyle>
              <ListItemPathStyle>{path}</ListItemPathStyle>
            </ListItemLeftGroupStyle>
            {status}
          </ListItemContainerStyle>
        ))}
      </ListStyle>
    </>
  )
}

const processedFiles = files.map(item => {
  const parts = item.path.split('/')
  const filename = parts.pop()
  const path = parts.join('/')

  return { filename, path, status: item.status }
})

const StagedFiles = memo(({ files }) => {
  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      thumbMinSize={30}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      <FileList files={files} caption="STAGED" />
    </Scrollbars>
  )
})

const ChangedFiles = memo(({ files }) => {
  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      thumbMinSize={30}
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
    >
      <FileList files={files} caption="CHANGES" />
    </Scrollbars>
  )
})

const FilesPane = memo(({ setMainLayout, upperSize, lowerSize }) => {
  return (
    <div style={{ height: '100%', width: '100%', backgroundColor: 'green' }}>
      <SplitPane split="horizontal" allowResize resizersSize={0} onResizeEnd={setMainLayout}>
        <Pane size={upperSize} minSize="50px" maxSize="100%">
          {/* <div style={{ height: '100%', backgroundColor: 'yellow' }} /> */}
          <StagedFiles files={processedFiles} />
        </Pane>
        <Pane size={lowerSize} minSize="50px" maxSize="100%">
          {/* <CommitPane email={email} name={name} onChange={onChange} text={text} /> */}
          <ChangedFiles files={processedFiles} />
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
            <div style={{ height: '100%', width: '100%', backgroundColor: 'yellow' }} />
          </Pane>
        </SplitPane>
      </RootStyle>
    </>
  )
}
