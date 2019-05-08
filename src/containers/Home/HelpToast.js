import React from 'react'
import {Link} from 'react-router-dom'

export default function HelpToast() {
  return (
    <div align="left" className="mt-4">
      <ul class="list-group">
        <li class="list-group-item" aria-disabled="true">
          Tips:
        </li>
        <li class="list-group-item">
          <span>Step 1:</span> type as much information as you can for better
          results
        </li>
        <li class="list-group-item">
          <span>Step 2:</span> click on suggested address
        </li>
      </ul>
    </div>
  )
}
