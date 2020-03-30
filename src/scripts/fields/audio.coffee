Formbuilder.registerField 'play_audio',

  order: 5

  type: 'non_input'

  view: """
    <p>
		 <audio controls autoplay loop>
				<source src="<%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %>" class='section-image'  />
		</audio>

    </p>
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
    <textarea placeholder='Paste URL to Audio'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-play'></span></span> Play Audio
  """
