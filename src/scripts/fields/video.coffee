Formbuilder.registerField 'show_video',

  order: 5

  type: 'non_input'

  view: """
    <p>
		 <video width="100%" height="200px" autoplay muted loop>
				<source src="<%= rf.get(Formbuilder.options.mappings.DESCRIPTION) %>" type="video/mp4" class='section-image'  />
		</video>

    </p>
  """

  edit: """
    <div class='fb-edit-section-header'>Label</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.DESCRIPTION %>'
    <textarea placeholder='Paste URL to Video'></textarea>
  """

  addButton: """
    <span class='symbol'><span class='fa fa-youtube'></span></span> Show Video
  """
