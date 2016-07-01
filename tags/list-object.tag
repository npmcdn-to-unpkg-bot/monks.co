<list-object>
  <li>
    <h1>{opts.object.title}</h1>
    <em if={opts.object.year}>{opts.object.year}</em>
    <ul>
      <li each={name, i in opts.object.categories}>{name}</li>
    </ul>
  </li>
</list-object>

