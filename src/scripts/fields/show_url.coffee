Formbuilder.registerField 'show_url',

  order: 0

  type: 'non_input'

  view: """
    <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>
    <p><%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %></p>
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Add the URL here'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-link'></span></span> Show URL
  """
