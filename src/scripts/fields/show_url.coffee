Formbuilder.registerField 'show_url',

  order: 0

  type: 'non_input'

  view: """
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Add the Link URL here'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-link'></span></span> Render LINK
  """
