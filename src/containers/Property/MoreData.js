import React, {useState} from 'react'
import {Collapse, Button} from 'reactstrap'

export default function MoreData({children}) {
  const [collapse, setCollapse] = useState(false)
  return (
    <div>
      <Button
        color="success"
        onClick={() => setCollapse(!collapse)}
        style={{marginBottom: '1rem'}}
      >
        More Data
      </Button>
      <Collapse isOpen={collapse}>{children}</Collapse>
    </div>
  )
}
