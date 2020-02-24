import React from 'react'

export default () => {
  const menu = [
    {name: 'Apple Music', href:'#'},
    {name: 'Instagram', href:'#'},
    {name: 'Spotify', href:'#'},
    {name: 'Twitter', href:'#'},
    {name: 'YouTube', href:'#'}
  ]

  return (
    <ul>
      {menu.map(({name, href},i)  => <li><a key={i} href={href}>{name}</a></li>)}
    </ul>
  )
}
