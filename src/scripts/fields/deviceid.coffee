Formbuilder.registerField 'deviceid',

  order: 36
  type: 'non_input'

  view: """
    <label class='section-name'><%= rf.get(Formbuilder.options.mappings.LABEL) %></label>
    <div class="stub-device-id" >
   <img
   src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4Ij4KICA8Zz4KICAgIDxnPgogICAgICA8cGF0aCBkPSJtNDY0LjEsNjcuN2gtNDE2LjJjLTE5LjgsMC0zNi40LDE1LjYtMzYuNCwzNi40djMwMy44YzAsMTkuOCAxNS42LDM2LjQgMzYuNCwzNi40aDQxNi4xYzE5LjgsMCAzNi40LTE2LjYgMzYuNC0zNy40di0zMDIuOGMwLjEtMTkuNy0xNS41LTM2LjQtMzYuMy0zNi40em0xNi42LDMzOS4xYzAsOS40LTcuMywxNi42LTE2LjYsMTYuNmgtNDE2LjJjLTkuNCwwLTE2LjYtNy4zLTE2LjYtMTYuNnYtMzAyLjdjMC05LjQgNy4zLTE2LjYgMTYuNi0xNi42aDQxNi4xYzkuNCwwIDE2LjYsNy4zIDE2LjYsMTYuNnYzMDIuN3oiIGZpbGw9IiM5MzNFQzUiLz4KICAgICAgPHBhdGggZD0iTTE3OCwxMzQuM0g2OS44djEwOC4ySDE3OFYxMzQuM3ogTTE1OC4yLDIyMi43SDkwLjZ2LTY3LjZoNjcuNlYyMjIuN3oiIGZpbGw9IiM5MzNFQzUiLz4KICAgICAgPHJlY3Qgd2lkdGg9IjIxNS4zIiB4PSI4MC4yIiB5PSIyOTQuNSIgaGVpZ2h0PSIyMC44IiBmaWxsPSIjOTMzRUM1Ii8+CiAgICAgIDxyZWN0IHdpZHRoPSIyMTUuMyIgeD0iODAuMiIgeT0iMzYwIiBoZWlnaHQ9IjIwLjgiIGZpbGw9IiM5MzNFQzUiLz4KICAgIDwvZz4KICA8L2c+Cjwvc3ZnPgo="
   />

    <p><small><i>DEV-UUID</i></small></p>

    </div>
  """

  edit: """
    <div class='fb-edit-section-header'>Field Name</div>
    <input type='text' data-rv-input='model.<%= Formbuilder.options.mappings.LABEL %>' />
  """

  addButton: """
    <span class="symbol"><span class="fa fa-id-card-o"></span></span> Device ID
  """
