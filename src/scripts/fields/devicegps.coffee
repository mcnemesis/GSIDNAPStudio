Formbuilder.registerField 'devicegps',

  order: 36
  type: 'non_input'

  view: """
    <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>
    <div class="stub-device-id" >
   <img
   style="width:100px;height:auto;"
   src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojOTBERkFBOyIgY3g9IjI1MiIgY3k9IjI1MiIgcj0iMjUyIi8+Cjxwb2x5Z29uIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBwb2ludHM9IjE4My43LDM3NiA3NS40LDMzOC4yIDE0OS43LDE3OS41IDIxMS40LDE5MC43ICIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRTZFOUVFOyIgcG9pbnRzPSIxODMuNywzNzYgMjk4LjEsMzM4IDI3Ni41LDE3OS41IDIxMS40LDE5MC43ICIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRkZGRkZGOyIgcG9pbnRzPSI0MzQuOCwzNzYgMjk4LjEsMzM4IDI3Ni41LDE3OS41IDM0NC45LDE5MC43ICIvPgo8Zz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM4NERCRkY7IiBwb2ludHM9IjMyNiwyMDcuNCAyNzkuMSwxOTguOCAyOTQuMywzMTAuNSAzODIsMzM0ICAiLz4KCTxwb2x5Z29uIHN0eWxlPSJmaWxsOiM4NERCRkY7IiBwb2ludHM9IjE1OS45LDIwMS4zIDEwNC45LDMyMS43IDE4Ny4yLDM0Ny4yIDIwOC4yLDIxMCAgIi8+CjwvZz4KPHBvbHlnb24gc3R5bGU9ImZpbGw6IzU0QzBFQjsiIHBvaW50cz0iMjc5LjEsMTk4LjggMjA4LjIsMjEwIDE4Ny4yLDM0Ny4yIDI5NC4zLDMxMC41ICIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjE1NDNGOyIgZD0iTTMzMS44LDEzOS45YzAsNDUtODEuNSwxNDMuMy04MS41LDE0My4zcy04MS41LTk4LjMtODEuNS0xNDMuM3MzNi41LTgxLjUsODEuNS04MS41ICBTMzMxLjgsOTQuOCwzMzEuOCwxMzkuOXoiLz4KPGNpcmNsZSBzdHlsZT0iZmlsbDojRkZGRkZGOyIgY3g9IjI1MC4yIiBjeT0iMTMzLjIiIHI9IjQxLjMiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
   />
    <p><small><i>DEV-GPS</i></small></p>

    </div>
  """

  edit: """
    <div class='fb-edit-section-header'>Field Name</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
  """

  addButton: """
    <span class="symbol"><span class="fa fa-compass"></span></span> Device GPS
  """
