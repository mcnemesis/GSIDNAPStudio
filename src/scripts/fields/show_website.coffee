Formbuilder.registerField 'show_website',

  order: 0

  type: 'non_input'

  view: """
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <textarea data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
      placeholder='Add the Web resource URL here'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-globe'></span></span> Show Webpage
  """
