Formbuilder.registerField 'file',

  order: 40

  view: """
    <input type='file' placeholder='Pick a file...' />
    <% if (mime_type = rf.get(Formbuilder.options.mappings.MIME_TYPE)) { %>
      <small><i><%= mime_type %></i></small>
    <% } %>
  """

  edit: """
    <%= Formbuilder.templates['edit/mime_type']() %>
  """

  addButton: """
    <span class="symbol"><span class="fa fa-file"></span></span> File
  """
