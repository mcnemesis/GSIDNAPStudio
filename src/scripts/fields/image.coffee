Formbuilder.registerField 'show_image',

  order: 0

  type: 'non_input'

  view: """
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Paste URL to Image'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-picture-o'></span></span> Show Image
  """
