import React, { PureComponent } from 'react'

import styled, { createGlobalStyle } from 'styled-components'

import { Scrollbars } from 'react-custom-scrollbars'
import { GlobalStyle } from './style'

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

export default class App extends PureComponent {
  render() {
    return (
      <>
        <GlobalStyle />
        <Scrollbars
          style={{ width: 200, height: '100%' }}
          thumbMinSize={30}
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
        >
          <FileList files={files} />
        </Scrollbars>
      </>
    )
  }
}
